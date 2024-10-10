import React, { useContext } from 'react'
import { FormContext, FormFields, FormProps } from './Form.js'
import { FormField } from './FormField.js'
import { FormFieldGroup } from './FormFieldGroup.js'
import { TextInput } from '../TextInput/index.js'
import { TextAreaInput } from '../TextAreaInput/index.js'
import { SwitchInput } from '../SwitchInput/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { NumberInput } from '../NumberInput/index.js'
import { DateInput } from '../DateInput/index.js'
import { SelectInput } from '../SelectInput/index.js'
import { RichTextEditor } from '../RichTextEditor/index.js'

type FormFieldsProps = {
  horizontal?: boolean
  fullScreen?: boolean
}

function FormFields({ horizontal, fullScreen }: FormFieldsProps) {
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('missing form context')
  }

  const { fields, groups, form } = ctx

  //  TODO do not repeat the FormFields so much, make them only once
  function renderFields(fields: FormProps['fields']) {
    return Object.entries(fields).map(([key, field]) => {
      switch (field.type) {
        case 'text':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <TextInput
                disabled={form.isSubmitting}
                value={form.values[key] as string | undefined}
                onChange={(value) => form.setValue(key, value)}
                error={!!form.errors[key]}
              />
            </FormField>
          )
        case 'textarea':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <TextAreaInput
                disabled={form.isSubmitting}
                value={form.values[key] as string | undefined}
                onChange={(value) => form.setValue(key, value)}
                error={!!form.errors[key]}
              />
            </FormField>
          )
        case 'switch':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <SwitchInput
                disabled={form.isSubmitting}
                value={form.values[key] as boolean | undefined}
                onChange={(value) => form.setValue(key, value)}
                error={!!form.errors[key]}
              />
            </FormField>
          )
        case 'checkbox':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <CheckboxInput
                disabled={form.isSubmitting}
                value={form.values[key] as boolean | undefined}
                onChange={(value) => form.setValue(key, value)}
                error={!!form.errors[key]}
              />
            </FormField>
          )
        case 'number':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <NumberInput
                disabled={form.isSubmitting}
                value={form.values[key] as number | undefined}
                onChange={(value) => form.setValue(key, value)}
                error={!!form.errors[key]}
              />
            </FormField>
          )
        case 'datetime':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <DateInput
                variant={field.variant}
                error={!!form.errors[key]}
                disabled={form.isSubmitting}
                value={form.values[key] as number}
                onChange={(value) => {
                  form.setValue(key, value)
                }}
              />
            </FormField>
          )
        case 'select':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              <SelectInput
                disabled={form.isSubmitting}
                value={form.values[key] as string}
                onChange={(value) => {
                  form.setValue(key, value)
                }}
                filterable={field.filterable}
                options={field.options}
              />
            </FormField>
          )
        case 'richtext':
          return (
            <FormField
              key={key}
              horizontal={horizontal}
              label={field.label}
              description={field.description}
              error={form.errors[key]}
              note={field.note}
            >
              {/* TODO missing disabled and error */}
              <RichTextEditor
                value={form.values[key] as string}
                onChange={(value) => {
                  form.setValue(key, value)
                }}
              />
            </FormField>
          )
        default:
          throw new Error('Form: unknown field type')
      }
    })
  }

  if (groups) {
    return groups.map((group) => (
      <FormFieldGroup
        fullScreen={fullScreen}
        key={group.label}
        label={group.label}
      >
        {renderFields(
          Object.keys(fields).reduce((acc, curr) => {
            if (group.fields.includes(curr)) {
              acc[curr] = fields[curr]
            }

            return acc
          }, {} as FormFields),
        )}
      </FormFieldGroup>
    ))
  }

  return (
    <FormFieldGroup fullScreen={fullScreen}>
      {renderFields(fields)}
    </FormFieldGroup>
  )
}

export { FormFields }
export type { FormFieldsProps }
