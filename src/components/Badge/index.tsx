import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'

type BadgeProps = {
  children: string
  color?:
    | 'neutral-subtle'
    | 'neutral-fill'
    | 'red-subtle'
    | 'red-fill'
    | 'indigo-subtle'
    | 'indigo-fill'
    | 'green-subtle'
    | 'green-fill'
    | 'amber-subtle'
    | 'amber-fill'
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
}

function Badge({
  children,
  color = 'neutral-subtle',
  leadIcon,
  trailIcon,
}: BadgeProps) {
  if (leadIcon && trailIcon) {
    throw new Error(
      'Badge only supports either leadIcon or trailIcon, not both at the same time.',
    )
  }
  const hasIcon = leadIcon || trailIcon

  return (
    <div
      style={{
        display: 'inline-flex',
        height: 24,
        padding: hasIcon ? '0 4px' : '0 6px',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius[4],
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
        ...(color === 'indigo-fill' && {
          background: colors.indigo100,
          color: colors.white100,
        }),
        ...(color === 'amber-fill' && {
          background: colors.amber100,
          color: colors.white100,
        }),
        ...(color === 'neutral-subtle' && {
          background: colors.neutral20,
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
        ...(color === 'indigo-subtle' && {
          background: colors.indigo20,
          color: colors.indigo100,
        }),
        ...(color === 'amber-subtle' && {
          background: colors.amber20,
          color: colors.amber100,
        }),
      }}
    >
      {leadIcon && <Icon size="small" variant={leadIcon} />}
      {trailIcon && !leadIcon && <div style={{ width: 1, height: '100%' }} />}
      <Text color="inherit" variant="subtext-medium">
        {children}
      </Text>
      {trailIcon && <Icon size="small" variant={trailIcon} />}
      {leadIcon && !trailIcon && <div style={{ width: 1, height: '100%' }} />}
    </div>
  )
}

export { Badge }
export type { BadgeProps }
