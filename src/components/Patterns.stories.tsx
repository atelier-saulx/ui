import React, { useState } from 'react'
import {
  useForm,
  Button,
  Modal,
  TextInput,
  CheckboxInput,
  TextAreaInput,
} from '../index.js'

export default {
  title: 'Patterns',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextInput
              disabled={form.isSubmitting}
              label="Title"
              value={form.values['title'] as string}
              onChange={(v) => {
                form.setValue('title', v)
              }}
              error={form.errors['title']}
            />
            <TextAreaInput
              disabled={form.isSubmitting}
              label="Description"
              value={form.values['description'] as string}
              onChange={(v) => {
                form.setValue('description', v)
              }}
              error={form.errors['description']}
            />
          </div>
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
