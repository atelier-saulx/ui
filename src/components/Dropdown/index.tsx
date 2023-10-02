import React, { ReactNode } from 'react'
import * as DropdownBase from '@radix-ui/react-dropdown-menu'
import { color } from '../../varsUtilities'
import { styled } from 'inlines'
import { IconCheckLarge, IconChevronRight } from '../../icons'

export type DropdownRootProps = {
  children: ReactNode
}

export function Root({ children }: DropdownRootProps) {
  return <DropdownBase.Root>{children}</DropdownBase.Root>
}

export type DropdownTriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: DropdownTriggerProps) {
  return <DropdownBase.Trigger asChild>{children}</DropdownBase.Trigger>
}

export type DropdownItemsProps = {
  children: ReactNode
}

export function Items({ children }: DropdownItemsProps) {
  return (
    <DropdownBase.Portal>
      <DropdownBase.Content asChild>
        <styled.div
          style={{
            width: 267,
            padding: 8,
            borderRadius: 8,
            border: `1px solid ${color('border', 'default', 'strong')}`,
            background: color('standalone', 'modal', 'default'),
            boxShadow:
              '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
            boxSizing: 'border-box',
            overflowY: 'auto',
            maxHeight:
              'calc(var(--radix-dropdown-menu-content-available-height) - 16px)',
            '& > * + *': {
              marginTop: '2px',
            },
          }}
        >
          {children}
        </styled.div>
      </DropdownBase.Content>
    </DropdownBase.Portal>
  )
}

export type DropdownItemProps = {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function Item({ icon, children, onClick, disabled }: DropdownItemProps) {
  return (
    <DropdownBase.Item asChild disabled={disabled}>
      <styled.div
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          fontFamily: 'Inter-Medium',
          position: 'relative',
          padding: '4px 12px',
          borderRadius: 8,
          outline: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          color: color('content', 'default', 'primary'),
          '&:not([data-disabled]):hover': {
            background: color('action', 'system', 'active'),
          },
          '&:focus': { background: color('action', 'system', 'active') },
          '&:not([data-disabled])': {
            cursor: 'pointer',
          },
        }}
        onClick={onClick}
      >
        {icon && (
          <div style={{ position: 'absolute', top: 6, left: 12 }}>{icon}</div>
        )}
        <div style={{ paddingLeft: 30 }}>{children}</div>
      </styled.div>
    </DropdownBase.Item>
  )
}

export function Separator() {
  return (
    <DropdownBase.Separator
      style={{
        height: 1,
        background: color('border', 'default', 'strong'),
        margin: '8px -8px',
      }}
    />
  )
}

export type DropdownSubProps = {
  children: ReactNode
}

export function Sub({ children }: DropdownSubProps) {
  return <DropdownBase.Sub>{children}</DropdownBase.Sub>
}

export type DropdownSubTriggerProps = {
  children: ReactNode
  icon?: ReactNode
}

export function SubTrigger({ children, icon }: DropdownSubTriggerProps) {
  return (
    <DropdownBase.SubTrigger asChild>
      <styled.div
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          fontFamily: 'Inter-Medium',
          position: 'relative',
          padding: '4px 12px',
          borderRadius: 8,
          outline: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          cursor: 'pointer',
          color: color('content', 'default', 'primary'),
          '&:hover': { background: color('action', 'system', 'active') },
          '&:focus': { background: color('action', 'system', 'active') },
          '&[data-state=open]': {
            background: color('action', 'system', 'active'),
          },
        }}
      >
        {icon && (
          <div style={{ position: 'absolute', top: 6, left: 12 }}>{icon}</div>
        )}
        <div style={{ padding: '0px 30px' }}>{children}</div>
        <div
          style={{ position: 'absolute', display: 'flex', right: 12, top: 6 }}
        >
          <IconChevronRight />
        </div>
      </styled.div>
    </DropdownBase.SubTrigger>
  )
}

export type DropdownSubItemsProps = {
  children: ReactNode
}

export function SubItems({ children }: DropdownSubItemsProps) {
  return (
    <DropdownBase.Portal>
      <DropdownBase.SubContent asChild>
        <styled.div
          style={{
            width: 267,
            padding: 8,
            borderRadius: 8,
            border: `1px solid ${color('border', 'default', 'strong')}`,
            background: color('standalone', 'modal', 'default'),
            boxShadow:
              '0px 2px 8px -1px rgba(27, 36, 44, 0.08), 0px 2px 2px -1px rgba(27, 36, 44, 0.04)',
            boxSizing: 'border-box',
            overflowY: 'auto',
            maxHeight:
              'calc(var(--radix-dropdown-menu-content-available-height) - 16px)',
            '& > * + *': {
              marginTop: '2px',
            },
          }}
        >
          {children}
        </styled.div>
      </DropdownBase.SubContent>
    </DropdownBase.Portal>
  )
}

export type DropdownRadioItemsProps = {
  children: ReactNode
  value: string
  onChange: (value: string) => void
}

export function RadioItems({
  children,
  value,
  onChange,
}: DropdownRadioItemsProps) {
  return (
    <DropdownBase.RadioGroup value={value} onValueChange={onChange}>
      {children}
    </DropdownBase.RadioGroup>
  )
}

export type DropdownRadioItemProps = {
  children: ReactNode
  value: string
}

export function RadioItem({ children, value }: DropdownRadioItemProps) {
  return (
    <DropdownBase.RadioItem value={value} asChild>
      <styled.div
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          fontFamily: 'Inter-Medium',
          position: 'relative',
          padding: '4px 12px',
          borderRadius: 8,
          outline: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          cursor: 'pointer',
          color: color('content', 'default', 'primary'),
          '&:hover': { background: color('action', 'system', 'active') },
          '&:focus': { background: color('action', 'system', 'active') },
        }}
      >
        <DropdownBase.ItemIndicator asChild>
          <div style={{ position: 'absolute', top: 6, left: 12 }}>
            <IconCheckLarge />
          </div>
        </DropdownBase.ItemIndicator>
        <div style={{ paddingLeft: 30 }}>{children}</div>
      </styled.div>
    </DropdownBase.RadioItem>
  )
}
