import React, { useEffect, useState } from 'react'
import { NumberInput } from './index.js'

export default {
  title: 'NumberInput',
  component: NumberInput,
}

export const Default = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      label="Label"
    />
  )
}

export const ChangingOutsideValue = () => {
  const [value, setValue] = useState<number>(123)

  useEffect(() => {
    setInterval(() => {
      setValue((v) => v + 5)
    }, 500)
  }, [])

  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      label="Label"
    />
  )
}

export const Placeholder = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput value={value} onChange={setValue} placeholder="Hint text" />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      disabled
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      error="Error message."
    />
  )
}

export const Suffix = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      suffix="@once.net"
    />
  )
}

export const KitchenSink = () => {
  const [value, setValue] = useState<number | null>(null)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      label="Enter your name"
      prefix="https://"
      error="Error message."
      placeholder="placeholder"
      description="This is a description"
      suffix="@once.net"
    />
  )
}
