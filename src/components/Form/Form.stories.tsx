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
import { Form } from './Form.js'
import { Badge } from '../Badge/index.js'

export default {
  title: 'Form',
  component: () => {},
}

export const Component = () => {
  return (
    <Form
      fields={{
        text: { type: 'text', label: 'Text', description: 'this is a desc' },
        textarea: { type: 'textarea', label: 'Textarea' },
        number: { type: 'number', label: 'Number' },
        simpleSelect: {
          type: 'select',
          label: 'Simple select',
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ],
        },
        fancySelect: {
          type: 'select',
          label: 'Fancy select',
          options: [
            {
              value: 'live',
              label: (
                <Badge color="green-subtle" leadIcon="settings">
                  Live
                </Badge>
              ),
              labelFilterText: 'Live',
            },
            {
              value: 'scheduled',
              label: (
                <Badge color="blue-subtle" leadIcon="date">
                  Scheduled
                </Badge>
              ),
              labelFilterText: 'Scheduled',
            },
          ],
        },
        switch: { type: 'switch', label: 'Switch' },
        checkbox: { type: 'checkbox', label: 'Checkbox' },
        date: { type: 'datetime', label: 'Date', variant: 'date' },
        datetime: { type: 'datetime', label: 'DateTime', variant: 'date-time' },
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
          <Form.Fields horizontal />
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
      setData((p) => ({ ...p, async: crypto.randomUUID() }))
    }, 1000)
  }, [])

  return (
    <Form
      initialValues={data}
      fields={{
        normal: { type: 'text', label: 'Normal' },
        async: { type: 'text', label: 'AsyncDynamicValue' },
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
          <Form.Fields />
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
