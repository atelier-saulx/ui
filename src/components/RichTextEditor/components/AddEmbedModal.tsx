import React, { ReactNode, useState } from 'react'
import { Button, Input, Modal } from '../..'

export function AddEmbedModal({
  children,
  defaultHTML = '',
  onSave,
  mode = 'add',
}: {
  children: ReactNode
  defaultHTML?: string
  onSave: (value: { html: string }) => void
  mode?: 'add' | 'edit'
}) {
  const [html, setHTML] = useState(defaultHTML)

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Title>
              {mode === 'add' ? 'Add embed' : 'Edit embed'}
            </Modal.Title>
            <Modal.Body>
              <Input
                value={html}
                onChange={setHTML}
                label="Custom HTML"
                type="textarea"
              />
            </Modal.Body>
            <Modal.Actions>
              <Button color="system" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave({ html })
                  close()
                }}
              >
                {mode === 'add' ? 'Add' : 'Save changes'}
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Content>
    </Modal.Root>
  )
}
