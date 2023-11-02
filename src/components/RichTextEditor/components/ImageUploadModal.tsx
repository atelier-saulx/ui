import React, { ReactNode, useState } from 'react'
import { Button, Input, Modal } from '../..'

export function ImageUploadModal({
  children,
  defaultCaption = '',
  onSave,
  mode = 'add',
}: {
  children: ReactNode
  mode?: 'add' | 'edit'
  defaultCaption?: string
  onSave: (value: {
    file: { id: string; src: string }
    caption: string
  }) => void
}) {
  const [file, setFile] = useState<{ id: string; src: string } | null>(null)
  const [caption, setCaption] = useState(defaultCaption)

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Title>
              {mode === 'add' ? 'Add image' : 'Edit image'}
            </Modal.Title>
            <Modal.Body>
              <Input onChange={setFile} type="file" label="Image" />
              <Input
                value={caption}
                onChange={setCaption}
                type="textarea"
                label="Caption"
              />
            </Modal.Body>
            <Modal.Actions>
              <Button color="system" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave({ file, caption })
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
