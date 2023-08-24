import React, { FC } from 'react'
import { Dialog, Style, styled, Text } from '../..'
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
      <Dialog label="yo bitch" description="">
        <Dialog.Label style={{ marginBottom: 16 }}>
          Add custom view
        </Dialog.Label>
        <Dialog.Body>
          <Text size={14}>
            Reference site about Lorem Ipsum, giving information on its origins,
            as well as a random Lipsum generator.
          </Text>
          <ModalWarning />
        </Dialog.Body>
        <Dialog.Buttons>
          <Dialog.Cancel />
          <Dialog.Confirm />
        </Dialog.Buttons>
      </Dialog>
    </styled.div>
  )
}
