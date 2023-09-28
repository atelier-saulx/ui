import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { IconClose, IconCheckLarge } from '~/icons'

// for props gen
type ConfirmationProps = {
  style?: Style
  value?: any
  onAccept: ((value: any) => void) | ((value: any) => Promise<void>)
  onCancel: (value: any) => void
}

export const Confirmation = <T,>({
  onAccept,
  onCancel,
  value,
  style,
}: {
  style?: Style
  value?: T
  onAccept: ((value: T) => void) | ((value: T) => Promise<void>)
  onCancel: (value: T) => void
}): ReturnType<FC> => {
  return (
    <styled.div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <Button
        onClick={() => {
          return onCancel(value)
        }}
        ghost
        style={{ marginLeft: 16 }}
        icon={<IconClose />}
      />
      <Button
        color="primary"
        onClick={async () => {
          return onAccept(value)
        }}
        ghost
        style={{ marginLeft: 4 }}
        icon={<IconCheckLarge />}
      />
    </styled.div>
  )
}
