import React, { useRef, useState, useEffect } from 'react'
import { Style, styled } from 'inlines'
import { color as genColor } from '../../../src'
import { IconCalendar } from '../../icons'
import { useOverlay } from '../../hooks/useOverlay'
import { FromRangePicker } from './FromRangePicker'
import { TillRangePicker } from './TillRangePicker'
import { removeOverlay } from '../Overlay'
import { Center } from '../Styled'

type DateRangeDoubleInputProps = {
  fromValue: number
  tillValue: number
  setFromValue: (e) => void
  setTillValue: (e) => void
  style?: Style
}
const hover = {
  '&:hover': {
    backgroundColor: genColor('action', 'neutral', 'subtleHover'),
  },
}

export const DateRangeDoubleInput = ({
  fromValue,
  tillValue,
  setFromValue,
  setTillValue,
  style,
}: DateRangeDoubleInputProps) => {
  // TODO type?
  const dayFromRef = useRef<any>(null)
  const monthFromRef = useRef<any>(null)
  const yearFromRef = useRef<any>(null)

  const dayTillRef = useRef<any>(null)
  const monthTillRef = useRef<any>(null)
  const yearTillRef = useRef<any>(null)

  // try this
  const DateFromObjVal = new Date(fromValue)
  const DateTillObjVal = new Date(tillValue)

  const newFromDay = DateFromObjVal.getDate()
  const newFromMonth = DateFromObjVal.getMonth() + 1
  const newFromYear = DateFromObjVal.getFullYear()

  const newTillDay = DateTillObjVal.getDate()
  const newTillMonth = DateTillObjVal.getMonth() + 1
  const newTillYear = DateTillObjVal.getFullYear()

  const [fromDay, setFromDay] = useState<any>(newFromDay || '')
  const [fromMonth, setFromMonth] = useState<any>(newFromMonth || '')
  const [fromYear, setFromYear] = useState<any>(newFromYear || '')

  const [tillDay, setTillDay] = useState<any>(newTillDay || '')
  const [tillMonth, setTillMonth] = useState<any>(newTillMonth || '')
  const [tillYear, setTillYear] = useState<any>(newTillYear || '')

  const [focusField, setFocusField] = useState<
    | 'dayFromFocus'
    | 'monthFromFocus'
    | 'yearFromFocus'
    | ''
    | 'dayTillFocus'
    | 'monthTillFocus'
    | 'yearTillFocus'
  >('')

  const fullDateFromString = `${fromDay < 10 ? `0${fromDay}` : fromDay}/${
    fromMonth < 10 ? `0${fromMonth}` : fromMonth
  }/${fromYear}`

  const fullDateTillString = `${tillDay < 10 ? `0${tillDay}` : tillDay}/${
    tillMonth < 10 ? `0${tillMonth}` : tillMonth
  }/${tillYear}`
  // get the time as string format 00:00
  const timeString = '00:00'

  const stringToMilliseconds = (str: string, time?: string): number => {
    const dateString = `${str?.split('/').reverse().join('-')}T${
      time || '00:00'
    }`
    const outputMs = new Date(dateString).getTime()
    return outputMs
  }

  useEffect(() => {
    if (
      fromDay &&
      fromMonth &&
      fromYear.toString().length > 3 &&
      stringToMilliseconds(fullDateFromString, timeString) !== fromValue
    ) {
      setFromValue(stringToMilliseconds(fullDateFromString, timeString))
    }
  }, [fromDay, fromMonth, fromYear, timeString])

  useEffect(() => {
    if (
      tillDay &&
      tillMonth &&
      tillYear.toString().length > 3 &&
      stringToMilliseconds(fullDateTillString, timeString) !== tillValue
    ) {
      setTillValue(stringToMilliseconds(fullDateTillString, timeString))
    }
  }, [tillDay, tillMonth, tillYear, timeString])

  useEffect(() => {
    setFromDay(newFromDay || '')
    setFromMonth(newFromMonth || '')
    setFromYear(newFromYear || '')
  }, [fromValue])

  useEffect(() => {
    setTillDay(newTillDay || '')
    setTillMonth(newTillMonth || '')
    setTillYear(newTillYear || '')
  }, [tillValue])

  // if is range
  const openFromRangePicker = useOverlay(
    FromRangePicker,
    { setValue: setFromValue, timeString, stringToMilliseconds },
    { width: '100%', position: 'bottom' }
    //   width?: number | '100%' | 'target' | 'auto'
    // position?: 'left' | 'right' | 'top' | 'bottom'
    // placement?: 'center' | 'left' | 'right'
    // variant?: 'over' | 'detached'
    // offset?: { x: number; y: number }
    // selectTarget?: SelectTarget
  )

  // if is range
  const openTillRangePicker = useOverlay(
    TillRangePicker,
    { setValue: setTillValue, timeString, stringToMilliseconds },
    { width: '100%', position: 'bottom' }
  )

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // console.log('Days in this month', daysInMonth(newMonth, newYear))

  return (
    <styled.div style={{ display: 'flex', alignItems: 'center' }}>
      {/* hide from ui - user */}
      <styled.div
        style={{
          opacity: 0,
          position: 'absolute',
          pointerEvents: 'none',
          //  marginTop: -32,
        }}
      >
        {/* FROM INPUT FIELDS */}
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid red' }}
          ref={dayFromRef}
          value={fromDay}
          onChange={(e) => {
            // should get last day of the month
            if (
              +e.target.value < 1 ||
              +e.target.value > daysInMonth(newFromMonth, newFromYear)
            ) {
              setFromDay(1)
            } else {
              setFromDay(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              setFromDay('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setFromDay(daysInMonth(newFromMonth, newFromYear) + 1)
            }
          }}
          onKeyUp={(e) => {
            if (+e.key > 3) {
              monthFromRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
              e.key !== 'ArrowDown' &&
              e.key !== 'ArrowUp' &&
              e.key !== 'ArrowLeft'
            ) {
              monthFromRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              monthFromRef.current.select()
            }
          }}
          onFocus={() => setFocusField('dayFromFocus')}
          onBlur={() => setFocusField('')}
        />
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid purple' }}
          ref={monthFromRef}
          value={fromMonth}
          onChange={(e) => {
            if (+e.target.value < 1 || +e.target.value > 12) {
              setFromMonth(1)
            } else {
              setFromMonth(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              setFromMonth('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setFromMonth(13)
            }
          }}
          onKeyUp={(e) => {
            if (+e.key > 1 && +e.currentTarget.value > 1) {
              yearFromRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
              e.key !== 'ArrowDown' &&
              e.key !== 'ArrowUp' &&
              e.key !== 'ArrowLeft'
            ) {
              yearFromRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              yearFromRef.current.select()
            }
            if (e.key === 'ArrowLeft') {
              dayFromRef.current.focus()
              dayFromRef.current.select()
            }
          }}
          onFocus={() => setFocusField('monthFromFocus')}
          onBlur={() => setFocusField('')}
        />
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid green' }}
          ref={yearFromRef}
          value={fromYear}
          onChange={(e) => {
            if (fromDay === 29 && fromMonth === 2) {
              console.log('leap year 🐸')
            } else {
              setFromYear(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (fromDay === 29 && fromMonth === 2 && e.key === 'ArrowUp') {
              setFromYear(fromYear + 4)
            }
            if (fromDay === 29 && fromMonth === 2 && e.key === 'ArrowDown') {
              setFromYear(fromYear - 4)
            }
            if (e.key === 'Backspace') {
              setFromYear('')
            }
            if (e.key === 'ArrowRight') {
              removeOverlay()
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'ArrowLeft') {
              monthFromRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              dayTillRef.current.focus()
              dayTillRef.current.select()
              openTillRangePicker(e)
            }
          }}
          onFocus={() => setFocusField('yearFromFocus')}
          onBlur={() => setFocusField('')}
        />

        {/* TILL INPUT FIELDS */}
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid red' }}
          ref={dayTillRef}
          value={tillDay}
          onChange={(e) => {
            // should get last day of the month
            if (
              +e.target.value < 1 ||
              +e.target.value > daysInMonth(newTillMonth, newTillYear)
            ) {
              setTillDay(1)
            } else {
              setTillDay(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              setTillDay('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setTillDay(daysInMonth(newTillMonth, newTillYear) + 1)
            }
            if (e.key === 'ArrowLeft') {
              removeOverlay()
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'ArrowLeft') {
              yearFromRef.current.focus()
              yearFromRef.current.select()
              openFromRangePicker(e)
            }
            if (+e.key > 3) {
              monthTillRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
              e.key !== 'ArrowDown' &&
              e.key !== 'ArrowUp' &&
              e.key !== 'ArrowLeft'
            ) {
              monthTillRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              monthTillRef.current.select()
            }
          }}
          onFocus={() => setFocusField('dayTillFocus')}
          onBlur={() => setFocusField('')}
        />
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid purple' }}
          ref={monthTillRef}
          value={tillMonth}
          onChange={(e) => {
            if (+e.target.value < 1 || +e.target.value > 12) {
              setTillMonth(1)
            } else {
              setTillMonth(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              setTillMonth('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setTillMonth(13)
            }
          }}
          onKeyUp={(e) => {
            if (+e.key > 1 && +e.currentTarget.value > 1) {
              yearTillRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
              e.key !== 'ArrowDown' &&
              e.key !== 'ArrowUp' &&
              e.key !== 'ArrowLeft'
            ) {
              yearTillRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              yearTillRef.current.select()
            }
            if (e.key === 'ArrowLeft') {
              dayTillRef.current.focus()
              dayTillRef.current.select()
            }
          }}
          onFocus={() => setFocusField('monthTillFocus')}
          onBlur={() => setFocusField('')}
        />
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid green' }}
          ref={yearTillRef}
          value={tillYear}
          onChange={(e) => {
            if (tillDay === 29 && tillMonth === 2) {
              // Set year to schikkeljaar
              console.log('leap year 🐸')
            } else {
              setTillYear(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (tillDay === 29 && tillMonth === 2 && e.key === 'ArrowUp') {
              setTillYear(fromYear + 4)
            }
            if (tillDay === 29 && tillMonth === 2 && e.key === 'ArrowDown') {
              setTillYear(tillYear - 4)
            }
            if (e.key === 'Backspace') {
              setTillYear('')
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'ArrowLeft') {
              monthTillRef.current.select()
            }
          }}
          onFocus={() => setFocusField('yearTillFocus')}
          onBlur={() => setFocusField('')}
        />
      </styled.div>

      <styled.div
        style={{
          // border: '2px solid red',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* FROM FROM FROM */}
        <styled.div
          style={{
            display: 'flex',
            position: 'relative',
            border: '1px solid',
            borderColor: genColor('border', 'default', 'strong'),
            boxSizing: 'content-box',
            borderRadius: 8,
            boxShadow: `0px 0px 0px 2px ${genColor(
              'action',
              'primary',
              'subtleNormal'
            )}`,
            height: 36,
            paddingLeft: 8,
            paddingRight: 12,
            alignItems: 'center',
            width: '100%',
            maxWidth: 139,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            ...style,
          }}
          onClick={(e) => {
            openFromRangePicker(e)
          }}
        >
          {/* @ts-ignore*/}
          {/* <ClickableIcon icon={<IconCalendar />} style={{ flexShrink: '0' }} /> */}
          <IconCalendar />
          {/* </ClickableIcon> */}
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'dayFromFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              dayFromRef.current.focus()
              dayFromRef.current.select()
            }}
          >
            {fromDay === '' ? 'dd' : fromDay < 10 ? `0${fromDay}` : fromDay}
          </styled.div>
          <styled.div>/</styled.div>
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'monthFromFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              monthFromRef.current.focus()
              monthFromRef.current.select()
            }}
          >
            {fromMonth === ''
              ? 'mm'
              : fromMonth < 10
              ? `0${fromMonth}`
              : fromMonth}
          </styled.div>
          <styled.div>/</styled.div>
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'yearFromFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              yearFromRef.current.focus()
              yearFromRef.current.select()
            }}
          >
            {fromYear === '' ? 'yyyy' : fromYear}
          </styled.div>
        </styled.div>
        {/* TILL TILL TILL */}
        <styled.div
          style={{
            display: 'flex',
            position: 'relative',
            border: '1px solid',
            borderColor: genColor('border', 'default', 'strong'),
            borderRadius: 8,
            boxShadow: `0px 0px 0px 2px ${genColor(
              'action',
              'primary',
              'subtleNormal'
            )}`,
            height: 36,
            boxSizing: 'content-box',
            paddingLeft: 8,
            paddingRight: 12,
            alignItems: 'center',
            width: '100%',
            maxWidth: 139,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: 4,
            ...style,
          }}
          onClick={(e) => {
            openTillRangePicker(e)
          }}
        >
          {/* @ts-ignore*/}
          {/* <ClickableIcon icon={<IconCalendar />} style={{ flexShrink: '0' }} /> */}
          <IconCalendar />
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'dayTillFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              dayTillRef.current.focus()
              dayTillRef.current.select()
            }}
          >
            {tillDay === '' ? 'dd' : tillDay < 10 ? `0${tillDay}` : tillDay}
          </styled.div>
          <styled.div>/</styled.div>
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'monthTillFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              monthTillRef.current.focus()
              monthTillRef.current.select()
            }}
          >
            {tillMonth === ''
              ? 'mm'
              : tillMonth < 10
              ? `0${tillMonth}`
              : tillMonth}
          </styled.div>
          <styled.div>/</styled.div>
          <styled.div
            style={{
              padding: '0px 1px',
              backgroundColor:
                focusField === 'yearTillFocus'
                  ? genColor('action', 'neutral', 'subtleActive')
                  : '',
              borderRadius: 4,
              ...hover,
            }}
            onClick={() => {
              yearTillRef.current.focus()
              yearTillRef.current.select()
            }}
          >
            {tillYear === '' ? 'yyyy' : tillYear}
          </styled.div>
        </styled.div>
      </styled.div>
    </styled.div>
  )
}
