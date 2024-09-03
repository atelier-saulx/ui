import React, { useState } from 'react'
import { FormErrors, FormField, FormFieldGroup, useForm } from './index.js'
import { TextInput } from '../TextInput/index.js'
import { Button } from '../Button/index.js'

export default {
  title: 'Form',
  component: () => {},
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
