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

// TODO add select, onSelectChange

type GridField = {
  key: string
  type?: 'image' | 'title' | 'description'
}

type GridItemProps = {
  data: any
  fields: GridField[]
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ data, fields }, ref) => {
    return (
      <styled.div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 8,
          borderRadius: radius[16],
          '&:hover': {
            background: colors.neutral10Background,
          },
        }}
      >
        {fields.map((field) => {
          const children: ReactNode[] = []

          //   TODO hoist them into GridImageField, GridTitleField, GridDescriptionfield (maybe desc can be the default), then have a similar api to Table for rendering custom stuff
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
                }}
              >
                {data[field.key] ? (
                  <img
                    src={(() => {
                      const src = data[field.key]

                      if (!src.includes('.based.dev')) return src

                      const [prefix, file] = src.split('.based.dev')

                      return `${prefix}.based.dev/cdn-cgi/image/format=auto,w=${300 * 2}${file}`
                    })()}
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
          }

          if (field.type === 'title') {
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
                >
                  {data[field.key]}
                </Text>
              </div>,
            )
          }

          if (field.type === 'description') {
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
                  variant="display-regular"
                  color="neutral60"
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
  fields: GridField[]
  virtualized?: boolean
  totalCount?: number
  onScroll?: (
    firstVisibleItemIndex: number,
    lastVisibleItemIndex: number,
  ) => void
}

const GRID_GAP = 4

function InternalGrid({
  data,
  fields,
  virtualized,
  totalCount,
  onScroll,
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

      state.current.columns = Math.round(clientWidth / (itemWidth + GRID_GAP))
      const extra = Math.ceil(clientHeight / (itemHeight + GRID_GAP)) * 2 // rows on screen * 2
      state.current.firstRow = Math.max(
        0,
        Math.floor(scrollTop / (itemHeight + GRID_GAP)) - extra,
      )
      state.current.lastRow =
        Math.floor(scrollTop / (itemHeight + GRID_GAP)) +
        Math.ceil(clientHeight / (itemHeight + GRID_GAP)) +
        extra
      state.current.itemHeight = itemHeight
      state.current.itemWidth = itemWidth

      onScroll?.(
        state.current.firstRow * state.current.columns,
        state.current.lastRow * state.current.columns + state.current.columns,
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

type GridProps = Pick<InternalGridProps, 'data' | 'fields'>

function Grid(props: GridProps) {
  return <InternalGrid {...props} />
}

type VirtualizedGridProps = Pick<InternalGridProps, 'data' | 'fields'>

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
  Pick<InternalGridProps, 'fields'>

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

export { Grid, VirtualizedGrid, BasedGrid }
export type { GridProps, VirtualizedGridProps, BasedGridProps, GridSelect }
