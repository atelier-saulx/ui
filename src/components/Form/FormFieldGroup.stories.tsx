import React from 'react'
import { FormFieldGroup } from './FormFieldGroup.js'
import { FormField } from './FormField.js'
import { TextInput } from '../TextInput/index.js'

export default {
  title: 'FormFieldGroup',
  component: FormFieldGroup,
}

export const Vertical = () => {
  return (
    <FormFieldGroup label="Group title">
      <FormField label="Label">
        <TextInput onChange={() => {}} />
      </FormField>
      <FormField label="Label" description="Description text">
        <TextInput onChange={() => {}} />
      </FormField>
      <FormField label="Label" error="Error text">
        <TextInput error onChange={() => {}} />
      </FormField>
      <FormField
        label="Label"
        description="Description text"
        error="Error text"
      >
        <TextInput error onChange={() => {}} />
      </FormField>
    </FormFieldGroup>
  )
}

export const Horizontal = () => {
  return (
    <FormFieldGroup label="Group title">
      <FormField horizontal label="Label">
        <TextInput onChange={() => {}} />
      </FormField>
      <FormField horizontal label="Label" description="Description text">
        <TextInput onChange={() => {}} />
      </FormField>
      <FormField horizontal label="Label" error="Error text">
        <TextInput error onChange={() => {}} />
      </FormField>
      <FormField
        horizontal
        label="Label"
        description="Description text"
        error="Error text"
      >
        <TextInput error onChange={() => {}} />
      </FormField>
    </FormFieldGroup>
  )
}
