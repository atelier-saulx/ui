import React, { useState } from 'react'
import { FormErrors, FormField, FormFieldGroup, useForm } from './index.js'
import { TextInput } from '../TextInput/index.js'
import { TextAreaInput } from '../TextAreaInput/index.js'
import { NumberInput } from '../NumberInput/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SwitchInput } from '../SwitchInput/index.js'
import { Calendar } from '../Calendar/index.js'
import { Button } from '../Button/index.js'
import { format } from 'date-fns'

export default {
  title: 'Form (WIP)',
  component: () => {},
}

export const AllTypes = () => {
  const form = useForm({
    initialValues: {},
    onSubmit: (values) => {
      console.log('onSubmit', values)
    },
    validate: () => {
      return {}
    },
  })

  console.count('rerender')

  return (
    <>
      <FormFieldGroup header="Group title">
        <FormField label="TextInput">
          <TextInput
            value={form.values['text'] as string}
            onChange={(value) => {
              form.setValue('text', value)
            }}
          />
        </FormField>
        <FormField label="TextInput">
          <TextAreaInput
            value={form.values['textarea'] as string}
            onChange={(value) => {
              form.setValue('textarea', value)
            }}
          />
        </FormField>
        <FormField label="NumberInput">
          <NumberInput
            value={form.values['number'] as number}
            onChange={(value) => {
              form.setValue('number', value)
            }}
          />
        </FormField>
        <FormField label="CheckboxInput">
          <CheckboxInput
            size="small"
            value={form.values['checkbox'] as boolean}
            onChange={(value) => {
              form.setValue('checkbox', value)
            }}
          />
        </FormField>
        <FormField label="SwitchInput">
          <SwitchInput
            value={form.values['switch'] as boolean}
            onChange={(value) => {
              form.setValue('switch', value)
            }}
          />
        </FormField>
        <FormField label="Calendar">
          <Calendar
            variant="date-time"
            value={form.values['calendar'] as number}
            onChange={(value) => {
              form.setValue('calendar', value)
            }}
          >
            <Button variant="border" leadIcon="date">
              {form.values['calendar']
                ? format(
                    new Date(form.values['calendar'] as number),
                    'MMM d, yyy HH:mm',
                  )
                : 'Pick a date'}
            </Button>
          </Calendar>
        </FormField>
      </FormFieldGroup>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  )
}

export const WIP = () => {
  const [apiResponse, setApiResponse] = React.useState<any>(null)

  React.useEffect(() => {
    setTimeout(() => {
      setApiResponse({
        email: 'email-from-api@example.com',
        password: crypto.randomUUID(),
      })
      setInterval(() => {
        setApiResponse((p) => ({ ...p, password: crypto.randomUUID() }))
      }, 500)
    }, 1500)
  }, [])

  const form = useForm({
    initialValues: apiResponse ?? {
      email: '',
      password: '',
    },
    validate: async (values) => {
      const errors: FormErrors = {}

      if (!values.email) {
        errors['email'] = 'Please provide an email.'
      }

      if (!values.password) {
        errors['password'] = 'Please provide a password.'
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 2000)
      })

      return errors
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 2000)
      })
      console.log('form submitted with', values)
    },
  })

  return (
    <>
      <FormFieldGroup header="Group title">
        <FormField label="Email">
          <TextInput
            type="email"
            //  TODO @vassbence fix "as string"
            disabled={form.isSubmitting}
            value={form.values['email'] as string}
            onChange={(value) => {
              form.setValue('email', value)
            }}
            error={form.errors['email']}
          />
        </FormField>
        <FormField label="Password">
          <TextInput
            type="password"
            disabled={form.isSubmitting}
            value={form.values['password'] as string}
            onChange={(value) => {
              form.setValue('password', value)
            }}
            error={form.errors['password']}
          />
        </FormField>
      </FormFieldGroup>
      <Button
        disabled={form.isSubmitting}
        variant="border"
        onClick={form.resetForm}
      >
        Reset form
      </Button>
      <Button
        disabled={form.isSubmitting}
        loading={form.isValidating}
        variant="border"
        onClick={form.validateForm}
      >
        Validate form
      </Button>
      <Button
        disabled={form.isSubmitting || !form.isDirty}
        loading={form.isSubmitting}
        onClick={form.submitForm}
      >
        Submit form
      </Button>
      <hr />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  )
}
