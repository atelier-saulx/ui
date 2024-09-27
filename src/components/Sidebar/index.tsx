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
}

function Sidebar({ children, value, onChange }: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ value, onChange }}>
      <div
        style={{
          width: 312,
          position: 'relative',
          background: colors.neutralInverted100,
          height: '100%',
          borderRight: `1px solid ${colors.neutral20Adjusted}`,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: colors.neutral5,
            pointerEvents: 'none',
          }}
        />
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
}

function SidebarItem({ children, value, icon }: SidebarItemProps) {
  const { value: contextValue, onChange } = useContext(SidebarContext)
  const active = value === contextValue

  return (
    <styled.div
      data-active={active ? active : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: 8,
        height: 40,
        borderRadius: radius[8],
        color: colors.neutral80,
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
      <Text color="inherit" variant="display-medium">
        {children}
      </Text>
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
