import { forwardRef, ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { styled } from 'inlines'
import { Icon } from '../Icon/index.js'
import { Text } from '../Text/index.js'

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

type GridProps = {
  data: any[]
  fields: GridField[]
}

// TODO this should go from 1 column to max of 5

const GRID_GAP = 4

function Grid({ data, fields }: GridProps) {
  const scrollElementRef = useRef<HTMLDivElement>()
  const firstItemRef = useRef<HTMLDivElement>()
  const [columns, setColumns] = useState(0)
  const [rowHeight, setRowHeight] = useState(0)
  const [firstRow, setFirstRow] = useState(0)
  const [lastRow, setLastRow] = useState(0)
  const [firstVisibleItemIndex, setFirstVisibleItemIndex] = useState(0)
  const [lastVisibleItemIndex, setLastVisibleItemIndex] = useState(1)
  const [itemWidth, setItemWidth] = useState(0)
  const prevItemMeasurements = useRef({ height: 0, width: 0 })
  const total = data.length

  useLayoutEffect(() => {
    if (!scrollElementRef.current || !firstItemRef.current) return () => {}

    function handleScroll() {
      const { scrollTop, clientHeight, clientWidth } = scrollElementRef.current
      const itemHeight = firstItemRef.current
        ? firstItemRef.current.clientHeight
        : prevItemMeasurements.current.height
      const itemWidth = firstItemRef.current
        ? firstItemRef.current.clientWidth
        : prevItemMeasurements.current.width

      const columns = Math.ceil(clientWidth / (itemWidth + GRID_GAP)) // couldnt figure out exact but ceil fixes it
      const visibleRows = Math.ceil(clientHeight / (itemHeight + GRID_GAP))
      const firstRow = Math.floor(scrollTop / (itemHeight + GRID_GAP))
      const lastRow =
        Math.floor(scrollTop / (itemHeight + GRID_GAP)) + visibleRows

      setColumns(columns)
      setRowHeight(itemHeight + GRID_GAP)
      setFirstVisibleItemIndex(firstRow * columns)
      setLastVisibleItemIndex(lastRow * columns + columns)
      setFirstRow(firstRow)
      setLastRow(lastRow)
      prevItemMeasurements.current = { height: itemHeight, width: itemWidth }

      //   console.log({
      //     columns,
      //     clientWidth,
      //     ITEM_WIDTH,
      //     firstRow,
      //     lastRow,
      //   })
    }

    handleScroll()
    scrollElementRef.current.addEventListener('scroll', handleScroll)
    const resizeObserver = new ResizeObserver(handleScroll)
    resizeObserver.observe(scrollElementRef.current)

    return () => {
      scrollElementRef.current.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [scrollElementRef, data, total])

  console.log(firstVisibleItemIndex, lastVisibleItemIndex)

  return (
    <div
      ref={scrollElementRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gap: 4,
        gridTemplateColumns: `repeat(auto-fill, minmax(160px, 1fr))`,
        overflowY: 'auto',
      }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} style={{ height: firstRow * rowHeight }} />
      ))}
      {data
        .slice(firstVisibleItemIndex, lastVisibleItemIndex)
        .map((item, index) => (
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
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          style={{ height: (total / columns - lastRow) * rowHeight }}
        />
      ))}
    </div>
  )
}

export { Grid }
export type { GridProps, GridSelect }
