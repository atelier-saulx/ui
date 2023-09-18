import React, { useState, useEffect } from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'
import { Input } from '../Input'

export const NewTimeInput = ({ setTimeString, timeString, style }) => {
  const [, setValidTimeInput] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  // so it does not crash
  const [tempTime, setTempTime] = useState(timeString)

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

  // alleen hier echte tijd zetten als het kan pas
  useEffect(() => {
    if (tempTime?.length === 6) {
      setTimeString(timeString?.slice(0, -1))
    }
    //  check if regex matches
    if (timeRegex.test(tempTime) && tempTime.length === 5) {
      setValidTimeInput(true)
      setTimeString(tempTime)
    } else {
      setValidTimeInput(false)
    }
  }, [tempTime])

  const timeHandler = (e) => {
    // placeholder = 'hh:mm'

    if (e.length === 1 && e > 2) {
      e = '0' + e
    }

    if (e.length === 2) {
      setTempTime(e + ':')
    } else {
      setTempTime(e)
    }

    if (e.length === 3 && e.split('').pop() !== ':') {
      let temp = e.split('')
      temp.splice(2, 0, ':')
      temp = temp.join('')
      e = temp
      setTempTime(temp)
    }

    if (e.length === 4) {
      if (+e.slice(-1) > 5) {
        let temp = e.split('')
        temp.splice(3, 0, '0')
        temp = temp.join('')
        setTempTime(temp)
      }
    }
  }

  const keyPressHandler = (e) => {
    if (isNaN(e.key)) {
      console.log('not number')
      e.preventDefault()
    }
  }

  return (
    <styled.div
      style={{
        position: 'relative',
        backgroundColor: isFocus
          ? genColor('action', 'neutral', 'subtleNormal')
          : genColor('action', 'neutral', 'subtleActive'),
        borderRadius: 8,
        ...style,
      }}
      onFocus={() => {
        setIsFocus(true)
      }}
      onBlur={() => {
        setIsFocus(false)
      }}
    >
      <Input
        value={tempTime}
        type="text"
        // onKeyPress={keyPressHandler}
        onChange={timeHandler}
        placeholder="00:00"
        // style={{
        //   backgroundColor: 'transparent',
        //   minHeight: 36,
        // }}
      />
      {isFocus && (
        <div
          style={{
            //    border: `2px solid ${genColor('accent')}`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
          }}
        />
      )}
    </styled.div>
  )
}
