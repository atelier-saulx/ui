import React, { FC, ReactNode } from 'react'
import { Style } from 'inlines'
import { Button } from '../Button'
import { RowEnd } from '../Styled'
import { IconClose, IconCheckLarge } from '../../icons'
import { border } from '../../varsUtilities'
import { Text } from '../Text'
import { useModal } from '../Modal'

type ConfirmationProps = {
  style?: Style
  variant?: 'buttons' | 'icons'
  value?: any
  label?: ReactNode
  onConfirm: ((value: any) => void) | ((value: any) => Promise<void>)
  onCancel: (value: any) => void
}

export const Confirmation = <T,>({
  onConfirm,
  onCancel,
  value,
  style,
  variant,
  label,
}: {
  label?: ReactNode
  variant?: 'buttons' | 'icons'
  style?: Style
  value?: T
  onConfirm: ((value: T) => void) | ((value: T) => Promise<void>)
  onCancel: (value: T) => void
}): ReturnType<FC> => {
  const modal = useModal()

  return variant === 'icons' ? (
    <RowEnd
      style={{
        borderTop: border(1),
        width: '100%',
        marginTop: 16,
        paddingTop: 16,
        marginRight: 8,
      }}
    >
      {label ? <Text light>{label}</Text> : null}
      <Button
        onClick={() => {
          if (modal) {
            modal.setOpen(false)
          }
          return onCancel(value)
        }}
        ghost
        style={{ marginLeft: 16 }}
        icon={<IconClose />}
      />
      <Button
        color="primary"
        onClick={async () => {
          if (modal) {
            modal.setOpen(false)
          }
          return onConfirm(value)
        }}
        ghost
        style={{ marginLeft: 4 }}
        icon={<IconCheckLarge />}
      />
    </RowEnd>
  ) : (
    <RowEnd>
      <Button
        onClick={() => {
          if (modal) {
            modal.setOpen(false)
          }
          return onCancel(value)
        }}
        style={{ marginRight: 24, marginLeft: 16 }}
        color="system"
        displayShortcut
        keyboardShortcut="Esc"
      >
        Cancel
      </Button>
      <Button
        displayShortcut
        keyboardShortcut="Enter"
        onClick={async () => {
          if (modal) {
            modal.setOpen(false)
          }
          return onConfirm(value)
        }}
      >
        {label ?? 'Confirm'}
      </Button>
    </RowEnd>
  )
}
