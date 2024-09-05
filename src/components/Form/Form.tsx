import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useForm, UseFormProps } from './useForm.js'
import { FormField } from './FormField.js'
import { FormFieldGroup } from './FormFieldGroup.js'
import { TextInput } from '../TextInput/index.js'
import { TextAreaInput } from '../TextAreaInput/index.js'
import { SwitchInput } from '../SwitchInput/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { NumberInput } from '../NumberInput/index.js'
import { Calendar } from '../Calendar/index.js'
import { Button } from '../Button/index.js'
import { format } from 'date-fns'

const FormContext = createContext<{
  fields: FormProps['fields']
  form: ReturnType<typeof useForm>
} | null>(null)

type FormProps = {
  children: ReactNode | ((form: ReturnType<typeof useForm>) => React.ReactNode)
  fields: {
    [key: string]: {
      type: 'text' | 'textarea' | 'number' | 'switch' | 'checkbox' | 'datetime'
      label?: string
      description?: string
    }
  }
} & UseFormProps

function Form({ fields, children, ...useFormProps }: FormProps) {
  const form = useForm(useFormProps)

  return (
    <FormContext.Provider value={{ fields, form }}>
      {typeof children === 'function' ? children(form) : children}
    </FormContext.Provider>
  )
}

type FormFieldsProps = {
  horizontal?: boolean
}

function FormFields({ horizontal }: FormFieldsProps) {
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('missing form context')
  }

  const { fields, form } = ctx

  const children = useMemo(
    () =>
      Object.entries(fields).map(([key, field]) => {
        switch (field.type) {
          case 'text':
            return (
              <FormField
                key={key}
                horizontal={horizontal}
                label={field.label}
                description={field.description}
                error={form.errors[key]}
              >
                <TextInput
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
              >
                <TextAreaInput
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
              >
                <SwitchInput
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
              >
                <CheckboxInput
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
              >
                <NumberInput
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
              >
                <Calendar
                  variant="date-time"
                  value={form.values[key] as number}
                  onChange={(value) => {
                    form.setValue(key, value)
                  }}
                >
                  <Button variant="border" leadIcon="date">
                    {form.values[key]
                      ? format(
                          new Date(form.values[key] as number),
                          'MMM d, yyy HH:mm',
                        )
                      : 'Pick a date'}
                  </Button>
                </Calendar>
              </FormField>
            )
          default:
            throw new Error('Form: unknown field type')
        }
      }),
    [fields, form],
  )

  return <FormFieldGroup>{children}</FormFieldGroup>
}

Form.Fields = FormFields

export { Form }
export type { FormProps, FormFieldsProps }
