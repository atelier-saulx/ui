import React, { ReactNode } from 'react'
import { Confirmation, Modal } from '..'

export type ConfirmModalProps = {
  children: ReactNode
  title?: string
  description?: ReactNode
  onCancel?: () => void
  onConfirm: () => void
}

export function ConfirmModal({
  children,
  title = 'Are you sure?',
  description = 'This action is irreversible',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Title>{title}</Modal.Title>
            {description && (
              <Modal.Description>{description}</Modal.Description>
            )}
            <Modal.Body>
              <div />
            </Modal.Body>
            <Modal.Actions>
              <Confirmation onCancel={onCancel} onConfirm={onConfirm} />
            </Modal.Actions>
          </>
        )}
      </Modal.Content>
    </Modal.Root>
  )
}
