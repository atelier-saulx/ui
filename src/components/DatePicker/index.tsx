import React, { FC, useEffect, useState } from 'react'

import { styled, Style } from 'inlines'
import { StateProvider } from '../../hooks/ContextState'
import { NewDateInput } from './NewDateInput'
// import { DatePickerProps } from '../../'

type DateWidgetProps = {
  value?: number // milliseconds
  onChange: (value: number) => void
  time?: boolean
  style?: Style
}

// TODO: when error message
// TODO: hover range ??

export const DatePicker: FC<DateWidgetProps> = ({
  value = 0,
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
