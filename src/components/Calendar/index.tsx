import {
  autoPlacement,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import { shadows } from '../../utils/shadows.js'
import { Text } from '../Text/index.js'
import {
  addDays,
  addMinutes,
  addMonths,
  addYears,
  compareAsc,
  endOfMonth,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameYear,
  isToday,
  roundToNearestMinutes,
  set,
  setMonth,
  setYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'
import { Icon } from '../Icon/index.js'
import { styled } from 'inlines'

type CalendarProps = {
  children: ReactElement | (({ open }: { open: boolean }) => ReactElement)
  variant: 'date' | 'date-time'
  value: number // milliseconds elapsed since the epoch (so like Date.now())
  onChange: (value: number) => void
}

function Calendar({
  children,
  variant,
  value: msValue,
  onChange,
}: CalendarProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [
      offset(8),
      autoPlacement({
        allowedPlacements: [
          'top-start',
          'top-end',
          'bottom-start',
          'bottom-end',
        ],
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const value = useMemo(() => new Date(msValue), [msValue])

  const click = useClick(context, {
    event: 'click',
    toggle: true,
  })
  const dismiss = useDismiss(context, { bubbles: true })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss],
  )

  return (
    <>
      {cloneElement(
        typeof children === 'function' ? children({ open }) : children,
        {
          ref: refs.setReference,
          ...getReferenceProps(),
        },
      )}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            modal={false}
            context={context}
            initialFocus={-1}
            returnFocus={true}
          >
            <div
              ref={refs.setFloating}
              style={{
                position: 'relative',
                width: 240,
                borderRadius: radius[16],
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                outline: 'none',
                border: `1px solid ${colors.neutral10}`,
                background: colors.neutral10Background,
                boxShadow: shadows.popoverLarge,
                ...floatingStyles,
              }}
              {...getFloatingProps()}
            >
              {variant === 'date' && (
                <DatePicker
                  value={value}
                  onChange={(value) => {
                    onChange(value.getTime())
                  }}
                />
              )}
              {/* {variant === 'time' && <TimePicker />} */}
              {variant === 'date-time' && (
                <DateTimePicker
                  value={value}
                  onChange={(value) => {
                    onChange(value.getTime())
                  }}
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}

function DatePicker({
  value,
  onChange,
}: {
  value: Date
  onChange: (value: Date) => void
}) {
  const [view, setView] = useState('day')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const monthContainerRef = useRef<HTMLDivElement>(null)
  const yearContainerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (
      view !== 'month' ||
      !monthContainerRef.current ||
      !yearContainerRef.current
    )
      return

    monthContainerRef.current.scrollTop = (getMonth(currentMonth) - 1) * 34
    yearContainerRef.current.scrollTop = 34 * 4
  }, [view])

  const getDays = useCallback(() => {
    const days = []
    let curr = startOfWeek(startOfMonth(startOfDay(currentMonth)), {
      weekStartsOn: 1,
    })
    const end = endOfMonth(startOfDay(currentMonth))

    while (compareAsc(curr, end) < 1) {
      days.push(curr)
      curr = addDays(curr, 1)
    }

    return days
  }, [currentMonth])

  if (view === 'month') {
    return (
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexDirection: 'column',
        }}
      >
        <div>
          <Button
            trailIcon="tiny-chevron-up"
            variant="ghost"
            onClick={() => {
              setView('day')
            }}
            tooltip="Day"
          >
            {format(currentMonth, 'MMM yyyy')}
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: 184,
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
            ref={monthContainerRef}
          >
            {[...Array(12).keys()].map((e) => (
              <styled.div
                style={{
                  height: 32,
                  flexShrink: 0,
                  display: 'flex',
                  padding: '0 8px',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  borderRadius: radius[8],
                  '&:hover': {
                    background: colors.neutral10Background,
                  },
                }}
                onClick={() => {
                  setCurrentMonth(setMonth(currentMonth, e))
                }}
              >
                {getMonth(currentMonth) === e ? (
                  <Icon variant="checkmark" />
                ) : (
                  <div style={{ height: 24, width: 24 }} />
                )}
                <Text variant="display-medium">
                  {format(addMonths(startOfYear(new Date()), e), 'MMM')}
                </Text>
              </styled.div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: 184,
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
            ref={yearContainerRef}
          >
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((e) => (
              <styled.div
                style={{
                  height: 32,
                  flexShrink: 0,
                  display: 'flex',
                  padding: '0 8px',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  borderRadius: radius[8],
                  '&:hover': {
                    background: colors.neutral10Background,
                  },
                }}
                onClick={() => {
                  setCurrentMonth(
                    setYear(currentMonth, getYear(new Date()) + e),
                  )
                }}
              >
                {isSameYear(
                  currentMonth,
                  addYears(startOfYear(new Date()), e),
                ) ? (
                  <Icon variant="checkmark" />
                ) : (
                  <div style={{ height: 24, width: 24 }} />
                )}
                <Text variant="display-medium">
                  {format(addYears(startOfYear(new Date()), e), 'yyyy')}
                </Text>
              </styled.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          trailIcon="tiny-chevron-down"
          variant="ghost"
          onClick={() => {
            setView('month')
          }}
          tooltip="Month & year"
        >
          {format(currentMonth, 'MMM yyyy')}
        </Button>
        <div>
          <IconButton
            size="small"
            icon="chevron-left"
            onClick={() => {
              setCurrentMonth(addMonths(currentMonth, -1))
            }}
            tooltip="Previous month"
          />
          <IconButton
            size="small"
            icon="chevron-right"
            onClick={() => {
              setCurrentMonth(addMonths(currentMonth, 1))
            }}
            tooltip="Next month"
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '24px',
          gridTemplateColumns: 'repeat(7, 24px)',
          gap: 8,
          padding: '0 4px',
          placeItems: 'center',
        }}
      >
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((e) => (
          <Text variant="subtext-regular" color="neutral20">
            {e}
          </Text>
        ))}
        {getDays().map((e) =>
          isSameMonth(currentMonth, e) ? (
            <Button
              size="small"
              width="full"
              variant={
                isSameDay(value, e) ? 'fill' : isToday(e) ? 'border' : 'ghost'
              }
              onClick={() => {
                onChange(
                  set(value, {
                    year: e.getFullYear(),
                    month: e.getMonth(),
                    date: e.getDate(),
                  }),
                )
              }}
            >
              {format(e, 'd')}
            </Button>
          ) : (
            <div />
          ),
        )}
      </div>
    </div>
  )
}

function TimePicker({
  value: rawValue,
  onChange,
}: {
  value: Date
  onChange: (value: Date) => void
}) {
  const value = useMemo(
    () =>
      roundToNearestMinutes(rawValue, {
        nearestTo: 30,
        roundingMethod: 'floor',
      }),
    [rawValue],
  )
  const timeContainerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!timeContainerRef.current) return

    timeContainerRef.current.scrollTop =
      (getHours(value) * 2 + getMinutes(value) / 30 - 1) * 34
  }, [])

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: 184,
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
        ref={timeContainerRef}
      >
        {[...Array(24 * 2).keys()].map((e) => (
          <styled.div
            style={{
              height: 32,
              flexShrink: 0,
              display: 'flex',
              padding: '0 8px',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              borderRadius: radius[8],
              '&:hover': {
                background: colors.neutral10Background,
              },
            }}
            onClick={() => {
              onChange(addMinutes(startOfDay(value), e * 30))
            }}
          >
            {getHours(value) ===
              getHours(addMinutes(startOfDay(value), e * 30)) &&
            getMinutes(value) ===
              getMinutes(addMinutes(startOfDay(value), e * 30)) ? (
              <Icon variant="checkmark" />
            ) : (
              <div style={{ height: 24, width: 24 }} />
            )}
            <Text variant="display-medium">
              {format(addMinutes(startOfDay(value), e * 30), 'HH:mm')}
            </Text>
          </styled.div>
        ))}
      </div>
    </div>
  )
}

function DateTimePicker({
  value,
  onChange,
}: {
  value: Date
  onChange: (value: Date) => void
}) {
  const [view, setView] = useState('date')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Text variant="display-medium" color="neutral60">
          Date
        </Text>{' '}
        <Button
          onClick={() => {
            setView('date')
          }}
          variant="ghost"
          forceHover={view === 'date'}
          tooltip="Select date"
        >
          {format(new Date(value), 'MMM dd, yyyy')}
        </Button>
      </div>
      <div style={{ width: '100%', padding: '2px 8px' }}>
        <div
          style={{ height: 1, width: '100%', background: colors.neutral10 }}
        />
      </div>
      {view === 'date' && <DatePicker value={value} onChange={onChange} />}
      {view === 'date' && (
        <div style={{ width: '100%', padding: '2px 8px' }}>
          <div
            style={{ height: 1, width: '100%', background: colors.neutral10 }}
          />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Text variant="display-medium" color="neutral60">
          Time
        </Text>
        <Button
          onClick={() => {
            setView('time')
          }}
          variant="ghost"
          forceHover={view === 'time'}
          tooltip="Select time"
        >
          {format(new Date(value), 'HH:mm')}
        </Button>
      </div>
      {view === 'time' && (
        <div style={{ width: '100%', padding: '2px 8px' }}>
          <div
            style={{ height: 1, width: '100%', background: colors.neutral10 }}
          />
        </div>
      )}
      {view === 'time' && <TimePicker value={value} onChange={onChange} />}
    </div>
  )
}

export { Calendar }
export type { CalendarProps }
