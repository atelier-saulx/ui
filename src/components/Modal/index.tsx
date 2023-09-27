import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as DialogBase from '@radix-ui/react-dialog'
import { styled } from 'inlines'
import { color } from '~/varsUtilities'

type UseModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<UseModalProps>({
  open: false,
  setOpen: () => {},
})

export type ModalRootProps = {
  children: ReactNode
}

export function Root({ children }: ModalRootProps) {
  const [open, setOpen] = useState(false)

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
}

export function Content({ children }: ModalContentProps) {
  const { open, setOpen } = useContext(ModalContext)

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
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: 552,
          height: 'auto',
          maxHeight: '70vh',
          background: color('standalone', 'modal', 'default'),
          borderRadius: 8,
          boxShadow:
            '0px 16px 24px -6px rgba(27, 36, 44, 0.16), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
          padding: '24px 32px 0',
          overflowY: 'auto',
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
      </DialogBase.Content>
    </DialogBase.Portal>
  )
}

export type ModalTitleProps = {
  children: string
}

export function Title({ children }: ModalTitleProps) {
  return (
    <DialogBase.Title asChild>
      <div
        style={{
          fontWeight: 700,
          fontFamily: 'Inter-SemiBold',
          fontSize: 18,
          lineHeight: '32px',
          color: color('content', 'default', 'primary'),
        }}
      >
        {children}
      </div>
    </DialogBase.Title>
  )
}

export type ModalDescriptionProps = {
  children: string
}

export function Description({ children }: ModalDescriptionProps) {
  return (
    <DialogBase.Description asChild>
      <div
        style={{
          fontWeight: 500,
          fontFamily: 'Inter-Medium',
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
