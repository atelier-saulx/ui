// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { useContextState } from '../../hooks/ContextState'
import { Text } from '../Text'
import { BpTablet } from '../../utils'

type RangeCalendarProps = {
  days: string[]
  selectedDay: string
  selectedMonth: string
  selectedYear: string
  setSelectedDay: (e) => void
  fromRangeCal?: boolean
  tillRangeCal?: boolean
}

export const RangeCalendar = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  days,
  setSelectedDay,
  fromRangeCal,
  tillRangeCal,
}: RangeCalendarProps) => {
  const [daysArr, setDaysArr] = useState([])

  const [hoverDay, setHoverDay] = useState<number | null>(null)
  const [hoverMonth, setHoverMonth] = useState<number | null>(null)
  const [hoverYear, setHoverYear] = useState<number | null>(null)

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  const [fromValue] = useContextState<number | string>('fromValue')
  const [tillValue] = useContextState<number | string>('tillValue')

  const fromDateObj = new Date(+fromValue)
  const fromYear = fromDateObj.getFullYear()
  const fromMonth = fromDateObj.getMonth() + 1
  const fromDay = fromDateObj.getDate()

  const tillDateObj = new Date(+tillValue)
  const tillYear = tillDateObj.getFullYear()
  const tillMonth = tillDateObj.getMonth() + 1
  const tillDay = tillDateObj.getDate()

  // to determine the current day
  const dateObj = new Date()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()
  const presentDay = dateObj.getDate()

  const tempArr: { day: number; month: string; year: string }[] | any = []

  // Calender layout offset
  useEffect(() => {
    tempArr.splice(0, tempArr.length)

    for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
      tempArr.push({ day: i, month: selectedMonth, year: selectedYear })
    }

    // add some offset for the days layout
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Sun'
    ) {
      tempArr.unshift('x', 'x', 'x', 'x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Sat'
    ) {
      tempArr.unshift('x', 'x', 'x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Fri'
    ) {
      tempArr.unshift('x', 'x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Thu'
    ) {
      tempArr.unshift('x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Wed'
    ) {
      tempArr.unshift('x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Tue'
    ) {
      tempArr.unshift('x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Mon'
    ) {
      // tempArr.unshift()
    }

    setDaysArr(tempArr)
  }, [selectedMonth, selectedYear])

  const checkIfRanged = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkTime = new Date(year, month, day).getTime()

    if (checkTime > fromTime && checkTime < tillTime) {
      return true
    }
  }
  const checkIfFrom = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const checkTime = new Date(year, month, day).getTime()
    if (fromTime === checkTime) {
      return true
    }
  }
  const checkIfTill = (year, month, day) => {
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkTime = new Date(year, month, day).getTime()
    if (checkTime === tillTime) {
      return true
    }
  }

  const checkIfIsHoverDay = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkValTime = new Date(year, month, day).getTime()
    const hoverTime = new Date(hoverYear, hoverMonth, hoverDay).getTime()

    // if (checkValTime === (fromTime | tillTime)) return false
    if (
      checkValTime <= fromTime &&
      checkValTime >= hoverTime &&
      +hoverDay !== 0 &&
      tillTime > checkValTime &&
      fromRangeCal
    ) {
      return true
    } else if (
      checkValTime >= tillTime &&
      checkValTime <= hoverTime &&
      +hoverDay !== 0 &&
      fromTime < checkValTime &&
      tillRangeCal
    ) {
      return true
    }
  }
  const checkIfIsExact = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkValTime = new Date(year, month, day).getTime()
    const hoverTime = new Date(hoverYear, hoverMonth, hoverDay).getTime()

    // if (checkValTime === (fromTime | tillTime)) return false
    if (
      checkValTime === hoverTime &&
      +hoverDay !== 0 &&
      tillTime > checkValTime &&
      fromRangeCal
    ) {
      return 'from'
    } else if (
      checkValTime === hoverTime &&
      +hoverDay !== 0 &&
      fromTime < checkValTime &&
      tillRangeCal
    ) {
      return 'till'
    }
    return false
  }

  return (
    <>
      <styled.div
        style={{
          display: 'flex',
          textAlign: 'center',
          color: genColor('content', 'default', 'secondary'),
          padding: '0px 20px',
          marginTop: 4,
          marginBottom: '-8px',
          justifyContent: 'center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          '& div': {
            width: '26px',
            textAlign: 'center',
            margin: '4px',
          },
        }}
      >
        <Text selectable="none">M</Text>
        <Text selectable="none">T</Text>
        <Text selectable="none">W</Text>
        <Text selectable="none">T</Text>
        <Text selectable="none">F</Text>
        <Text selectable="none">S</Text>
        <Text selectable="none">S</Text>
      </styled.div>

      <styled.div style={{ padding: '10px 20px' }}>
        {daysArr.map((val: any, i) =>
          val === 'x' ? (
            <styled.div
              key={i}
              style={{
                width: 34,
                height: 26,
                // margin: '4px',
                marginTop: '4px',
                marginBottom: '4px',
                display: 'inline-flex',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              }}
            >
              .
            </styled.div>
          ) : (
            <Text
              onMouseEnter={() => {
                if (val.day !== null) {
                  setHoverDay(val.day)
                  setHoverMonth(val.month)
                  setHoverYear(val.year)
                }
              }}
              onMouseLeave={() => {
                setHoverDay(null)
                setHoverMonth(null)
                setHoverYear(null)
              }}
              style={{
                border:
                  val.day === presentDay &&
                  +selectedMonth === currentMonth + 1 &&
                  +selectedYear === currentYear
                    ? `1px solid ${genColor('border', 'brand', 'strong')}`
                    : '',
                background:
                  val.day === +selectedDay
                    ? genColor('action', 'primary', 'normal')
                    : val.day === fromDay &&
                      +selectedMonth === fromMonth &&
                      +selectedYear === fromYear
                    ? genColor('action', 'primary', 'normal')
                    : val.day === tillDay &&
                      +selectedMonth === tillMonth &&
                      +selectedYear === tillYear
                    ? genColor('action', 'primary', 'normal')
                    : checkIfRanged(val.year, val.month, val.day)
                    ? genColor('action', 'primary', 'subtleNormal')
                    : checkIfIsHoverDay(val.year, val.month, val.day)
                    ? genColor('action', 'neutral', 'subtleHover')
                    : '',
                color:
                  val.day === +selectedDay
                    ? genColor('content', 'inverted', 'primary')
                    : val.day === fromDay &&
                      +selectedMonth === fromMonth &&
                      +selectedYear === fromYear
                    ? genColor('content', 'inverted', 'primary')
                    : val.day === tillDay &&
                      +selectedMonth === tillMonth &&
                      +selectedYear === tillYear
                    ? genColor('content', 'inverted', 'primary')
                    : genColor('content', 'default', 'primary'),
                boxSizing: 'border-box',
                width: 34,
                height: 26,
                marginTop: '4px',
                marginBottom: '4px',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  background:
                    val.day === +selectedDay
                      ? genColor('action', 'primary', 'hover')
                      : val.day === fromDay &&
                        +selectedMonth === fromMonth &&
                        +selectedYear === fromYear
                      ? genColor('action', 'primary', 'hover')
                      : val.day === tillDay &&
                        +selectedMonth === tillMonth &&
                        +selectedYear === tillYear
                      ? genColor('action', 'primary', 'hover')
                      : checkIfRanged(val.year, val.month, val.day)
                      ? genColor('action', 'primary', 'subtleSelected')
                      : checkIfIsHoverDay(val.year, val.month, val.day)
                      ? genColor('action', 'primary', 'subtleSelected')
                      : genColor('action', 'neutral', 'subtleHover'),
                  borderRadius:
                    fromValue === tillValue && fromDay === val.day
                      ? '4px'
                      : checkIfRanged(val.year, val.month, val.day)
                      ? 0
                      : checkIfIsExact(val.year, val.month, val.day) === 'from'
                      ? '4px 0 0 4px'
                      : checkIfIsExact(val.year, val.month, val.day) === 'till'
                      ? '0 4px 4px 0'
                      : val.day === fromDay &&
                        +selectedMonth === fromMonth &&
                        +selectedYear === fromYear
                      ? undefined
                      : val.day === tillDay &&
                        +selectedMonth === tillMonth &&
                        +selectedYear === tillYear
                      ? undefined
                      : '4px',
                },
                borderRadius:
                  fromValue === tillValue && fromDay === val.day
                    ? '4px'
                    : checkIfIsHoverDay(val.year, val.month, val.day)
                    ? 0
                    : checkIfFrom(val.year, val.month, val.day)
                    ? '4px 0 0 4px'
                    : checkIfTill(val.year, val.month, val.day)
                    ? '0 4px 4px 0'
                    : val.day === presentDay &&
                      +selectedMonth === currentMonth + 1 &&
                      +selectedYear === currentYear
                    ? checkIfRanged(val.year, val.month, val.day)
                      ? 0
                      : '4px'
                    : 0,

                userSelect: 'none',
                WebkitUserSelect: 'none',
                [BpTablet]: {
                  '&:hover': {
                    background: 'transparent',
                  },
                },
              }}
              key={i}
              onClick={() => {
                setSelectedDay(val.day < 10 ? `0${val.day}` : `${val.day}`)
              }}
            >
              {val.day}
            </Text>
          )
        )}
      </styled.div>
      <styled.div
        style={{
          borderBottom: `1px solid ${genColor('border', 'default', 'strong')}`,
        }}
      />
    </>
  )
}
