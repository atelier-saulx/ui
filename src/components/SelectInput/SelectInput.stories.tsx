import React, { useState } from 'react'
import { SelectInput } from './index.js'

export default {
  title: 'SelectInput (WIP)',
  component: SelectInput,
}

const OPTIONS = Array.from({ length: 64 }).map((_, i) => ({
  label: `Option ${i}`,
  value: `option${i}`,
}))

export const Default = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      options={OPTIONS}
      placeholder="Placeholder"
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      error
      value={value}
      onChange={setValue}
      options={OPTIONS}
      placeholder="Placeholder"
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      disabled
      options={OPTIONS}
      placeholder="Placeholder"
    />
  )
}
