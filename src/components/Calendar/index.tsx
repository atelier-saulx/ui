import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  isFirstDayOfMonth,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'
import { Field, getTitleField } from '../../utils/common.js'
import { CalendarItem } from './CalendarItem.js'
import { ScrollArea } from '../ScrollArea/index.js'

type CalendarVariant = 'monthly' | 'weekly' | '2-weekly'

type CalendarProps = {
  data: any[]
  fields: Field[]
  visiblePeriod: number
  variant?: CalendarVariant
  onItemClick?: (item: any) => void
}

function Calendar({
  data: dataProp,
  variant = 'monthly',
  visiblePeriod,
  fields,
  onItemClick,
}: CalendarProps) {
  const startField = fields.find((e) => e.calendar === 'start')?.key
  const endField = fields.find((e) => e.calendar === 'end')?.key
  const titleField = getTitleField(fields)?.key
  const data = dataProp.filter(
    (e) => e[startField] && (!endField || e[endField]),
  )
  const currentPeriodStart = useMemo(() => {
    if (variant === 'monthly') {
      return startOfWeek(startOfMonth(new Date(visiblePeriod)), {
        weekStartsOn: 1,
      })
    }

    return startOfWeek(new Date(visiblePeriod), { weekStartsOn: 1 })
  }, [visiblePeriod, variant])
  const [openDay, setOpenDay] = useState<Date>()
  const [cellHeight, setCellHeight] = useState<number>()
  const cellRef = useRef<HTMLDivElement>()
  const maxItemsPerCell = Math.floor(
    (cellHeight + 4) / ((variant === 'monthly' ? 24 : 40) + 4),
  )

  const days = useMemo(() => {
    const count =
      variant === 'monthly' ? 6 * 7 : variant === '2-weekly' ? 2 * 7 : 7
    const res: { date: Date; items: any[] }[] = []
    const prevDayItems: any[] = []

    for (let i = 0; i < count; i++) {
      const day = addDays(currentPeriodStart, i)

      // TODO is structClone needed? it was a fix for the __hidden attribute sticking around but now it might not be necessary
      const dayItems = structuredClone(data).filter((e) =>
        endField
          ? isWithinInterval(day, {
              start: new Date(e[startField]),
              end: new Date(e[endField]),
            })
          : isSameDay(day, new Date(e[startField])),
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
        const indexOfItemInPrevDay = prevDayItems.findIndex(
          (e) => e.id === item.id,
        )

        if (indexOfItemInPrevDay === -1) {
          const index = items.findIndex((e) => e === null)
          items[index] = item
          prevDayItems[index] = item
        }
      }

      while (items.length > 0 && items[items.length - 1] === null) {
        items.pop()
      }

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
            items[j].__hidden = true
          }
        }
      }
    }

    return res
  }, [currentPeriodStart, maxItemsPerCell, data, variant])

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
  }, [data])

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
          gridTemplateRows:
            variant === 'monthly'
              ? '40px repeat(6, 1fr)'
              : variant === '2-weekly'
                ? '40px repeat(2, 1fr)'
                : '40px 1fr',
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
              ...(variant === 'monthly' && {
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
              }),
              ...(variant === 'weekly' && {
                borderTop: `1px solid ${colors.neutral20Adjusted}`,
                ...(index === 0 && {
                  borderLeft: `1px solid ${colors.neutral20Adjusted}`,
                  borderTopLeftRadius: radius[8],
                  borderBottomLeftRadius: radius[8],
                }),
                ...(index === 6 && {
                  borderTopRightRadius: radius[8],
                  borderBottomRightRadius: radius[8],
                }),
              }),
              ...(variant === '2-weekly' && {
                ...(index < 7 && {
                  borderTop: `1px solid ${colors.neutral20Adjusted}`,
                }),
                ...(index % 7 === 0 && {
                  borderLeft: `1px solid ${colors.neutral20Adjusted}`,
                }),
                ...(index === 0 && {
                  borderTopLeftRadius: radius[8],
                }),
                ...(index === 6 && {
                  borderTopRightRadius: radius[8],
                }),
                ...(index === 7 && {
                  borderBottomLeftRadius: radius[8],
                }),
                ...(index === 13 && {
                  borderBottomRightRadius: radius[8],
                }),
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
              <Button
                variant={
                  isSameDay(openDay, day.date)
                    ? 'fill'
                    : isSameDay(new Date(), day.date)
                      ? 'border'
                      : 'ghost'
                }
                size="small"
                onClick={() => {
                  setOpenDay(day.date)
                }}
              >
                {isFirstDayOfMonth(day.date)
                  ? format(day.date, 'MMM d')
                  : format(day.date, 'd')}
              </Button>
            </div>
            <div
              style={{
                flex: 1,
                position: 'relative',
                minHeight: 2 * (variant === 'monthly' ? 24 : 40) + 4,
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
                  const children = []

                  const visiblePartOfDayOnlyContainsPlaceholders = day.items
                    .filter((e) => !e?.__hidden)
                    .slice(0, maxItemsPerCell)
                    .every((e) => e === null)

                  if (!visiblePartOfDayOnlyContainsPlaceholders) {
                    children.push(
                      ...day.items
                        .filter((e) => !e?.__hidden)
                        .slice(
                          0,
                          day.items.some((e) => e?.__hidden)
                            ? maxItemsPerCell - 1
                            : maxItemsPerCell,
                        )
                        .map((e, i) =>
                          e === null ? (
                            <div
                              key={index + i}
                              style={{
                                height: variant === 'monthly' ? 24 : 40,
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <div
                              key={index + i}
                              style={
                                endField &&
                                !isSameDay(
                                  new Date(e[startField]),
                                  new Date(e[endField]),
                                ) && {
                                  ...(isSameDay(
                                    day.date,
                                    new Date(e[startField]),
                                  ) && {
                                    marginRight: -8,
                                  }),
                                  ...(isSameDay(
                                    day.date,
                                    new Date(e[endField]),
                                  ) && {
                                    marginLeft: -9,
                                  }),
                                  ...(!isSameDay(
                                    day.date,
                                    new Date(e[startField]),
                                  ) &&
                                    !isSameDay(
                                      day.date,
                                      new Date(e[endField]),
                                    ) && {
                                      marginRight: -8,
                                      marginLeft: -9,
                                    }),
                                  ...(!isSameDay(
                                    day.date,
                                    new Date(e[startField]),
                                  ) &&
                                    !isSameDay(
                                      day.date,
                                      new Date(e[endField]),
                                    ) &&
                                    index % 7 === 6 && {
                                      marginRight: -9,
                                    }),
                                }
                              }
                            >
                              <CalendarItem
                                title={titleField ? e[titleField] : ''}
                                position={
                                  !endField ||
                                  isSameDay(
                                    new Date(e[startField]),
                                    new Date(e[endField]),
                                  )
                                    ? undefined
                                    : isSameDay(
                                          day.date,
                                          new Date(e[startField]),
                                        )
                                      ? 'start'
                                      : isSameDay(
                                            day.date,
                                            new Date(e[endField]),
                                          )
                                        ? 'end'
                                        : 'middle'
                                }
                                description={
                                  variant !== 'monthly' &&
                                  `${format(new Date(e[startField]), 'MMM d · HH:mm')}${endField ? ` - ${format(new Date(e[endField]), 'MMM d · HH:mm')}` : ''}`
                                }
                                onClick={() => {
                                  onItemClick?.(e)
                                }}
                              />
                            </div>
                          ),
                        ),
                    )
                  }

                  if (day.items.some((e) => e?.__hidden)) {
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
                          {`Show ${day.items.filter((e) => e?.__hidden).length} more`}
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
            position: 'relative',
            marginTop: 40,
            width: 288,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100svh - 68px - 40px - 20px)', // viewport - appheader - margin on this element - bottom padding
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
                  data.filter((e) =>
                    endField
                      ? isWithinInterval(openDay, {
                          start: new Date(e[startField]),
                          end: new Date(e[endField]),
                        })
                      : isSameDay(openDay, new Date(e[startField])),
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
          <ScrollArea style={{ padding: 16 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {data
                .filter((e) =>
                  endField
                    ? isWithinInterval(openDay, {
                        start: new Date(e[startField]),
                        end: new Date(e[endField]),
                      })
                    : isSameDay(openDay, new Date(e[startField])),
                )
                .map((e) => (
                  <CalendarItem
                    key={e.id}
                    title={titleField ? e[titleField] : ''}
                    description={`${format(new Date(e[startField]), 'MMM d · HH:mm')}${endField ? ` - ${format(new Date(e[endField]), 'MMM d · HH:mm')}` : ''}`}
                    onClick={() => {
                      onItemClick?.(e)
                    }}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

type CalendarControlsProps = Pick<CalendarProps, 'variant'> & {
  value: number
  onChange: (value: number) => void
}

function CalendarControls({
  variant = 'monthly',
  value,
  onChange,
}: CalendarControlsProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton
        icon="arrow-left"
        onClick={() => {
          if (variant === 'monthly') {
            onChange(
              addMonths(
                startOfWeek(new Date(value), { weekStartsOn: 1 }),
                -1,
              ).getTime(),
            )
            return
          }

          if (variant === '2-weekly') {
            onChange(
              addWeeks(
                startOfWeek(new Date(value), { weekStartsOn: 1 }),
                -2,
              ).getTime(),
            )
            return
          }

          onChange(
            addWeeks(
              startOfWeek(new Date(value), { weekStartsOn: 1 }),
              -1,
            ).getTime(),
          )
        }}
      />
      <Button variant="ghost">
        {variant === 'monthly' && format(value, 'MMMM yyyy')}
        {variant === '2-weekly' &&
          `${format(startOfWeek(value, { weekStartsOn: 1 }), 'MMM d yyyy')} - ${format(addDays(startOfWeek(value, { weekStartsOn: 1 }), 13), 'MMM d yyyy')}`}
        {variant === 'weekly' &&
          `${format(startOfWeek(value, { weekStartsOn: 1 }), 'MMM d yyyy')} - ${format(addDays(startOfWeek(value, { weekStartsOn: 1 }), 6), 'MMM d yyyy')}`}
      </Button>
      <IconButton
        icon="arrow-right"
        onClick={() => {
          if (variant === 'monthly') {
            onChange(
              addMonths(
                startOfWeek(new Date(value), { weekStartsOn: 1 }),
                1,
              ).getTime(),
            )
            return
          }

          if (variant === '2-weekly') {
            onChange(
              addWeeks(
                startOfWeek(new Date(value), { weekStartsOn: 1 }),
                2,
              ).getTime(),
            )
            return
          }

          onChange(
            addWeeks(
              startOfWeek(new Date(value), { weekStartsOn: 1 }),
              1,
            ).getTime(),
          )
        }}
      />
    </div>
  )
}

Calendar.Controls = CalendarControls

export { Calendar }
export type { CalendarProps, CalendarVariant, CalendarControlsProps }
