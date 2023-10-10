import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as DialogBase from '@radix-ui/react-dialog'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { Button } from '../Button'
import { IconAlertFill } from '../../icons'
import { scrollAreaStyle } from '../ScrollArea'
import { useControllableState } from '../../hooks/useControllableState'

type UseModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<UseModalProps>({
  open: false,
  setOpen: () => {},
})

export const useModal = () => {
  return useContext(ModalContext)
}

export type ModalRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Root({
  children,
  open: openProp,
  onOpenChange,
}: ModalRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: false,
    onChange: onOpenChange,
  })

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <DialogBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </DialogBase.Root>
    </ModalContext.Provider>
  )
}

export type ModalTriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: ModalTriggerProps) {
  return <DialogBase.Trigger asChild>{children}</DialogBase.Trigger>
}

export type ModalContentProps = {
  children:
    | (({ open, close }: { open: boolean; close: () => void }) => ReactNode)
    | ReactNode
  width?: string | number
}

export function Content({ children, width = 552 }: ModalContentProps) {
  const { open, setOpen } = useContext(ModalContext)

  if (!open) return null

  return (
    <DialogBase.Portal>
      <DialogBase.Overlay
        style={{
          inset: 0,
          position: 'fixed',
          background: color('standalone', 'dimmer', 'default'),
        }}
      />
      <DialogBase.Content
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <styled.div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: width,
            height: 'auto',
            maxHeight: '70vh',
            background: color('standalone', 'modal', 'default'),
            borderRadius: 8,
            boxShadow:
              '0px 16px 24px -6px rgba(27, 36, 44, 0.16), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
            padding: '24px 32px 0',
            overflowY: 'auto',
            ...scrollAreaStyle,
          }}
        >
          {typeof children === 'function'
            ? children({
                open,
                close: () => {
                  setOpen(false)
                },
              })
            : children}
        </styled.div>
      </DialogBase.Content>
    </DialogBase.Portal>
  )
}

export type ModalWarningProps = {
  type?: 'warning' | 'alert' | 'info'
  children?: ReactNode
  style?: Style
}

export const Warning = ({
  type = 'warning',
  children,
  style,
}: ModalWarningProps) => {
  const genColor =
    type === 'warning'
      ? 'warning'
      : type === 'info'
      ? 'informative'
      : 'negative'

  return (
    <styled.div
      style={{
        height: '24px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: '4px',
        backgroundColor: color('background', genColor, 'subtle'),
        ...style,
      }}
    >
      <IconAlertFill color={genColor} />
      <Text>{children}</Text>
    </styled.div>
  )
}

export type ModalTitleProps = {
  children: ReactNode
}

export function Title({ children }: ModalTitleProps) {
  return (
    <DialogBase.Title asChild>
      <styled.div
        style={{
          fontWeight: 700,
          fontFamily: 'Inter',
          fontSize: 18,
          lineHeight: '32px',
          color: color('content', 'default', 'primary'),
        }}
      >
        {children}
      </styled.div>
    </DialogBase.Title>
  )
}

export type ModalDescriptionProps = {
  children: string | ReactNode
}

export function Description({ children }: ModalDescriptionProps) {
  return (
    <DialogBase.Description asChild>
      <div
        style={{
          fontWeight: 500,
          fontFamily: 'Inter',
          fontSize: 14,
          lineHeight: '24px',
          color: color('content', 'default', 'secondary'),
          marginTop: 16,
        }}
      >
        {children}
      </div>
    </DialogBase.Description>
  )
}

export type ModalBodyProps = {
  children: ReactNode
}

export function Body({ children }: ModalBodyProps) {
  return (
    <styled.div
      style={{
        padding: '24px 0 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {children}
    </styled.div>
  )
}

export type ModalActionsProps = {
  children: ReactNode
}

export function Actions({ children }: ModalActionsProps) {
  return (
    <styled.div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        background: color('standalone', 'modal', 'default'),
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        '& > * + *': {
          marginLeft: '24px',
        },
        padding: '24px 32px 32px',
        margin: '0 -32px',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
      }}
    >
      {children}
    </styled.div>
  )
}

export type ModalConfirmationProps = {
  title: ReactNode
  description?: ReactNode
  label?: ReactNode
  type?: 'info' | 'warning' | 'alert'
  action?: { action: (e) => void; label: string }
}

export function Confirmation({
  title,
  description,
  label,
  type,
  action,
}: ModalConfirmationProps) {
  return (
    <Content>
      {({ close }) => (
        <>
          <Title>{title}</Title>
          <Body>
            <Text>{description}</Text>
            <Warning type={type}>{label}</Warning>
          </Body>
          <Actions>
            <Button onClick={close} color="system">
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                action.action(e)
                close()
              }}
              color={type === 'alert' ? 'alert' : 'primary'}
            >
              {action.label}
            </Button>
          </Actions>
        </>
      )}
    </Content>
  )
}
