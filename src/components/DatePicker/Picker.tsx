import React, { useEffect, useState } from 'react'
import { Calendar } from './Calendar'
import { IconChevronDown, IconChevronTop } from '../../icons'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'
import { Text } from '../../components'
import { useContextState } from '../../hooks'

type PickerProps = {
  setValue: (e: any) => void
  timeString?: string
  stringToMilliseconds?: (str: string, time?: string) => number
  setOpen: (e: any) => void
}

const StyledDatePickerBox = styled('div', {
  background: genColor('background', 'default', 'strong'),
  borderRadius: 4,
  width: 280,
})

const StyledChevronHolders = styled('div', {
  borderRadius: 4,
  height: 24,
  width: 24,
  color: genColor('content', 'default'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (hover: hover)': {
    '&:hover': {
      background: genColor('action', 'neutral', 'subtleHover'),
      cursor: 'pointer',
    },
  },
})

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MscToString = (value: number): string => {
  const newDate = new Date(value)
  const year = newDate.getFullYear()
  const month =
    newDate.getMonth() < 9
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1
  const day =
    newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()

  return `${day}/${month}/${year}`
}

// const stringToMilliseconds = (str: string, time?: string): number => {
//   const dateString = `${str?.split('/').reverse().join('-')}T${time || '00:00'}`
//   const outputMs = new Date(dateString).getTime()
//   return outputMs
// }

export const Picker = ({
  setValue,
  timeString,
  stringToMilliseconds,
  setOpen,
}: PickerProps) => {
  const [millisecondsValue] = useContextState('val')

  useEffect(() => {
    const newMillSecVal = MscToString(millisecondsValue as number)
    setSelectedDay(newMillSecVal.split('/')[0])
    setSelectedMonth(newMillSecVal.split('/')[1])
    setSelectedYear(newMillSecVal.split('/')[2])
  }, [millisecondsValue])

  const [valueAsString, setValueAsString] = useState(
    millisecondsValue ? MscToString(millisecondsValue as number) : ''
  )

  const [selectedDay, setSelectedDay] = useState(valueAsString?.split('/')[0])
  const [selectedMonth, setSelectedMonth] = useState(
    valueAsString?.split('/')[1]
  )
  const [selectedYear, setSelectedYear] = useState(valueAsString?.split('/')[2])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // So if year, day or month changes set the new Value 🔥
  useEffect(() => {
    setValueAsString(`${selectedDay}/${selectedMonth}/${selectedYear}`)
    setValue(
      //TODO type this?
      //@ts-ignore
      stringToMilliseconds(
        `${selectedDay}/${selectedMonth}/${selectedYear}`,
        timeString
      )
    )
  }, [selectedDay, selectedMonth, selectedYear, valueAsString])

  // Days forward or backward
  const dayChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (+selectedDay === daysInMonth(+selectedMonth, +selectedYear)) {
        if (+selectedMonth === 12) {
          setSelectedDay('01')
          setSelectedMonth('01')
          setSelectedYear((+selectedYear + 1).toString())
        } else {
          monthChanger('forward')
          setSelectedDay('01')
        }
      } else
        setSelectedDay(
          +selectedDay + 1 < 10
            ? '0' + (+selectedDay + 1).toString()
            : (+selectedDay + 1).toString()
        )
    }
    if (str === 'backward') {
      if (selectedDay === '01' || +selectedDay === 1) {
        if (selectedMonth === '01' || +selectedMonth === 1) {
          setSelectedDay(daysInMonth(12, +selectedYear - 1).toString())
          setSelectedMonth('12')
          setSelectedYear((+selectedYear - 1).toString())
        } else {
          monthChanger('backward')
          setSelectedDay(
            daysInMonth(+selectedMonth - 1, selectedYear).toString()
          )
        }
      } else {
        setSelectedDay(
          +selectedDay - 1 < 10
            ? '0' + (+selectedDay - 1).toString()
            : (+selectedDay - 1).toString()
        )
      }
    }
  }

  // Months forward or backward
  const monthChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (selectedMonth === `12` || +selectedMonth === 12) {
        setSelectedMonth('01')
        setSelectedYear((+selectedYear + 1).toString())
      } else {
        setSelectedMonth(
          +selectedMonth === 9
            ? '10'
            : +selectedMonth < 9
            ? '0' + (+selectedMonth + 1).toString()
            : (+selectedMonth + 1).toString()
        )
      }
    }
    if (str === 'backward') {
      if (selectedMonth === `01` || +selectedMonth === 1) {
        setSelectedMonth('12')
        setSelectedYear((+selectedYear - 1).toString())
      } else {
        setSelectedMonth(
          +selectedMonth < 11
            ? '0' + (+selectedMonth - 1).toString()
            : (+selectedMonth - 1).toString()
        )
      }
    }
  }

  return (
    <StyledDatePickerBox>
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Text weight="strong">
          {(months[+valueAsString?.split('/')[1]] || '') +
            ' ' +
            (valueAsString?.split('/')[2] || '')}
        </Text>
        <styled.div style={{ display: 'flex' }}>
          <StyledChevronHolders
            onClick={() => monthChanger('backward')}
            style={{ marginRight: 16 }}
          >
            <IconChevronTop />
          </StyledChevronHolders>
          <StyledChevronHolders onClick={() => monthChanger('forward')}>
            <IconChevronDown />
          </StyledChevronHolders>
        </styled.div>
      </styled.div>
      {/* Calendar */}
      <Calendar
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      {/* More Button options */}
      <styled.div
        style={{
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',

          '& div': {
            cursor: 'pointer',
            padding: '8px 12px',
            alignItems: 'center',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: genColor('action', 'system', 'hover'),
            },
            '&:active': {
              backgroundColor: genColor('action', 'system', 'active'),
            },
          },
        }}
      >
        <Text
          onClick={() => {
            setValue(new Date().getTime())
          }}
          style={{ display: 'flex' }}
        >
          Today
        </Text>
        <Text style={{ display: 'flex' }} onClick={() => dayChanger('forward')}>
          Select next date
        </Text>
        <Text
          style={{ display: 'flex', marginBottom: '6px' }}
          onClick={() => dayChanger('backward')}
        >
          Select previous date
        </Text>
        <styled.span
          style={{
            borderTop: `1px solid ${genColor('border', 'default', 'strong')}`,
            height: 0,
            margin: '0 -8px',
            borderRadius: 0,
            padding: 0,
          }}
        />
        <Text
          style={{ display: 'flex', marginTop: '6px' }}
          onClick={() => {
            setValue(undefined)
            setOpen(false)
          }}
        >
          Clear
        </Text>
      </styled.div>
    </StyledDatePickerBox>
  )
}
