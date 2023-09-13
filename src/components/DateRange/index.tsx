import React, { useState, useEffect } from 'react'
import { styled } from '../../'
import { StateProvider } from '../../hooks/ContextState'
import { DateRangeDoubleInput } from './DateRangeDoubleInput'

export type DateRangeProps = {
  value?: number[]
  onChange?: (v) => void
  numbered?: boolean
}

export const DateRange = ({
  value = [Date.now()],
  onChange = () => null,
  numbered = false,
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
          numbered={numbered}
          fromValue={fromMscValue}
          tillValue={tillMscValue}
          setFromValue={setfromMscValue}
          setTillValue={setTillMscValue}
        />
      </StateProvider>
    </styled.div>
  )
}
