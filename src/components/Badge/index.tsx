import { forwardRef, ReactNode } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'

type BadgeProps = {
  children: ReactNode
  color?:
    | 'neutral-subtle'
    | 'neutral-fill'
    | 'red-subtle'
    | 'red-fill'
    | 'blue-subtle'
    | 'blue-fill'
    | 'green-subtle'
    | 'green-fill'
    | 'orange-subtle'
    | 'orange-fill'
    | 'white-subtle'
    | 'white-fill'
    | 'inverted-subtle'
    | 'inverted-fill'
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, color = 'neutral-subtle', leadIcon, trailIcon }, ref) => {
    if (leadIcon && trailIcon) {
      throw new Error(
        'Badge only supports either leadIcon or trailIcon, not both at the same time.',
      )
    }
    const hasIcon = leadIcon || trailIcon

    return (
      <div
        ref={ref}
        style={{
          maxWidth: '100%',
          display: 'inline-flex',
          height: 24,
          padding: hasIcon ? '0 4px' : '0 6px',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius[4],
          userSelect: 'none',
          ...(color === 'neutral-fill' && {
            background: colors.neutral100,
            color: colors.neutralInverted100,
          }),
          ...(color === 'red-fill' && {
            background: colors.red100,
            color: colors.white100,
          }),
          ...(color === 'green-fill' && {
            background: colors.green100,
            color: colors.white100,
          }),
          ...(color === 'blue-fill' && {
            background: colors.blue100,
            color: colors.white100,
          }),
          ...(color === 'orange-fill' && {
            background: colors.orange100,
            color: colors.white100,
          }),
          ...(color === 'neutral-subtle' && {
            background: colors.neutral20Adjusted,
            color: colors.neutral100,
          }),
          ...(color === 'red-subtle' && {
            background: colors.red20,
            color: colors.red100,
          }),
          ...(color === 'green-subtle' && {
            background: colors.green20,
            color: colors.green100,
          }),
          ...(color === 'blue-subtle' && {
            background: colors.blue20,
            color: colors.blue100,
          }),
          ...(color === 'orange-subtle' && {
            background: colors.orange20,
            color: colors.orange100,
          }),
          ...(color === 'inverted-subtle' && {
            background: colors.neutralInverted20,
            color: colors.neutralInverted100,
          }),
          ...(color === 'inverted-fill' && {
            background: colors.neutralInverted100,
            color: colors.neutral100,
          }),
          ...(color === 'white-subtle' && {
            background: colors.white20,
            color: colors.white100,
          }),
          ...(color === 'white-fill' && {
            background: colors.white100,
            color: colors.black100,
          }),
        }}
      >
        {leadIcon && <Icon size="small" variant={leadIcon} />}
        {trailIcon && !leadIcon && <div style={{ width: 1, height: '100%' }} />}
        <Text singleLine color="inherit" variant="subtext-medium">
          {children}
        </Text>
        {trailIcon && <Icon size="small" variant={trailIcon} />}
        {leadIcon && !trailIcon && <div style={{ width: 1, height: '100%' }} />}
      </div>
    )
  },
)

export { Badge }
export type { BadgeProps }
