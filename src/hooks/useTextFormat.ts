import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { prettyDate, DateFormat } from '@based/pretty-date'
import { useEffect, useState } from 'react'

const incr = (v) => v + 1

const listeners: {
  minutes: Set<(x?: any) => any>
  seconds: Set<(x?: any) => any>
} = {
  minutes: new Set(),
  seconds: new Set(),
}

let secTimerIsRunning = false
let minuteTimerIsRunning = false

const timerMin = () => {
  listeners.minutes.forEach((u) => u(incr))
  if (listeners.minutes.size) {
    minuteTimerIsRunning = true
    setTimeout(timerMin, 10e3)
  } else {
    minuteTimerIsRunning = false
  }
}

const timerSec = () => {
  listeners.seconds.forEach((u) => u(incr))
  if (listeners.seconds.size) {
    secTimerIsRunning = true
    setTimeout(timerSec, 500)
  } else {
    secTimerIsRunning = false
  }
}

const addToTimer = (value: number, fn: (x?: any) => any): boolean => {
  const isMin = (Date.now() - value) / 60e3 > 1
  const isHour = isMin && (value / 60e3) * 60e3 > 1

  if (isMin && !isHour) {
    listeners.minutes.add(fn)
    if (!minuteTimerIsRunning) {
      minuteTimerIsRunning = true
      setTimeout(timerMin, 10e3)
    }
    return true
  } else if (!isHour) {
    listeners.seconds.add(fn)
    if (!secTimerIsRunning) {
      secTimerIsRunning = true
      setTimeout(timerSec, 500)
    }
    return true
  }

  return false
}

export const useTextFormat = (
  value: any,
  format: NumberFormat | DateFormat
) => {
  // can add more formats
  if (format === 'date-time-human') {
    const [, update] = useState(0)
    useEffect(() => {
      if (typeof value === 'number' && addToTimer(value, update)) {
        return () => {
          listeners.minutes.delete(update)
          listeners.seconds.delete(update)
        }
      }
      return () => {}
    }, [value])
  }

  if (format && value !== undefined) {
    if (
      format === 'time' ||
      format === 'time-precise' ||
      format === 'date' ||
      format === 'date-time' ||
      format === 'date-time-human' ||
      format === 'date-time-text'
    ) {
      return prettyDate(value, format)
    } else {
      return prettyNumber(value, format)
    }
  }

  return value
}
