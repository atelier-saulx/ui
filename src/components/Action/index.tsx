import React, { FC } from 'react'
import { styled } from 'inlines'
import { Modal } from '../../components'
import { IconPlus } from '../../icons'
import { ButtonProps, Button } from '../Button'

export type ActionProps = ButtonProps & {
  label?: string
}

export const Action: FC<ActionProps> = (props) => {
  const { label, children, icon, ...rest } = props
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button color="system" icon={icon ?? <IconPlus />} {...rest}>
          {label}
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        {label ? (
          <Modal.Title>{label}</Modal.Title>
        ) : (
          <styled.div style={{ height: 16 }} />
        )}
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
