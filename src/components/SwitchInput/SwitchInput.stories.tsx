import React, { useState } from 'react'
import { SwitchInput } from './index.js'

export default {
  title: 'Components/SwitchInput',
  component: SwitchInput,
}

export const Default = () => {
  const [value, setValue] = useState(false)
  return <SwitchInput value={value} onChange={setValue} />
}

export const Error = () => {
  const [value, setValue] = useState(true)
  return <SwitchInput error value={value} onChange={setValue} />
}

export const Disabled = () => {
  const [value, setValue] = useState(true)
  return <SwitchInput value={value} onChange={setValue} disabled />
}
