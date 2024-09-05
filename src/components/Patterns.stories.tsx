import React, { useState } from 'react'
import { Button, Modal, Form } from '../index.js'

export default {
  title: 'Patterns (WIP)',
  component: () => {},
}

// TODO actually use based for the data, form submits  etc.

// TODO this could be a good candidate for a HoC: `FormModal` -> takes title, description, buttonLabels, fields, validation onsubmit but not much else i guess.
export function FormInModalWithDataFromAPI() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        leadIcon="add"
        onClick={() => {
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
        <Form
          fields={{
            title: { type: 'text', label: 'Title' },
            description: { type: 'textarea', label: 'Description' },
            done: { type: 'checkbox', label: 'Done' },
          }}
          validate={async (values) => {
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
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve('foo')
              }, 2000)
            })

            console.log(
              'form submitted with',
              JSON.parse(JSON.stringify(values)),
            )

            setOpen(false)
          }}
        >
          {({ isSubmitting, isDirty, submitForm, resetForm }) => (
            <>
              <Modal.Body>
                <Form.Fields />
              </Modal.Body>
              <Modal.Actions>
                {({ close }) => (
                  <>
                    <Button onClick={close} variant="border" keyHint="Esc">
                      Close
                    </Button>
                    <Button
                      keyHint="Enter"
                      disabled={isSubmitting || !isDirty}
                      loading={isSubmitting}
                      onClick={async () => {
                        await submitForm()
                        resetForm()
                      }}
                    >
                      Create Todo
                    </Button>
                  </>
                )}
              </Modal.Actions>
            </>
          )}
        </Form>
      </Modal>
    </>
  )
}
