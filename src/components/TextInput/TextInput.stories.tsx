import React, { useState } from 'react'
import { TextInput } from './index.js'

export default {
  title: 'Components/TextInput',
  component: TextInput,
}

export const Default = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      label="Label"
    />
  )
}

export const Placeholder = () => {
  const [value, setValue] = useState('')
  return <TextInput value={value} onChange={setValue} placeholder="Hint text" />
}

export const Disabled = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      disabled
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
    />
  )
}

export const Clearable = () => {
  const [value, setValue] = useState('telex.hu')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      error="Error message."
      clearable
    />
  )
}

export const MaxLength = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      prefix="https://"
      maxLength={10}
    />
  )
}

export const KitchenSink = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      value={value}
      onChange={setValue}
      leadIcon="search"
      label="Enter your name"
      prefix="https://"
      error="Error message."
      placeholder="placeholder"
      description="This is a description"
      clearable
      maxLength={25}
    />
  )
}