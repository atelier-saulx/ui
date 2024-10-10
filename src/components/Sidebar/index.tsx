import { ReactNode, createContext, useContext } from 'react'
import { Icon, IconProps } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'
import { radius } from '../../utils/radius.js'
import { styled } from 'inlines'

type SidebarContextType = {
  value?: string
  onChange: (value: string) => void
}
const SidebarContext = createContext<SidebarContextType>({ onChange: () => {} })

type SidebarProps = {
  value?: string
  onChange: (value: string) => void
  children: ReactNode
  side?: 'left' | 'right'
}

function Sidebar({ children, value, onChange, side = 'left' }: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ value, onChange }}>
      <div
        style={{
          flexShrink: 0,
          width: 312,
          position: 'relative',
          background: colors.neutralInverted100,
          height: '100%',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          ...(side === 'left' && {
            borderRight: `1px solid ${colors.neutral20Adjusted}`,
          }),
          ...(side === 'right' && {
            borderLeft: `1px solid ${colors.neutral20Adjusted}`,
          }),
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

type SidebarHeaderProps = {
  children: ReactNode
}

function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div style={{ display: 'flex' }}>{children}</div>
}

type SidebarFooterProps = {
  children: ReactNode
}

function SidebarFooter({ children }: SidebarFooterProps) {
  return <div style={{ display: 'flex' }}>{children}</div>
}

type SidebarItemsProps = {
  children: ReactNode
}

function SidebarItems({ children }: SidebarItemsProps) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        gap: 24,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}

type SidebarGroupProps = {
  children: ReactNode
  title: string
}

function SidebarGroup({ title, children }: SidebarGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ padding: '8px 8px 4px' }}>
        <Text variant="subtext-medium" color="neutral60">
          {title}
        </Text>
      </div>
      {children}
    </div>
  )
}

type SidebarItemProps = {
  children: ReactNode
  value: string
  icon?: IconProps['variant']
  description?: string
}

function SidebarItem({ children, value, icon, description }: SidebarItemProps) {
  const { value: contextValue, onChange } = useContext(SidebarContext)
  const active = value === contextValue

  return (
    <styled.div
      data-active={active ? active : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        gap: 8,
        borderRadius: radius[8],
        '&:hover:not([data-active])': {
          background: colors.neutral10Adjusted,
        },
        '&[data-active]': {
          background: colors.neutral10Adjusted,
        },
        '&[data-active]:hover': {
          background: colors.neutral10Adjusted,
        },
      }}
      onClick={() => {
        onChange(value)
      }}
    >
      {icon && <Icon variant={icon} />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          minHeight: 24,
        }}
      >
        <Text color="neutral80" variant="display-medium">
          {children}
        </Text>
        {description && (
          <Text color="neutral60" variant="subtext-regular">
            {description}
          </Text>
        )}
      </div>
    </styled.div>
  )
}

Sidebar.Items = SidebarItems
Sidebar.Group = SidebarGroup
Sidebar.Item = SidebarItem
Sidebar.Header = SidebarHeader
Sidebar.Footer = SidebarFooter

export { Sidebar }
export type { SidebarProps }
