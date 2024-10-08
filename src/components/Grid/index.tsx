import { forwardRef, ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { styled } from 'inlines'
import { Icon } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { useRerender } from '../../hooks/useRerender.js'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '../../hooks/useInfiniteQuery.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { Field, Select } from '../../utils/common.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { Badge } from '../Badge/index.js'
import { prettyDate } from '@based/pretty-date'
import { prettyNumber } from '@based/pretty-number'

// TODO add item action

type GridItemProps = {
  data: any
  fields: Field[]
  onClick?: () => void
} & Pick<InternalGridProps, 'select' | 'onSelectChange'>

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ data, fields, select, onSelectChange, onClick }, ref) => {
    const selected = select?.includes(data.id)

    return (
      <styled.div
        onClick={onClick}
        ref={ref}
        data-selected={selected ? true : undefined}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 8,
          borderRadius: radius[16],
          '&:hover, &[data-selected]': {
            background: colors.neutral10Adjusted,
          },
          '&:hover > .selectContainer, &[data-selected] > .selectContainer': {
            opacity: '100% !important',
          },
        }}
      >
        {onSelectChange && (
          <div
            className="selectContainer"
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              opacity: 0,
              height: 32,
              width: 32,
              borderRadius: radius[8],
              background: colors.neutralInverted100,
              overflow: 'hidden',
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: colors.neutral10Adjusted,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CheckboxInput
                value={selected}
                onChange={() => {
                  if (!select) {
                    onSelectChange([data.id])
                    return
                  }

                  if (select.includes(data.id)) {
                    onSelectChange(select.filter((e) => e !== data.id))
                    return
                  }

                  onSelectChange([...select, data.id])
                }}
              />
            </div>
          </div>
        )}
        {fields
          .filter((field) => !['id', '_item_action'].includes(field.key))
          .map((field) => {
            const children: ReactNode[] = []

            if (field.type === 'image') {
              children.push(
                <div
                  key={field.key}
                  style={{
                    borderRadius: radius[8],
                    background: colors.neutral10Adjusted,
                    border: `1px solid ${colors.neutral20Adjusted}`,
                    aspectRatio: 1,
                    overflow: 'hidden',
                    marginBottom: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {data[field.key] ? (
                    <img
                      src={data[field.key]}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <Icon variant="image" />
                  )}
                </div>,
              )
            } else if (field.type === 'badge') {
              children.push(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Badge>{data[field.key]}</Badge>
                </div>,
              )
            } else if (field.type === 'number-bytes') {
              children.push(
                <div
                  style={{
                    height: 24,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    key={field.key}
                    variant="display-medium"
                    color="neutral80"
                    singleLine
                  >
                    {prettyNumber(data[field.key], 'number-bytes')}
                  </Text>
                </div>,
              )
            } else if (field.type === 'date-time-human') {
              children.push(
                <div
                  style={{
                    height: 24,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    key={field.key}
                    variant="display-medium"
                    color="neutral80"
                    singleLine
                  >
                    {prettyDate(data[field.key], 'date-time-human')}
                  </Text>
                </div>,
              )
            } else if (field.render) {
              children.push(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {field.render(data)}
                </div>,
              )
            } else {
              children.push(
                <div
                  style={{
                    height: 24,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    key={field.key}
                    variant="display-medium"
                    color="neutral80"
                    singleLine
                  >
                    {data[field.key]}
                  </Text>
                </div>,
              )
            }

            return children
          })}
      </styled.div>
    )
  },
)

type GridSelect = string[]

type GridState = {
  columns: number
  firstRow: number
  lastRow: number
  itemHeight: number
  itemWidth: number
}

type InternalGridProps = {
  data: any[]
  fields: Field[]
  virtualized?: boolean
  totalCount?: number
  onScroll?: (
    firstVisibleItemIndex: number,
    lastVisibleItemIndex: number,
    realFirstVisibleItemIndex: number,
    realLastVisibleItemIndex: number,
  ) => void
  select?: Select
  onSelectChange?: (select?: Select) => void
  onItemClick?: (item: any) => void
}

const GRID_GAP = 4

function InternalGrid({
  data,
  fields,
  virtualized,
  totalCount,
  onScroll,
  select,
  onSelectChange,
  onItemClick,
}: InternalGridProps) {
  const scrollElementRef = useRef<HTMLDivElement>()
  const firstItemRef = useRef<HTMLDivElement>()
  const rerender = useRerender()
  const state = useRef<GridState>({
    columns: 1,
    firstRow: 0,
    lastRow: 1,
    itemHeight: 0,
    itemWidth: 160,
  })

  const { columns, itemHeight, firstRow, lastRow } = state.current
  const total = totalCount ?? data.length

  useLayoutEffect(() => {
    if (!scrollElementRef.current || !virtualized) return () => {}

    function handleScroll() {
      const { scrollTop, clientHeight, clientWidth } = scrollElementRef.current

      const itemHeight =
        firstItemRef.current?.clientHeight ?? state.current.itemHeight
      const itemWidth =
        firstItemRef.current?.clientWidth ?? state.current.itemWidth
      const columns = Math.round(clientWidth / (itemWidth + GRID_GAP))
      const rows = Math.ceil(clientHeight / (itemHeight + GRID_GAP))
      const extra = rows
      const firstRow = Math.floor(scrollTop / (itemHeight + GRID_GAP))
      const firstRowWithOverscan = Math.max(0, firstRow - extra)
      const lastRow = firstRow + rows
      const lastRowWithOverscan = lastRow + extra

      state.current.columns = columns
      state.current.firstRow = firstRowWithOverscan
      state.current.lastRow = lastRowWithOverscan
      state.current.itemHeight = itemHeight
      state.current.itemWidth = itemWidth

      onScroll?.(
        firstRowWithOverscan * columns,
        lastRowWithOverscan * columns,
        firstRow * columns,
        lastRow * columns,
      )
      rerender()
    }

    handleScroll()
    scrollElementRef.current.addEventListener('scroll', handleScroll)
    const resizeObserver = new ResizeObserver(handleScroll)
    resizeObserver.observe(scrollElementRef.current)

    return () => {
      scrollElementRef.current.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [scrollElementRef, data])

  return (
    <ScrollArea ref={scrollElementRef}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gap: GRID_GAP,
          gridTemplateColumns: `repeat(auto-fill, minmax(160px, 1fr))`,
          padding: '8px 12px',
        }}
      >
        {virtualized &&
          !!firstRow &&
          Array.from({ length: columns }).map((_, i) => (
            <div
              key={'above' + i}
              style={{ height: firstRow * (itemHeight + GRID_GAP) }}
            />
          ))}
        {data.map((item, index) => (
          <GridItem
            ref={
              index === 0
                ? (r) => {
                    firstItemRef.current = r
                  }
                : undefined
            }
            key={item.id}
            data={item}
            fields={fields}
            select={select}
            onSelectChange={onSelectChange}
            onClick={() => {
              onItemClick?.(item)
            }}
          />
        ))}
        {virtualized &&
          lastRow * columns + columns < total &&
          Array.from({ length: columns }).map((_, i) => (
            <div
              key={'below' + i}
              style={{
                height: (total / columns - lastRow) * (itemHeight + GRID_GAP),
              }}
            />
          ))}
      </div>
    </ScrollArea>
  )
}

type GridProps = Pick<
  InternalGridProps,
  'data' | 'fields' | 'select' | 'onSelectChange'
>

function Grid(props: GridProps) {
  return <InternalGrid {...props} />
}

type VirtualizedGridProps = Pick<
  InternalGridProps,
  'data' | 'fields' | 'select' | 'onSelectChange'
>

function VirtualizedGrid({ data, ...props }: GridProps) {
  const [scroll, setScroll] = useState({ first: 0, last: 0 })

  return (
    <InternalGrid
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

type BasedGridProps = UseInfiniteQueryOptions &
  Pick<InternalGridProps, 'fields' | 'select' | 'onSelectChange'>

function BasedGrid({
  query,
  totalQuery,
  transformQueryResult,
  ...props
}: BasedGridProps) {
  const { data, total, handleScroll } = useInfiniteQuery({
    query,
    totalQuery,
    transformQueryResult,
  })

  return (
    <InternalGrid
      data={data}
      totalCount={total}
      onScroll={handleScroll}
      virtualized
      {...props}
    />
  )
}

export { InternalGrid, Grid, VirtualizedGrid, BasedGrid }
export type {
  InternalGridProps,
  GridProps,
  VirtualizedGridProps,
  BasedGridProps,
  GridSelect,
}
