import React, { FC, useEffect, useState } from 'react'
import { StateProvider, styled, Style } from '../../'
import { NewDateInput } from './NewDateInput'
// import { DatePickerProps } from '../../'

type DatePickerProps = {
  value?: number // milliseconds
  onChange: (value: number) => void
  time?: boolean
  style?: Style
}

// TODO: when error message
// TODO: hover range ??

export const DatePicker: FC<DatePickerProps> = ({
  value = Date.now(),
  onChange,
  time,
  style,
}) => {
  const [millisecondsValue, setMilliSecondsValue] = useState(value)

  useEffect(() => {
    onChange(millisecondsValue)
  }, [millisecondsValue])

  return (
    <styled.div style={{ ...style }}>
      <StateProvider values={{ val: millisecondsValue }}>
        <NewDateInput
          value={millisecondsValue}
          setValue={setMilliSecondsValue}
          time={time}
        />
      </StateProvider>
    </styled.div>
  )
}
