import React, { useState } from 'react'
import { Modal } from './index.js'
import { Button } from '../Button/index.js'
import { FormFieldGroup, FormField } from '../Form/index.js'
import { TextInput } from '../TextInput/index.js'

export default {
  title: 'Modal',
  component: () => {},
}

export const Simple = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open modal
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Title>Title of the modal</Modal.Title>
        <Modal.Description>
          Some text here to descripe what we expect from you in this modal.
        </Modal.Description>
        <Modal.Body>
          <div style={{ height: 200 }} />
        </Modal.Body>
        <Modal.Actions>
          {({ close }) => (
            <>
              <Button keyHint="Esc" variant="border" onClick={close}>
                Cancel
              </Button>
              <Button
                keyHint="Enter"
                onClick={async () => {
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve('foo')
                    }, 2000)
                  })
                  close()
                }}
              >
                Save
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    </>
  )
}

export const LargeBody = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open modal
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Title>Title of the modal</Modal.Title>
        <Modal.Description>
          Some text here to descripe what we expect from you in this modal.
        </Modal.Description>
        <Modal.Body>
          <div style={{ height: 500 }} />
        </Modal.Body>
        <Modal.Actions>
          {({ close }) => (
            <>
              <Button keyHint="Esc" variant="border" onClick={close}>
                Cancel
              </Button>
              <Button
                keyHint="Enter"
                onClick={async () => {
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve('foo')
                    }, 2000)
                  })
                  close()
                }}
              >
                Save
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    </>
  )
}
