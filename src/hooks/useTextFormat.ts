import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { prettyDate, DateFormat } from '@based/pretty-date'
import { useEffect, useState } from 'react'

const incr = (v) => v + 1

const listeners: {
  minutes: Map<(x?: any) => any, number>
  seconds: Map<(x?: any) => any, number>
} = {
  minutes: new Map(),
  seconds: new Map(),
}

let secTimerIsRunning = false
let minuteTimerIsRunning = false

const checkForTimer = (value: number): 0 | 1 | 2 => {
  const d = Date.now()
  const isMin = (d - value) / 60e3 >= 1
  const isHour = isMin && (d - value * 60e3) / 60e3 >= 1

  if (isMin && !isHour) {
    // min timer
    return 1
  }
  if (!isHour) {
    // second timer
    return 2
  }
  return 0
}

const timerMin = () => {
  listeners.minutes.forEach((value, k) => {
    k(incr)
    const n = checkForTimer(value)
    if (!n) {
      listeners.minutes.delete(k)
    }
  })
  if (listeners.minutes.size) {
    minuteTimerIsRunning = true
    setTimeout(timerMin, 10e3)
  } else {
    minuteTimerIsRunning = false
  }
}

const timerSec = () => {
  listeners.seconds.forEach((value, k) => {
    k(incr)
    const n = checkForTimer(value + 1e3)
    if (n !== 2) {
      listeners.seconds.delete(k)
    }
    if (n === 1) {
      listeners.minutes.set(k, value)
      if (!minuteTimerIsRunning) {
        minuteTimerIsRunning = true
        setTimeout(timerMin, 10e3)
      }
    }
  })
  if (listeners.seconds.size) {
    secTimerIsRunning = true
    setTimeout(timerSec, 500)
  } else {
    secTimerIsRunning = false
  }
}

const addToTimer = (value: number, fn: (x?: any) => any): boolean => {
  const type = checkForTimer(value)

  if (type === 1) {
    listeners.minutes.set(fn, value)
    if (!minuteTimerIsRunning) {
      minuteTimerIsRunning = true
      setTimeout(timerMin, 10e3)
    }
    return true
  }

  if (type === 2) {
    listeners.seconds.set(fn, value)
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
