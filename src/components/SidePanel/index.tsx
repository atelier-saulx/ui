import React, { ReactNode, useState, createContext, useContext } from 'react'
import * as DialogBase from '@radix-ui/react-dialog'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { IconAlertFill, IconClose } from '../../icons'
import { scrollAreaStyle } from '../ScrollArea'
import { useControllableState } from '../../hooks/useControllableState'
import { Button } from '../Button'
import { BpMobile, BpTablet } from '../../utils'

type UseSidePanelProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidePanelContext = createContext<UseSidePanelProps>({
  open: false,
  setOpen: () => {},
})

export type SidePanelRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Root({
  children,
  open: openProp,
  onOpenChange,
}: SidePanelRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: false,
    onChange: onOpenChange,
  })

  return (
    <SidePanelContext.Provider value={{ open, setOpen }}>
      <DialogBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </DialogBase.Root>
    </SidePanelContext.Provider>
  )
}

export type SidePanelTriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: SidePanelTriggerProps) {
  return <DialogBase.Trigger asChild>{children}</DialogBase.Trigger>
}

export type SidePanelContentProps = {
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
}: SidePanelContentProps) {
  const { open, setOpen } = useContext(SidePanelContext)

  if (!open) return null

  return (
    <DialogBase.Portal>
      <DialogBase.Overlay
        style={{
          inset: 0,
          position: 'fixed',
          background: color('standalone', 'dimmer', 'default'),
          opacity: open ? 1 : 0,
          transition: '0.2s all',
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
            inset: 0,
            display: 'flex',
            padding: 24,
            [BpMobile]: {
              padding: 16,
            },
          }}
        >
          <styled.div
            style={{
              marginRight: position === 'right' ? '0px' : 'auto',
              marginLeft: position === 'right' ? 'auto' : '0px',
              height: '100%',
              position: 'relative',
              width: '90vw',
              maxWidth: width,
              overflow: 'hidden',
              [BpTablet]: {
                maxWidth: '100%',
              },
              background: color('standalone', 'modal', 'default'),
              borderRadius: 12,
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
        </styled.div>
      </DialogBase.Content>
    </DialogBase.Portal>
  )
}

export type SidePanelWarningProps = {
  type?: 'warning' | 'alert'
  children?: ReactNode
  style?: Style
}

export const Warning = ({
  type = 'warning',
  children,
  style,
}: SidePanelWarningProps) => {
  const genColor = type === 'warning' ? 'warning' : 'negative'

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

export type SidePanelTitleProps = {
  children: ReactNode | ReactNode[]
  closeFunc?: () => void
}

export function Title({ children, closeFunc }: SidePanelTitleProps) {
  const theContext = useContext(SidePanelContext)
  return (
    <DialogBase.Title asChild style={{}}>
      <styled.div
        style={{
          display: 'flex',

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
          keyboardShortcut="Esc"
          hideFocusState
          onClick={() => {
            theContext.setOpen(false)
            closeFunc?.()
          }}
        />
      </styled.div>
    </DialogBase.Title>
  )
}

export type SidePanelBodyProps = {
  children: ReactNode
}

export function Body({ children }: SidePanelBodyProps) {
  return (
    <styled.div
      style={{
        // height: '-webkit-fill-available',
        height: '100%',
        padding: '24px 24px 24px',
        paddingBottom: '200px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        gap: 24,
        ...scrollAreaStyle,
      }}
    >
      {children}
    </styled.div>
  )
}

export type SidePanelActionsProps = {
  children: ReactNode
}

export function Actions({ children }: SidePanelActionsProps) {
  return (
    <styled.div
      style={{
        // position: 'sticky',
        // bottom: 0,
        left: 0,
        right: 0,
        // padding: 24,
        // background: color('standalone', 'modal', 'default'),
        // display: 'flex',
        // justifyContent: 'end',
        // alignItems: 'center',
        // '& > * + *': {
        //   marginLeft: '24px',
        // },
        // // padding: '24px 32px 32px',
        // // margin: '0 -32px',
        // borderTop: `1px solid ${color('border', 'default', 'strong')}`,
        position: 'sticky',
        top: 'auto',
        bottom: 0,
        overflow: 'hidden',
        background: color('standalone', 'modal', 'default'),
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        '& > * + *': {
          marginLeft: '24px',
        },
        padding: '24px 32px 32px',
        // margin: '0 -32px',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
      }}
    >
      {children}
    </styled.div>
  )
}
