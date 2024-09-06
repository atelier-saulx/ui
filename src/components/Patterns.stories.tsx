import React, { useState } from 'react'
import { Button, Modal, Form, Avatar, Text } from '../index.js'

export default {
  title: 'Patterns (WIP)',
  component: () => {},
}

// TODO actually use based for the data, form submits  etc.

// TODO this could be a good candidate for a HoC: `FormModal` -> takes title, description, buttonLabels, fields, validation onsubmit but not much else i guess.
export function FormInModal() {
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
        <Modal.Title>Add task</Modal.Title>
        <Modal.Description>
          Add a beautiful little task here that someone will have to do
        </Modal.Description>
        <Form
          fields={{
            title: { type: 'text', label: 'Title' },
            description: { type: 'textarea', label: 'Description' },
            assignee: {
              type: 'select',
              label: 'Assignee',
              options: [
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 4, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/2bd65f8b-2f43-4b01-95fb-170bdd1a1280/368af3c7-dc76-4729-a5a6-3809399c312a"
                      />
                      <Text variant="display-medium" color="inherit">
                        Bence
                      </Text>
                    </div>
                  ),
                  value: 'bence',
                  labelFilterText: 'Bence',
                },
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 4, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/d14d4591-6cc5-4afc-8c47-c384475b5de2/16cd9278-4497-41fa-8ec2-5de1dfc2c5ad"
                      />
                      <Text variant="display-medium" color="inherit">
                        Sandor
                      </Text>
                    </div>
                  ),
                  value: 'sandor',
                  labelFilterText: 'Sandor',
                },
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 4, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/41852f88-0893-4ae8-9226-8e408e509d72/fbab7a12-7958-4183-babe-bdfd4a70d56e"
                      />
                      <Text variant="display-medium" color="inherit">
                        Victor
                      </Text>
                    </div>
                  ),
                  value: 'victor',
                  labelFilterText: 'Victor',
                },
              ],
            },
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
                      disabled={isSubmitting || !isDirty}
                      loading={isSubmitting}
                      onClick={submitForm}
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
