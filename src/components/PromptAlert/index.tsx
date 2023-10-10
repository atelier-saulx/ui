import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as DialogBase from '@radix-ui/react-dialog'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { Input } from '../Input'
import { Button } from '../Button'
import { IconAlertFill } from '../../icons'
import { scrollAreaStyle } from '../ScrollArea'
import { useControllableState } from '../../hooks/useControllableState'

type PromptAlertProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PromptAlertContext = createContext<PromptAlertProps>({
  open: false,
  setOpen: () => {},
})

export const usePromptAlert = () => {
  return useContext(PromptAlertContext)
}

export type PromptAlertRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Root({
  children,
  open: openProp,
  onOpenChange,
}: PromptAlertRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: false,
    onChange: onOpenChange,
  })

  return (
    <PromptAlertContext.Provider value={{ open, setOpen }}>
      <DialogBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </DialogBase.Root>
    </PromptAlertContext.Provider>
  )
}

export type PromptAlertTriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: PromptAlertTriggerProps) {
  return <DialogBase.Trigger asChild>{children}</DialogBase.Trigger>
}

export type PromptAlertContentProps = {
  children:
    | (({ open, close }: { open: boolean; close: () => void }) => ReactNode)
    | ReactNode
  width?: string | number
}

export function Content({ children, width = 552 }: PromptAlertContentProps) {
  const { open, setOpen } = useContext(PromptAlertContext)

  if (!open) return null

  return (
    <DialogBase.Portal>
      <DialogBase.Overlay
        style={{
          inset: 0,
          position: 'fixed',
        }}
      />
      <DialogBase.Content
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault()
        }}
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
            top: '2%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
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

type PromptAlertTitleProps = {
  children: ReactNode
}

function Title({ children }: PromptAlertTitleProps) {
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

type PromptAlertDescriptionProps = {
  children: string | ReactNode
}

function Description({ children }: PromptAlertDescriptionProps) {
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

type PromptAlertBodyProps = {
  children: ReactNode
}

function Body({ children }: PromptAlertBodyProps) {
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

type PromptAlertActionsProps = {
  children: ReactNode
}

function Actions({ children }: PromptAlertActionsProps) {
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

export type AlertProps = {
  title: ReactNode
  description?: ReactNode
  // action?: { action: (e) => void; label: string }
  action?: (e) => void
}

export function Alert({ title, description, action }) {
  return (
    <Content>
      {({ close }) => (
        <>
          <Title>{title}</Title>
          <Body>
            <Description>{description}</Description>
          </Body>
          <Actions>
            <Button
              onClick={(e) => {
                action(e)
                close()
              }}
              color={'primary'}
            >
              OK
            </Button>
          </Actions>
        </>
      )}
    </Content>
  )
}

export type PromptProps = {
  title: ReactNode
  description?: ReactNode
  action?: { action: (e) => void; label: string }
  onChange?: (e) => void
}

export function Prompt({ title, description, onChange }) {
  const [value, setValue] = useState('')

  return (
    <Content>
      {({ close }) => (
        <>
          <Title>{title}</Title>
          <Body>
            <Description>{description}</Description>
            <Input type="text" value={value} onChange={(e) => setValue(e)} />
          </Body>
          <Actions>
            <Button
              onClick={() => {
                setValue('')
                close()
              }}
              color="system"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onChange(value)
                setValue('')
                close()
              }}
            >
              {/* {action.label} */}
              OK
            </Button>
          </Actions>
        </>
      )}
    </Content>
  )
}
