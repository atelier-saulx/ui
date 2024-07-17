import React, { useState } from 'react'
import { TextAreaInput } from './index.js'

export default {
  title: 'Atoms/TextAreaInput',
  component: TextAreaInput,
}

export const Default = () => {
  const [value, setValue] = useState('')

  return (
    <TextAreaInput
      placeholder="Enter some text..."
      value={value}
      onChange={setValue}
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('abc123')

  return (
    <TextAreaInput
      placeholder="Enter some text..."
      value={value}
      onChange={setValue}
      disabled
    />
  )
}

export const Fixed5Rows = () => {
  const [value, setValue] = useState('')

  return (
    <TextAreaInput
      placeholder="I'm always 5 rows tall..."
      value={value}
      onChange={setValue}
      rows={5}
    />
  )
}

export const KitchenSink = () => {
  const [value, setValue] = useState('')

  return (
    <TextAreaInput
      placeholder="Enter some text..."
      value={value}
      onChange={setValue}
      error="Error message."
      label="Label"
      description="Description"
      maxLength={100}
    />
  )
}
