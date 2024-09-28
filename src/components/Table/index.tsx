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
import type { Sort, Select } from '../../utils/common.js'

// TODO better API for rowActions
// TODO add api for onRowClick

type TableInternalState = {
  forceHover?: string
  setForceHover: (value?: string) => void
}
type TableColumn = {
  key: string
  header: string | (() => ReactNode)
  cell?: (row: any, table: TableInternalState) => ReactNode
}

type InternalTableProps = {
  data: any[]
  totalCount?: number
  columns: TableColumn[]
  sort?: Sort
  onSortChange?: (sort?: Sort) => void
  select?: Select
  onSelectChange?: (select?: Select) => void
  onScroll?: (
    firstVisibleItemIndex: number,
    lastVisibleItemIndex: number,
  ) => void
  virtualized?: boolean
}

const HEADER_HEIGHT = 44
const ROW_HEIGHT = 50

function InternalTable({
  data = [],
  totalCount,
  columns,
  sort,
  onSortChange,
  select,
  onSelectChange,
  onScroll,
  virtualized,
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
      const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - extra)
      const last = Math.floor(scrollTop / ROW_HEIGHT) + count + extra

      setFirstVisibleItemIndex(first)
      setLastVisibleItemIndex(last)

      onScroll?.(first, last)
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

    scrollElementRef.current.scrollTop = 0
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
            {columns.map((column) => (
              <th
                key={column.key}
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
                  if (!onSortChange || typeof column.header === 'function')
                    return

                  if (sort?.key !== column.key) {
                    onSortChange({ key: column.key, direction: 'desc' })
                  } else if (
                    sort?.key === column.key &&
                    sort.direction === 'desc'
                  ) {
                    onSortChange({ key: column.key, direction: 'asc' })
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
                  {typeof column.header === 'function' ? (
                    column.header()
                  ) : (
                    <>
                      <Text variant="display-bold">{column.header}</Text>
                      {onSortChange && sort?.key === column.key && (
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
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    height: ROW_HEIGHT,
                    padding: '0 6px',
                    margin: 0,
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {column.cell ? (
                      column.cell(row, { forceHover, setForceHover })
                    ) : (
                      <Text variant="display-medium" color="neutral80">
                        {row[column.key]}
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
  'data' | 'columns' | 'sort' | 'onSortChange' | 'select' | 'onSelectChange'
>

function Table(props: TableProps) {
  return <InternalTable {...props} />
}

type VirtualizedTableProps = Pick<
  InternalTableProps,
  'data' | 'columns' | 'sort' | 'onSortChange' | 'select' | 'onSelectChange'
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

type BasedTableProps = UseInfiniteQueryOptions &
  Pick<
    InternalTableProps,
    'columns' | 'sort' | 'onSortChange' | 'select' | 'onSelectChange'
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

export { Table, VirtualizedTable, BasedTable }
export type { TableProps, VirtualizedTableProps, BasedTableProps, TableColumn }
