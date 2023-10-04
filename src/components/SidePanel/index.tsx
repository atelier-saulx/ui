import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as DialogBase from '@radix-ui/react-dialog'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { IconAlertFill, IconClose } from '../../icons'
import { scrollAreaStyle } from '../ScrollArea'
import { useControllableState } from 'src/hooks/useControllableState'
import { Button } from '../Button'

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
  position?: 'left' | 'right'
}

export function Content({
  children,
  width = '55%',
  position = 'right',
}: ModalContentProps) {
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
            border: '1px solid red',
            position: 'fixed',
            top: '24px',
            bottom: '24px',
            left: position === 'left' ? '24px' : 'auto',
            right: position === 'left' ? 'auto' : '24px',
            width: '90vw',
            maxWidth: width,
            background: color('standalone', 'modal', 'default'),
            borderRadius: 12,
            // padding: '24px 32px 0',
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
  type?: 'warning' | 'alert'
  children?: ReactNode
  style?: Style
}

export const Warning = ({
  type = 'warning',
  children,
  style,
}: ModalWarningProps) => {
  const genColor = type === 'warning' ? 'warning' : 'negative'

  return (
    <styled.div
      style={{
        border: '1px solid red',
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
  children: string
}

export function Title({ children }: ModalTitleProps) {
  return (
    <DialogBase.Title asChild style={{}}>
      <styled.div
        style={{
          display: 'flex',
          border: '1px solid red',
          padding: '24px 32px',
          borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          weight="strong"
          size={18}
          style={{
            lineHeight: '32px',
          }}
        >
          {children}
        </Text>
        <Button
          icon={<IconClose />}
          style={{ borderRadius: '50%' }}
          light
          hideFocusState
        />
      </styled.div>
    </DialogBase.Title>
  )
}

export type ModalBodyProps = {
  children: ReactNode
}

export function Body({ children }: ModalBodyProps) {
  return (
    <styled.div
      style={{
        border: '1px solid red',
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
        border: '1px solid red',
        position: 'sticky',
        bottom: 0,
        // left: 0,
        // right: 0,
        background: color('standalone', 'modal', 'default'),
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        '& > * + *': {
          marginLeft: '24px',
        },
        // padding: '24px 32px 32px',
        // margin: '0 -32px',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
      }}
    >
      {children}
    </styled.div>
  )
}
