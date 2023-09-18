import React, { FC, ReactNode } from 'react'
import { Dialog, Style, styled, Text, Input } from '~'
import { ModalWarning } from './ModalWarning'

export type ModalProps = {
  style?: Style
  children?: ReactNode
}

// dialog props
// label, description -> REactNodes
// onCancel , onConfirm -> give you buttons
// children -> whatever you put here will be in body

export const Modal: FC<ModalProps> = ({ style }) => {
  return (
    <styled.div style={{ ...style }}>
      <Dialog
        label="Some example"
        description="This is your organisation’s name within Based.
For example, you can use the name of your company or department."
      >
        <Dialog.Body>
          {/* <Input  type="text" style={{ marginBottom: 24 }} /> */}
          <ModalWarning color="negative" style={{ marginBottom: 24 }}>
            You are about to update the default view Sequence for all users
          </ModalWarning>
        </Dialog.Body>

        <Dialog.Buttons>
          <Dialog.Cancel />
          <Dialog.Confirm>Primary Action</Dialog.Confirm>
        </Dialog.Buttons>
      </Dialog>
    </styled.div>
  )
}
