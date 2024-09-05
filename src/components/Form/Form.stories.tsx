import React from 'react'
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
  title: 'Form',
  component: () => {},
}

export const Default = () => {
  const form = useForm({
    onSubmit: (values) => {
      console.log('onSubmit', values)
    },
    validate: () => {
      return {}
    },
  })

  return (
    <>
      <FormFieldGroup label="Group title">
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
    </>
  )
}

export const DynamicInitialValue = () => {
  const [apiResponse, setApiResponse] = React.useState<any>()

  React.useEffect(() => {
    setInterval(() => {
      setApiResponse((p) => ({ ...p, email: crypto.randomUUID() }))
    }, 500)
  }, [])

  const form = useForm({
    initialValues: apiResponse,
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
      <FormFieldGroup label="Group title">
        <FormField label="Email" error={form.errors['email']}>
          <TextInput
            type="email"
            disabled={form.isSubmitting}
            value={form.values['email'] as string}
            onChange={(value) => {
              form.setValue('email', value)
            }}
            error={!!form.errors['email']}
          />
        </FormField>
        <FormField label="Password" error={form.errors['password']}>
          <TextInput
            type="password"
            disabled={form.isSubmitting}
            value={form.values['password'] as string}
            onChange={(value) => {
              form.setValue('password', value)
            }}
            error={!!form.errors['password']}
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
