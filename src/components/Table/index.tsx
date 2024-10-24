import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'
import { Icon } from '../Icon/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { styled } from 'inlines'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '../../hooks/useInfiniteQuery.js'
import { ScrollArea } from '../ScrollArea/index.js'
import type { Sort, Select, Field } from '../../utils/common.js'
import { Badge } from '../Badge/index.js'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'

type TableFieldRenderOptions = {
  forceHover?: string
  setForceHover: (value?: string) => void
}

type InternalTableProps = {
  data: any[]
  totalCount?: number
  fields: Field[]
  sort?: Sort
  onSortChange?: (sort?: Sort) => void
  select?: Select
  onSelectChange?: (select?: Select) => void
  onScroll?: (
    firstVisibleItemIndex: number,
    lastVisibleItemIndex: number,
    realFirstVisibleItemIndex: number,
    realLastVisibleItemIndex: number,
  ) => void
  virtualized?: boolean
  onItemClick?: (item: any) => void
}

const HEADER_HEIGHT = 44
const ROW_HEIGHT = 50

function InternalTable({
  data = [],
  totalCount,
  fields,
  sort,
  onSortChange,
  select,
  onSelectChange,
  onScroll,
  virtualized,
  onItemClick,
}: InternalTableProps) {
  const [forceHover, setForceHover] = useState<string>()
  const [firstVisibleItemIndex, setFirstVisibleItemIndex] = useState(0)
  const [lastVisibleItemIndex, setLastVisibleItemIndex] = useState(0)
  const scrollElementRef = useRef<HTMLDivElement>()
  const total = totalCount ?? data.length

  useLayoutEffect(() => {
    if (!scrollElementRef || !virtualized) return () => {}

    function measure() {
      const { scrollTop, clientHeight } = scrollElementRef.current

      const count = Math.ceil((clientHeight - HEADER_HEIGHT) / ROW_HEIGHT)
      const extra = count
      const realFirst = Math.floor(scrollTop / ROW_HEIGHT)
      const realLast = Math.floor(scrollTop / ROW_HEIGHT) + count
      const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - extra)
      const last = Math.floor(scrollTop / ROW_HEIGHT) + count + extra

      setFirstVisibleItemIndex(first)
      setLastVisibleItemIndex(last)

      onScroll?.(first, last, realFirst, realLast)
    }

    measure()
    scrollElementRef.current.addEventListener('scroll', measure)
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(scrollElementRef.current)

    return () => {
      scrollElementRef.current.removeEventListener('scroll', measure)
      resizeObserver.disconnect()
    }
  }, [onScroll])

  useLayoutEffect(() => {
    if (!scrollElementRef.current) return

    scrollElementRef.current.scrollTop = 1
    requestAnimationFrame(() => {
      scrollElementRef.current.scrollTop = 0
    })
  }, [sort])

  return (
    <ScrollArea ref={scrollElementRef}>
      <table
        style={{
          width: '100%',
          borderSpacing: 0,
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: onSelectChange ? 44 : 8,
                padding: onSelectChange ? '0 12px' : 0,
                boxShadow: `inset 0 -1px 0 0 ${colors.neutral20Adjusted}`,
                position: 'sticky',
                top: 0,
                background: colors.neutralInverted100,
                zIndex: 3,
              }}
            >
              {!virtualized && onSelectChange && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CheckboxInput
                    value={
                      data.length && data.every((e) => select?.includes(e.id))
                    }
                    onChange={() => {
                      if (!select) {
                        onSelectChange(data.map((e) => e.id))
                        return
                      }

                      if (data.every((e) => select.includes(e.id))) {
                        onSelectChange([])
                        return
                      }

                      onSelectChange(data.map((e) => e.id))
                    }}
                  />
                </div>
              )}
            </th>
            {fields.map((field) => (
              <th
                key={field.key}
                style={{
                  padding: '0 6px',
                  height: HEADER_HEIGHT,
                  margin: 0,
                  boxShadow: `inset 0 -1px 0 0 ${colors.neutral20Adjusted}`,
                  position: 'sticky',
                  top: 0,
                  background: colors.neutralInverted100,
                  zIndex: 3,
                  ...(onSortChange && {
                    cursor: 'pointer',
                  }),
                }}
                onClick={() => {
                  if (!onSortChange || typeof field.title === 'function') return

                  if (sort?.key !== field.key) {
                    onSortChange({ key: field.key, direction: 'desc' })
                  } else if (
                    sort?.key === field.key &&
                    sort.direction === 'desc'
                  ) {
                    onSortChange({ key: field.key, direction: 'asc' })
                  } else {
                    onSortChange()
                  }
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    minHeight: 24,
                    userSelect: 'none',
                  }}
                >
                  {typeof field.title === 'function' ? (
                    field.title()
                  ) : (
                    <>
                      <Text singleLine variant="display-bold">
                        {field.title}
                      </Text>
                      {onSortChange && sort?.key === field.key && (
                        <Icon
                          variant={
                            sort.direction === 'desc'
                              ? 'arrow-down'
                              : 'arrow-up'
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {virtualized && !!firstVisibleItemIndex && (
            <tr>
              <td
                style={{
                  padding: 0,
                  height: firstVisibleItemIndex * ROW_HEIGHT,
                }}
              />
            </tr>
          )}
          {data.map((row) => (
            <styled.tr
              key={data.findIndex((e) => e?.id === row.id)}
              data-hover={[forceHover, ...(select ?? [])].includes(row.id)}
              style={{
                '&:hover > td, &[data-hover=true] > td': {
                  background: colors.neutral10Adjusted,
                },
              }}
            >
              <td
                style={{
                  padding: 0,
                }}
              >
                {onSelectChange && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CheckboxInput
                      value={select?.includes(row.id)}
                      onChange={() => {
                        if (!select) {
                          onSelectChange([row.id])
                          return
                        }

                        if (select.includes(row.id)) {
                          onSelectChange(select.filter((e) => e !== row.id))
                          return
                        }

                        onSelectChange([...select, row.id])
                      }}
                    />
                  </div>
                )}
              </td>
              {fields.map((field) => (
                <td
                  key={field.key}
                  style={{
                    height: ROW_HEIGHT,
                    padding: '0 6px',
                    margin: 0,
                  }}
                  onClick={() => {
                    onItemClick?.(row)
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {field.type === 'image' ? (
                      <img
                        key={row[field.key]}
                        style={{ height: 24, width: 24 }}
                        src={row[field.key]}
                      />
                    ) : field.type === 'badge' ? (
                      <Badge>{[row[field.key]]}</Badge>
                    ) : field.type === 'number-bytes' ? (
                      <Text
                        singleLine
                        variant="display-medium"
                        color="neutral80"
                      >
                        {prettyNumber(row[field.key], 'number-bytes')}
                      </Text>
                    ) : field.type === 'date-time-human' ? (
                      <Text
                        singleLine
                        variant="display-medium"
                        color="neutral80"
                      >
                        {prettyDate(row[field.key], 'date-time-human')}
                      </Text>
                    ) : field.render ? (
                      field.render(row, { forceHover, setForceHover })
                    ) : (
                      <Text
                        singleLine
                        variant="display-medium"
                        color="neutral80"
                      >
                        {row[field.key]}
                      </Text>
                    )}
                  </div>
                </td>
              ))}
            </styled.tr>
          ))}
          {virtualized && lastVisibleItemIndex < total && (
            <tr>
              <td
                style={{
                  padding: 0,
                  height: (total - lastVisibleItemIndex) * ROW_HEIGHT,
                }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </ScrollArea>
  )
}

type TableProps = Pick<
  InternalTableProps,
  | 'data'
  | 'fields'
  | 'sort'
  | 'onSortChange'
  | 'select'
  | 'onSelectChange'
  | 'onItemClick'
>

function Table(props: TableProps) {
  return <InternalTable {...props} />
}

type VirtualizedTableProps = Pick<
  InternalTableProps,
  | 'data'
  | 'fields'
  | 'sort'
  | 'onSortChange'
  | 'select'
  | 'onSelectChange'
  | 'onItemClick'
>

function VirtualizedTable({ data, ...props }: VirtualizedTableProps) {
  const [scroll, setScroll] = useState({ first: 0, last: 0 })

  return (
    <InternalTable
      virtualized
      data={data.slice(scroll.first, scroll.last)}
      totalCount={data.length}
      onScroll={(first, last) => {
        if (scroll.first !== first || scroll.last !== last) {
          setScroll({ first, last })
        }
      }}
      {...props}
    />
  )
}

type BasedTableProps = Omit<UseInfiniteQueryOptions, 'view'> &
  Pick<
    InternalTableProps,
    | 'fields'
    | 'sort'
    | 'onSortChange'
    | 'select'
    | 'onSelectChange'
    | 'onItemClick'
  >

function BasedTable({
  query,
  totalQuery,
  transformQueryResult,
  sort,
  onSortChange,
  ...props
}: BasedTableProps) {
  const { data, total, handleScroll, reset } = useInfiniteQuery({
    view: 'table',
    query,
    totalQuery,
    transformQueryResult,
  })

  return (
    <InternalTable
      virtualized
      data={data}
      totalCount={total}
      sort={sort}
      onSortChange={(value) => {
        reset()
        onSortChange(value)
      }}
      onScroll={handleScroll}
      {...props}
    />
  )
}

export { InternalTable, Table, VirtualizedTable, BasedTable }
export type {
  InternalTableProps,
  TableProps,
  VirtualizedTableProps,
  BasedTableProps,
  TableFieldRenderOptions,
}
