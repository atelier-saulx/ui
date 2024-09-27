import { ReactNode } from 'react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'

type AppHeaderProps = {
  children: ReactNode
}

function AppHeader({ children }: AppHeaderProps) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: '100%',
        height: 68,
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 3,
        background: colors.neutralInverted100,
        borderBottom: `1px solid ${colors.neutral20Adjusted}`,
      }}
    >
      {children}
    </div>
  )
}

type AppHeaderTitleProps = {
  children: ReactNode
}

function AppHeaderTitle({ children }: AppHeaderTitleProps) {
  return <Text variant="heading-bold">{children}</Text>
}

type AppHeaderRightProps = {
  children: ReactNode
}

function AppHeaderRight({ children }: AppHeaderRightProps) {
  return (
    <div
      style={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {children}
    </div>
  )
}

type AppHeaderSeparatorProps = {}

function AppHeaderSeparator(_: AppHeaderSeparatorProps) {
  return (
    <div
      style={{
        height: 16,
        width: 1,
        background: colors.neutral10,
      }}
    />
  )
}

AppHeader.Title = AppHeaderTitle
AppHeader.Right = AppHeaderRight
AppHeader.Separator = AppHeaderSeparator

export { AppHeader }
export type { AppHeaderProps }
