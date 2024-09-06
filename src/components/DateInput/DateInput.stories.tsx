import React, { useState } from 'react'
import { DateInput } from './index.js'

export default {
  title: 'DateInput',
  component: DateInput,
}

export const Date = () => {
  const [value, setValue] = useState<number>()
  return (
    <DateInput
      value={value}
      onChange={setValue}
      placeholder="Placeholder"
      variant="date"
    />
  )
}

export const DateTime = () => {
  const [value, setValue] = useState<number>()
  return (
    <DateInput
      variant="date-time"
      value={value}
      onChange={setValue}
      placeholder="Placeholder"
    />
  )
}
