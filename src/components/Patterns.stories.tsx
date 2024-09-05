import React, { useState } from 'react'
import {
  useForm,
  Button,
  Modal,
  TextInput,
  CheckboxInput,
  TextAreaInput,
  FormField,
  FormFieldGroup,
} from '../index.js'

export default {
  title: 'Patterns (WIP)',
  component: () => {},
}

// TODO actually use based for the data, form submits  etc.

export function FormInModalWithDataFromAPI() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    validate: async (values) => {
      const errors = {}

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 2000)
      })

      if (!values['title']) {
        errors['title'] = 'title is required'
      }

      return errors
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 2000)
      })

      console.log('form submitted with', JSON.parse(JSON.stringify(values)))

      setOpen(false)
    },
  })

  return (
    <>
      <Button
        leadIcon="add"
        onClick={() => {
          form.resetForm()
          setOpen(true)
        }}
      >
        Add article
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Title>Add todo</Modal.Title>
        <Modal.Description>
          Add a beautiful little todo here to make sure you remember
        </Modal.Description>
        <Modal.Body>
          <FormFieldGroup>
            <FormField label="Email" error={form.errors['title']}>
              <TextInput
                disabled={form.isSubmitting}
                value={form.values['title'] as string}
                onChange={(v) => {
                  form.setValue('title', v)
                }}
                error={!!form.errors['title']}
              />
            </FormField>
            <FormField label="Description" error={form.errors['description']}>
              <TextAreaInput
                disabled={form.isSubmitting}
                value={form.values['description'] as string}
                onChange={(v) => {
                  form.setValue('description', v)
                }}
                error={!!form.errors['description']}
              />
            </FormField>
            <FormField label="Done" error={form.errors['done']}>
              <CheckboxInput
                disabled={form.isSubmitting}
                value={form.values['done'] as boolean}
                onChange={(v) => {
                  form.setValue('done', v)
                }}
                error={!!form.errors['done']}
              />
            </FormField>
          </FormFieldGroup>
        </Modal.Body>
        <Modal.Actions>
          {({ close }) => (
            <>
              <Button
                disabled={form.isSubmitting}
                onClick={close}
                variant="border"
                keyHint="Esc"
              >
                Close
              </Button>
              <Button onClick={form.submitForm} keyHint="Enter">
                Create Todo
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    </>
  )
}
