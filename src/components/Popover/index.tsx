import React, { ReactNode, createContext, useContext } from 'react'
import * as PopoverBase from '@radix-ui/react-popover'
import { Style, styled } from 'inlines'
import { color } from '../../varsUtilities'
import { ScrollArea } from '../ScrollArea'
import { useControllableState } from '../../hooks/useControllableState'

type usePopoverProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PopoverContext = createContext<usePopoverProps>({
  open: false,
  setOpen: () => {},
})

export type PopoverRootProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Root({
  children,
  open: openProp,
  onOpenChange,
}: PopoverRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: false,
    onChange: onOpenChange,
  })

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <PopoverBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverBase.Root>
    </PopoverContext.Provider>
  )
}

export type PopoverTriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: PopoverTriggerProps) {
  return <PopoverBase.Trigger asChild>{children}</PopoverBase.Trigger>
}
export function Anchor({ children }: PopoverBase.PopoverAnchorProps) {
  return <PopoverBase.Anchor asChild>{children}</PopoverBase.Anchor>
}

export type PopoverContentProps = {
  children:
    | (({ open, close }: { open: boolean; close: () => void }) => ReactNode)
    | ReactNode
  style?: Style
}

export function Content(
  props: PopoverBase.PopoverContentProps & PopoverContentProps
) {
  const { open, setOpen } = useContext(PopoverContext)
  const { style, children, ...rest } = props
  if (!open) return null

  return (
    <PopoverBase.Portal>
      <PopoverBase.Content
        asChild
        {...rest}
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
        style={{}}
      >
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            flexDirection: 'column',
            boxShadow:
              '0px 8px 16px -2px rgba(27, 36, 44, 0.12), 0px 2px 2px -1px rgba(27, 35, 44, 0.04)',
            backgroundColor: color('background', 'default'),
            border: `1px solid ${color('border', 'default')}`,
            borderRadius: 16,
            maxHeight: '600px',
            overflow: 'auto',
            maxWidth:
              'calc(var(--radix-dropdown-menu-content-available-width) - 16px)',
            // maxHeight:
            //   'calc(var(--radix-dropdown-menu-content-available-height) - 16px)',
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
      </PopoverBase.Content>
    </PopoverBase.Portal>
  )
}
