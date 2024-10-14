import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'
import {
  addDays,
  format,
  isFirstDayOfMonth,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'

// TODO go thru every day, see if the number of items after filling the array is bigger than maxItemsPerCell if so flag those whole items as hidden. (on prev days too!); show 81 more should be based on the number of hidden items so it's accurate.

const TEST_DATA = [
  {
    id: 1,
    start: new Date('2024/8/31'),
    end: new Date('2024/9/2'),
    name: 'Example game',
    color: 'neutral',
  },
  {
    id: 2,
    start: new Date('2024/9/2'),
    end: new Date('2024/9/5'),
    name: 'Example game 2',
    color: 'blue',
  },
  {
    id: 3,
    start: new Date('2024/9/4'),
    end: new Date('2024/9/8'),
    name: 'Example game 3',
    color: 'green',
  },
  {
    id: 4,
    start: new Date('2024/9/1'),
    end: new Date('2024/9/4'),
    name: 'Example game 4',
    color: 'orange',
  },
  {
    id: 5,
    start: new Date('2024/9/5'),
    end: new Date('2024/9/7'),
    name: 'Example game 5',
    color: 'neutral',
  },
  {
    id: 6,
    start: new Date('2024/9/5'),
    end: new Date('2024/9/10'),
    name: 'Example game 6',
    color: 'red',
  },
  {
    id: 7,
    start: new Date('2024/9/7'),
    end: new Date('2024/9/8'),
    name: 'Example game 7',
    color: 'neutral',
  },
  {
    id: 8,
    start: new Date('2024/9/4'),
    end: new Date('2024/9/7'),
    name: 'Example game 8',
    color: 'orange',
  },
]

type CalendarViewProps = {}

function CalendarView(props: CalendarViewProps) {
  const [currentPeriodStart, setCurrentPeriodStart] = useState(
    startOfWeek(startOfMonth(new Date('2024/9/5')), { weekStartsOn: 1 }),
  )
  const [openDay, setOpenDay] = useState<Date>()
  const [cellHeight, setCellHeight] = useState<number>()
  const cellRef = useRef<HTMLDivElement>()
  const maxItemsPerCell = Math.floor((cellHeight + 4) / (24 + 4))

  useLayoutEffect(() => {
    if (!cellRef.current) return

    function measure() {
      setCellHeight(cellRef.current.clientHeight)
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(cellRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const days = useMemo(() => {
    const res: { date: Date; items: any[] }[] = []
    const prevDayItems: any[] = []

    for (let i = 0; i < 7 * 6; i++) {
      const day = addDays(currentPeriodStart, i)

      const dayItems = structuredClone(TEST_DATA).filter((e) =>
        isWithinInterval(day, { start: e.start, end: e.end }),
      )

      const items = Array.from({
        length: Math.max(dayItems.length, prevDayItems.length),
      }).fill(null)

      for (const item of dayItems) {
        const indexOfItemInPrevDay = prevDayItems.findIndex(
          (e) => e.id === item.id,
        )

        if (indexOfItemInPrevDay !== -1) {
          items[indexOfItemInPrevDay] = item
        }
      }

      for (const item of dayItems) {
        const indexOfItemInPrevDay = TEST_DATA.filter((e) =>
          isWithinInterval(addDays(currentPeriodStart, i - 1), {
            start: e.start,
            end: e.end,
          }),
        ).findIndex((e) => e.id === item.id)

        if (indexOfItemInPrevDay === -1) {
          const index = items.findIndex((e) => e === null)
          items[index] = item
          prevDayItems[index] = item
        }
      }

      while (items.length > 0 && items[items.length - 1] === null) {
        items.pop()
      }

      console.log(format(day, 'MMM d'), items)
      res.push({ date: day, items })
    }

    const overflowingItemIds = new Set()

    for (let k = 0; k < res.length; k++) {
      const { items } = res[k]
      if (items.length > maxItemsPerCell) {
        const overflowingItems = items.slice(maxItemsPerCell - 1)

        for (let l = 0; l < overflowingItems.length; l++) {
          if (overflowingItems[l]) {
            overflowingItemIds.add(overflowingItems[l].id)
          }
        }
      }
    }

    for (let i = 0; i < res.length; i++) {
      const { items } = res[i]
      for (let j = 0; j < items.length; j++) {
        if (items[j]) {
          if (overflowingItemIds.has(items[j].id)) {
            items[j].hidden = true
          }
        }
      }
    }

    console.log(overflowingItemIds)

    return res
  }, [currentPeriodStart, maxItemsPerCell])

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: '0 20px 20px',
      }}
    >
      <div
        style={{
          display: 'grid',
          width: '100%',
          height: '100%',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: '40px repeat(6, 1fr)',
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((e) => (
          <div
            key={e}
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              padding: '0 14px',
            }}
          >
            <Text variant="display-medium" color="neutral60">
              {e}
            </Text>
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={day.date.getTime()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0 8px 4px',
              borderBottom: `1px solid ${colors.neutral20Adjusted}`,
              borderRight: `1px solid ${colors.neutral20Adjusted}`,
              ...(index % 7 === 0 && {
                borderLeft: `1px solid ${colors.neutral20Adjusted}`,
              }),
              ...(index < 7 && {
                borderTop: `1px solid ${colors.neutral20Adjusted}`,
              }),
              ...(index === 0 && {
                borderTopLeftRadius: radius[8],
              }),
              ...(index === 6 && {
                borderTopRightRadius: radius[8],
              }),
              ...(index === 35 && {
                borderBottomLeftRadius: radius[8],
              }),
              ...(index === 41 && {
                borderBottomRightRadius: radius[8],
              }),
            }}
          >
            <div
              style={{
                height: 36,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              <Text variant="subtext-medium" color="neutral80">
                {isFirstDayOfMonth(day.date)
                  ? format(day.date, 'MMM d')
                  : format(day.date, 'd')}
              </Text>
            </div>
            <div
              style={{
                flex: 1,
                position: 'relative',
                minHeight: 2 * 24 + 4,
              }}
              ref={(e) => {
                if (index === 0 && e) {
                  cellRef.current = e
                }
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {(() => {
                  const items = day.items
                  const showMoreButton = maxItemsPerCell < items.length

                  const children = []

                  children.push(
                    ...items
                      //   .filter((e) => !e?.hidden)
                      //   .slice(0, maxItemsPerCell - 1)
                      .map((e, i) =>
                        e === null ? (
                          <div
                            key={index + i}
                            style={{
                              height: 24,
                              flexShrink: 0,
                              background: 'pink',
                            }}
                          />
                        ) : (
                          <div
                            key={index + i}
                            style={{
                              flexShrink: 0,
                              height: 24,
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0 6px',
                              ...(e.color === 'neutral' && {
                                background: colors.neutral5,
                                color: colors.neutral80,
                              }),
                              ...(e.color === 'green' && {
                                background: colors.green10,
                                color: colors.green100,
                              }),
                              ...(e.color === 'blue' && {
                                background: colors.blue10,
                                color: colors.blue100,
                              }),
                              ...(e.color === 'orange' && {
                                background: colors.orange10,
                                color: colors.orange100,
                              }),
                              ...(e.color === 'red' && {
                                background: colors.red10,
                                color: colors.red100,
                              }),
                              ...(isSameDay(day.date, e.start) && {
                                borderTopLeftRadius: radius[8],
                                borderBottomLeftRadius: radius[8],
                              }),
                              ...(isSameDay(day.date, e.end) && {
                                borderTopRightRadius: radius[8],
                                borderBottomRightRadius: radius[8],
                              }),
                              ...(!isSameDay(e.start, e.end) &&
                                isSameDay(day.date, e.start) && {
                                  marginRight: -8,
                                }),
                              ...(!isSameDay(e.start, e.end) &&
                                isSameDay(day.date, e.end) && {
                                  marginLeft: -9,
                                }),
                              ...(!isSameDay(e.start, e.end) &&
                                !isSameDay(day.date, e.start) &&
                                !isSameDay(day.date, e.end) && {
                                  marginRight: -8,
                                  marginLeft: -9,
                                }),
                              ...(!isSameDay(e.start, e.end) &&
                                !isSameDay(day.date, e.start) &&
                                !isSameDay(day.date, e.end) &&
                                index % 7 === 6 && {
                                  marginRight: -9,
                                }),
                            }}
                          >
                            {isSameDay(day.date, e.start) && (
                              <Text
                                singleLine
                                variant="subtext-medium"
                                color="inherit"
                              >
                                {e.name}
                              </Text>
                            )}
                          </div>
                        ),
                      ),
                  )

                  if (showMoreButton) {
                    children.push(
                      <div
                        key="button"
                        style={{ display: 'flex', flexShrink: 1 }}
                      >
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => {
                            setOpenDay(day.date)
                          }}
                        >
                          {`Show more`}
                        </Button>
                      </div>,
                    )
                  }

                  return children
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {openDay && (
        <div
          style={{
            marginTop: 40,
            width: 288,
            height: 'calc(100% - 40px)',
            borderRadius: radius[8],
            border: `1px solid ${colors.neutral20Adjusted}`,
          }}
        >
          <div
            style={{
              padding: 16,
              borderBottom: `1px solid ${colors.neutral20Adjusted}`,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text color="neutral80" variant="display-bold">
                {format(openDay, 'MMM d, yyyy')}
              </Text>
              <Text color="neutral60" variant="display-regular">
                {
                  TEST_DATA.filter((e) =>
                    isWithinInterval(openDay, { start: e.start, end: e.end }),
                  ).length
                }{' '}
                items
              </Text>
            </div>
            <IconButton
              size="small"
              icon="close"
              onClick={() => {
                setOpenDay(undefined)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { CalendarView }
export type { CalendarViewProps }
