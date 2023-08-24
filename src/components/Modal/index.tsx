import React, { FC } from 'react'
import { Dialog, Style, styled, Text } from '../..'

export type ModalProps = {
  style?: Style
}

export const Modal: FC<ModalProps> = ({ style }) => {
  return (
    <styled.div style={{ ...style }}>
      <Dialog>
        <Dialog.Label style={{ marginBottom: 16 }}>
          Add custom view
        </Dialog.Label>
        <Dialog.Body>
          <Text>Flipei</Text>
        </Dialog.Body>
        <Dialog.Buttons>
          <Dialog.Cancel />
          <Dialog.Confirm />
        </Dialog.Buttons>
      </Dialog>
    </styled.div>
  )
}
