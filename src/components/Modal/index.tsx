import React, { FC, ReactNode } from 'react'
import { Dialog, Style, styled } from '~'

export type ModalProps = {
  style?: Style
  children?: ReactNode
  label: string
  description?: string
  onCancel: () => void
  onConfirm: () => void
  cancelLabel?: string
  confirmLabel?: string
}

export const Modal: FC<ModalProps> = ({
  style,
  children,
  label,
  description,
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
}) => {
  return (
    <styled.div style={style}>
      <Dialog label={label} description={description}>
        <Dialog.Body>{children}</Dialog.Body>
        <Dialog.Buttons>
          <Dialog.Cancel onCancel={onCancel} color="inverted">
            {cancelLabel}
          </Dialog.Cancel>
          <Dialog.Confirm onConfirm={onConfirm} color="alert">
            {confirmLabel}
          </Dialog.Confirm>
        </Dialog.Buttons>
      </Dialog>
    </styled.div>
  )
}
