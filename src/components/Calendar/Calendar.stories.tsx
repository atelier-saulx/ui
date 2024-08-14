import React, { useMemo, useState } from 'react'
import { Calendar } from './index.js'
import { Button } from '../Button/index.js'
import { format } from 'date-fns'

export default {
  title: 'Calendar',
  component: () => {},
}

export const Default = () => {
  const [value, setValue] = useState(Date.now())

  return (
    <Calendar variant="date" value={value} onChange={setValue}>
      {({ open }) => (
        <Button
          variant="border"
          trailIcon={open ? 'chevron-up' : 'chevron-down'}
        >
          {format(new Date(value), 'MMM d, yyy')}
        </Button>
      )}
    </Calendar>
  )
}

export const DateTime = () => {
  const [value, setValue] = useState(Date.now())

  return (
    <Calendar variant="date-time" value={value} onChange={setValue}>
      {({ open }) => (
        <Button
          variant="border"
          trailIcon={open ? 'chevron-up' : 'chevron-down'}
        >
          {format(new Date(value), 'MMM d, yyy HH:mm')}
        </Button>
      )}
    </Calendar>
  )
}
