import React, { FC, useEffect, useState } from 'react'
import { StateProvider } from '../../hooks'
import { styled, Style } from 'inlines'
import { NewDateInput } from './NewDateInput'

type DatePickerProps = {
  value?: number // milliseconds
  onChange: (value: number) => void
  time?: boolean
  numbered?: boolean
  style?: Style
}

export const DatePicker: FC<DatePickerProps> = ({
  value = Date.now(),
  onChange,
  time,
  style,
  numbered = false,
}) => {
  const [millisecondsValue, setMilliSecondsValue] = useState(value)

  useEffect(() => {
    onChange(millisecondsValue)
  }, [millisecondsValue])

  return (
    <styled.div style={{ ...style }}>
      <StateProvider values={{ val: millisecondsValue }}>
        <NewDateInput
          numbered={numbered}
          value={millisecondsValue}
          setValue={setMilliSecondsValue}
          time={time}
        />
      </StateProvider>
    </styled.div>
  )
}
