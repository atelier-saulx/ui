import React, { useState, useEffect } from 'react'
import { styled } from 'inlines'
import { StateProvider } from '../../hooks/ContextState'
import { DateRangeDoubleInput } from './DateRangeDoubleInput'
import { DateRangeProps } from '../../types'

export const DateRange = ({
  value = [Date.now()],
  onChange = (value) => null,
}: DateRangeProps) => {
  const [fromMscValue, setfromMscValue] = useState(value[0])
  const [tillMscValue, setTillMscValue] = useState(value[0])

  useEffect(() => {
    onChange([fromMscValue, tillMscValue])
  }, [fromMscValue, fromMscValue])

  return (
    <styled.div style={{ display: 'flex' }}>
      <StateProvider
        values={{ fromValue: fromMscValue, tillValue: tillMscValue }}
      >
        <DateRangeDoubleInput
          fromValue={fromMscValue}
          tillValue={tillMscValue}
          setFromValue={setfromMscValue}
          setTillValue={setTillMscValue}
        />
      </StateProvider>
    </styled.div>
  )
}
