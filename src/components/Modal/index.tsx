import React, { FC } from 'react'
import { Dialog, Style, styled, Text, Input } from '../..'
import { ModalWarning } from './warning'

export type ModalProps = {
  style?: Style
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
          <Text size={14}>Flip flap</Text>
          <Input type="text" />
          <ModalWarning label="You are about to update the default view Sequence for all users" />
        </Dialog.Body>

        <Dialog.Buttons>
          <Dialog.Cancel />
          <Dialog.Confirm>Primary Action</Dialog.Confirm>
        </Dialog.Buttons>
      </Dialog>
    </styled.div>
  )
}
