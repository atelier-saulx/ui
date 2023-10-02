import React, { useRef, useState, useEffect } from 'react'
import { Text } from '../../components'
import { IconCalendar, IconChevronDown } from '../../icons'
import { BpTablet } from '../../utils'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { Picker } from './Picker'
import { NewTimeInput } from './NewTimeInput'
import { monthArr } from '../DateRange/DateRangeDoubleInput'
import * as Popover from '@radix-ui/react-popover'

type newDateProps = {
  value: number
  setValue: (e) => void
  time?: boolean
  style?: Style
  numbered?: boolean
}

const hover = {
  '&:hover': {
    backgroundColor: genColor('action', 'neutral', 'subtleHover'),
  },
}

export const NewDateInput = ({
  value,
  setValue,
  time,
  style,
  numbered = false,
}: newDateProps) => {
  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // try this
  const DateObjVal = new Date(value)

  const newDay = DateObjVal.getDate()
  const newMonth = DateObjVal.getMonth() + 1
  const newYear = DateObjVal.getFullYear()

  const [day, setDay] = useState<any>(newDay || '')
  const [month, setMonth] = useState<any>(newMonth || '')
  const [year, setYear] = useState<any>(newYear || '')
  const [open, setOpen] = useState(false)

  const [focusField, setFocusField] = useState<
    'dayFocus' | 'monthFocus' | 'yearFocus' | ''
  >('')

  const fullDateString = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`

  // get the time as string format 00:00
  const [timeString, setTimeString] = useState(
    new Date(value).toString()?.split(' ')[4]?.split(':').slice(0, -1).join(':')
  )

  const stringToMilliseconds = (str: string, time?: string): number => {
    const dateString = `${str?.split('/').reverse().join('-')}T${
      time || '00:00'
    }`
    const outputMs = new Date(dateString).getTime()
    return outputMs || 0
  }

  useEffect(() => {
    if (
      day &&
      month &&
      year.toString().length > 3 &&
      stringToMilliseconds(fullDateString, timeString) !== value
    ) {
      setValue(stringToMilliseconds(fullDateString, timeString))
    }
  }, [day, month, year, timeString])

  useEffect(() => {
    setDay(newDay || '')
    setMonth(newMonth || '')
    setYear(newYear || '')
  }, [value])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  return (
    <Popover.Root open={open}>
      <styled.div style={{ display: 'flex' }}>
        {/* hide from ui - user */}
        <styled.div
          onClick={(e) => e.preventDefault()}
          style={{
            opacity: 0,
            position: 'absolute',
            pointerEvents: 'none',
            //  marginTop: -32,
          }}
        >
          <input
            type="number"
            style={{ maxWidth: 40, border: '1px solid red' }}
            ref={dayRef}
            value={day}
            onChange={(e) => {
              // should get last day of the month
              if (
                +e.target.value < 1 ||
                +e.target.value > daysInMonth(newMonth, newYear)
              ) {
                setDay(1)
              } else {
                setDay(+e.target.value)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                setDay('')
              }
              if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
                setDay(daysInMonth(newMonth, newYear) + 1)
              }
            }}
            onKeyUp={(e) => {
              if (+e.key > 3) {
                monthRef.current?.select()
              }
              if (
                e.currentTarget.value.length > 1 &&
                e.key !== 'ArrowDown' &&
                e.key !== 'ArrowUp' &&
                e.key !== 'ArrowLeft'
              ) {
                monthRef.current?.select()
              }
              if (e.key === 'ArrowRight') {
                monthRef.current?.select()
              }
            }}
            onFocus={() => setFocusField('dayFocus')}
            onBlur={() => setFocusField('')}
          />
          <input
            type="number"
            style={{ maxWidth: 40, border: '1px solid purple' }}
            ref={monthRef}
            value={month}
            onChange={(e) => {
              if (+e.target.value < 1 || +e.target.value > 12) {
                setMonth(1)
              } else {
                setMonth(+e.target.value)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                setMonth('')
              }
              if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
                setMonth(13)
              }
            }}
            onKeyUp={(e) => {
              if (+e.key > 1 && +e.currentTarget.value > 1) {
                yearRef.current?.select()
              }
              if (
                e.currentTarget.value.length > 1 &&
                e.key !== 'ArrowDown' &&
                e.key !== 'ArrowUp' &&
                e.key !== 'ArrowLeft'
              ) {
                yearRef.current?.select()
              }
              if (e.key === 'ArrowRight') {
                yearRef.current?.select()
              }
              if (e.key === 'ArrowLeft') {
                dayRef.current?.focus()
                dayRef.current?.select()
              }
            }}
            onFocus={() => setFocusField('monthFocus')}
            onBlur={() => setFocusField('')}
          />
          <input
            type="number"
            style={{ maxWidth: 40, border: '1px solid green' }}
            ref={yearRef}
            value={year}
            onChange={(e) => {
              if (day === 29 && month === 2) {
                // Set year to schikkeljaar
                console.log('leap year 🐸')
              } else {
                setYear(+e.target.value)
              }
            }}
            onKeyDown={(e) => {
              if (day === 29 && month === 2 && e.key === 'ArrowUp') {
                setYear(year + 4)
              }
              if (day === 29 && month === 2 && e.key === 'ArrowDown') {
                setYear(year - 4)
              }
              if (e.key === 'Backspace') {
                setYear('')
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'ArrowLeft') {
                monthRef.current?.select()
              }
            }}
            onFocus={() => setFocusField('yearFocus')}
            onBlur={() => setFocusField('')}
          />
        </styled.div>
        <Popover.Anchor asChild>
          <div ref={inputRef}>
            <styled.div
              style={{
                border: '2px solid transparent',
              }}
            >
              <styled.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: '40px',
                  padding: '0px 12px',
                  gap: 2,
                  mindWidth: '296px',
                  borderRadius: '8px',
                  border: `1px solid ${genColor(
                    'inputBorder',
                    'neutralNormal'
                  )}`,
                  '&:hover': {
                    border: `1px solid ${genColor(
                      'inputBorder',
                      'neutralHover'
                    )}`,
                  },
                  [BpTablet]: {
                    '&:hover': null,
                  },
                  '&:active': {
                    border: `1px solid ${genColor(
                      'inputBorder',
                      'neutralActive'
                    )}`,
                  },
                  '&:focus': {
                    border: `1px solid ${genColor(
                      'inputBorder',
                      'neutralSelected'
                    )}`,
                  },
                  ...style,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(true)
                  // openPicker(e)
                }}
              >
                <IconCalendar style={{ marginRight: 8 }} />
                {numbered ? (
                  <>
                    <Text
                      style={{
                        padding: '0px 1px',
                        fontSize: 14,
                        backgroundColor:
                          focusField === 'dayFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        dayRef.current?.focus()
                        dayRef.current?.select()
                      }}
                    >
                      {day === '' ? 'dd' : day < 10 ? `0${day}` : day}
                    </Text>
                    <Text>/</Text>
                    <Text
                      style={{
                        padding: '0px 1px',
                        fontSize: 14,
                        backgroundColor:
                          focusField === 'monthFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        monthRef.current?.focus()
                        monthRef.current?.select()
                      }}
                    >
                      {month === '' ? 'mm' : month < 10 ? `0${month}` : month}
                    </Text>
                    <Text>/</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        padding: '0px 1px',
                        backgroundColor:
                          focusField === 'yearFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        yearRef.current?.focus()
                        yearRef.current?.select()
                      }}
                    >
                      {year === '' ? 'yyyy' : year}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        padding: '0px 1px',
                        fontSize: 14,
                        marginRight: '2px',
                        backgroundColor:
                          focusField === 'monthFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        monthRef.current?.focus()
                        monthRef.current?.select()
                      }}
                    >
                      {month === '' ? 'mm' : monthArr[month - 1]}
                    </Text>
                    <Text
                      style={{
                        padding: '0px 1px',
                        fontSize: 14,
                        backgroundColor:
                          focusField === 'dayFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        dayRef.current?.focus()
                        dayRef.current?.select()
                      }}
                    >
                      {day === '' ? 'dd' : day < 10 ? `0${day}` : day},
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        padding: '0px 1px',
                        backgroundColor:
                          focusField === 'yearFocus'
                            ? genColor('action', 'neutral', 'subtleActive')
                            : '',
                        borderRadius: 4,
                        ...hover,
                      }}
                      onClick={() => {
                        yearRef.current?.focus()
                        yearRef.current?.select()
                      }}
                    >
                      {year === '' ? 'yyyy' : year}
                    </Text>
                  </>
                )}
                <styled.div
                  style={{
                    display: 'flex',
                    flexShrink: 0,
                    paddingLeft: 8,
                    flexDirection: 'row',
                    marginLeft: 'auto',
                  }}
                >
                  <IconChevronDown
                    color="default"
                    style={{
                      '&:hover': {
                        backgroundColor: genColor('action', 'system', 'hover'),
                      },
                      [BpTablet]: {
                        '&:hover': null,
                      },
                      '&:active': {
                        backgroundColor: genColor('action', 'system', 'active'),
                      },
                    }}
                  />
                </styled.div>
              </styled.div>
            </styled.div>
            {time && (
              <NewTimeInput
                timeString={timeString}
                setTimeString={setTimeString}
                style={{ marginLeft: 8 }}
              />
            )}
          </div>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            // asChild

            onInteractOutside={(e) => {
              setOpen(false)
            }}
            onOpenAutoFocus={(e) => {
              e.preventDefault()
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault()
            }}
            sideOffset={8}
            style={{
              border: `1px solid ${genColor('border', 'default', 'strong')}`,
              boxShadow: `0px 3px 16px 1px rgba(0,0,0,0.05)`,
              borderRadius: 4,
            }}
          >
            <Picker
              setValue={setValue}
              timeString={timeString}
              stringToMilliseconds={stringToMilliseconds}
            />
          </Popover.Content>
        </Popover.Portal>
      </styled.div>
    </Popover.Root>
  )
}
