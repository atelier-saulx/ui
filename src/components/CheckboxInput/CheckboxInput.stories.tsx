import React, { useState } from 'react'
import { CheckboxInput } from './index.js'

export default {
  title: 'Atoms/CheckboxInput',
  component: CheckboxInput,
}

export const Default = () => {
  const [value, setValue] = useState(false)
  return <CheckboxInput value={value} onChange={setValue} />
}

export const Error = () => {
  const [value, setValue] = useState(true)
  return <CheckboxInput error value={value} onChange={setValue} />
}

export const Disabled = () => {
  const [value, setValue] = useState(true)
  return <CheckboxInput value={value} onChange={setValue} disabled />
}

export const SmallDefault = () => {
  const [value, setValue] = useState(false)
  return <CheckboxInput size="small" value={value} onChange={setValue} />
}

export const SmallError = () => {
  const [value, setValue] = useState(true)
  return <CheckboxInput size="small" error value={value} onChange={setValue} />
}

export const SmallDisabled = () => {
  const [value, setValue] = useState(true)
  return (
    <CheckboxInput size="small" value={value} onChange={setValue} disabled />
  )
}
