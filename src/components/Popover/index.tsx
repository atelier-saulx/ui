import React, { ReactNode, createContext, useContext } from 'react'
import * as PopoverBase from '@radix-ui/react-popover'
import { Style } from 'inlines'
import { color } from '../../varsUtilities'
import { ScrollArea } from '../ScrollArea'
import { useControllableState } from 'src/hooks/useControllableState'

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
        {...rest}
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <ScrollArea
          style={{
            backgroundColor: color('background', 'default'),
            border: `1px solid ${color('border', 'default')}`,
            borderRadius: 4,
            padding: 24,
            ...props.style,
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
        </ScrollArea>
      </PopoverBase.Content>
    </PopoverBase.Portal>
  )
}
