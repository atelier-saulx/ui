import React, { useEffect, useState } from 'react'
import { FormErrors, FormField, FormFieldGroup, useForm } from './index.js'
import { TextInput } from '../TextInput/index.js'
import { TextAreaInput } from '../TextAreaInput/index.js'
import { NumberInput } from '../NumberInput/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SwitchInput } from '../SwitchInput/index.js'
import { Calendar } from '../Calendar/index.js'
import { Button } from '../Button/index.js'
import { format } from 'date-fns'
import { Form, FormFields } from './Form.js'

export default {
  title: 'Form',
  component: () => {},
}

export const Component = () => {
  return (
    <Form
      fields={{
        text: { type: 'text', label: 'Text' },
        textarea: { type: 'textarea', label: 'Textarea' },
        number: { type: 'number', label: 'Number' },
        switch: { type: 'switch', label: 'Switch' },
        checkbox: { type: 'checkbox', label: 'Checkbox' },
        datetime: { type: 'datetime', label: 'DateTime' },
      }}
      validate={(values) => {
        const errors: FormErrors = {}

        if (!values['text']) {
          errors['text'] = 'text is required'
        }

        if (!values['checkbox']) {
          errors['checkbox'] = 'checkbox is required'
        }

        if (!values['datetime']) {
          errors['datetime'] = 'datetime is required'
        } else if ((values['datetime'] as number) < Date.now()) {
          errors['datetime'] = 'datetime must be in the future'
        }

        return errors
      }}
      onSubmit={console.log}
    >
      {({
        submitForm,
        resetForm,
        validateForm,
        isSubmitting,
        isValidating,
        isDirty,
      }) => (
        <>
          <FormFields horizontal />
          <div
            style={{
              display: 'flex',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <Button disabled={isSubmitting} onClick={resetForm} variant="ghost">
              Reset
            </Button>
            <Button
              disabled={isSubmitting}
              loading={isValidating}
              onClick={validateForm}
              variant="border"
            >
              Validate
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}

export const Async = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    setInterval(() => {
      setData((p) => ({ ...p, text: crypto.randomUUID() }))
    }, 1000)
  }, [])

  return (
    <Form
      initialValues={data}
      fields={{
        text: { type: 'text', label: 'Text' },
      }}
      validate={async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('foo')
          }, 1000)
        })

        return {}
      }}
      onSubmit={async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('foo')
          }, 2000)
        })
      }}
    >
      {({
        submitForm,
        resetForm,
        validateForm,
        isSubmitting,
        isValidating,
        isDirty,
      }) => (
        <>
          <FormFields />
          <div
            style={{
              display: 'flex',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <Button disabled={isSubmitting} onClick={resetForm} variant="ghost">
              Reset
            </Button>
            <Button
              disabled={isSubmitting}
              loading={isValidating}
              onClick={validateForm}
              variant="border"
            >
              Validate
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
