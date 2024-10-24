import React from 'react'
import { FormField } from './FormField.js'
import { TextInput } from '../TextInput/index.js'

export default {
  title: 'FormField',
  component: FormField,
}

export const Vertical = () => {
  return (
    <FormField label="Label" description="Description text" error="Error text">
      <TextInput error onChange={() => {}} />
    </FormField>
  )
}

export const VerticalNote = () => {
  return (
    <FormField
      label="Label"
      note={{ title: 'Title', description: 'Description' }}
    >
      <TextInput error onChange={() => {}} />
    </FormField>
  )
}

export const Horizontal = () => {
  return (
    <FormField
      horizontal
      label="Label"
      description="Description text"
      error="Error text"
    >
      <TextInput error onChange={() => {}} />
    </FormField>
  )
}

export const HorizontalNote = () => {
  return (
    <FormField
      horizontal
      label="Label"
      note={{ title: 'Title', description: 'Description' }}
    >
      <TextInput error onChange={() => {}} />
    </FormField>
  )
}
