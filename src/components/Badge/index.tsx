import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'

type BadgeProps = {
  children: string
  color?: 'neutral' | 'red' | 'green' | 'indigo' | 'amber'
  type?: 'filled' | 'subtle'
  leadIcon?: IconProps['variant']
  trailIcon?: IconProps['variant']
}

function Badge({
  children,
  color = 'neutral',
  type = 'filled',
  leadIcon,
  trailIcon,
}: BadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        height: 24,
        padding: '0 6px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius[4],
        ...(type === 'filled' && {
          ...(color === 'neutral' && {
            background: colors.neutral100,
            color: colors.neutralInverted100,
          }),
          ...(color === 'red' && {
            background: colors.red100,
            color: colors.white100,
          }),
          ...(color === 'green' && {
            background: colors.green100,
            color: colors.white100,
          }),
          ...(color === 'indigo' && {
            background: colors.indigo100,
            color: colors.white100,
          }),
          ...(color === 'amber' && {
            background: colors.amber100,
            color: colors.white100,
          }),
        }),
        ...(type === 'subtle' && {
          ...(color === 'neutral' && {
            background: colors.neutral20,
            color: colors.neutral100,
          }),
          ...(color === 'red' && {
            background: colors.red20,
            color: colors.red100,
          }),
          ...(color === 'green' && {
            background: colors.green20,
            color: colors.green100,
          }),
          ...(color === 'indigo' && {
            background: colors.indigo20,
            color: colors.indigo100,
          }),
          ...(color === 'amber' && {
            background: colors.amber20,
            color: colors.amber100,
          }),
        }),
      }}
    >
      {leadIcon && <Icon size="small" variant={leadIcon} />}
      {trailIcon && !leadIcon && <div style={{ width: 2, height: '100%' }} />}
      <Text color="inherit" variant="subtext-medium">
        {children}
      </Text>
      {trailIcon && <Icon size="small" variant={trailIcon} />}

      {leadIcon && !trailIcon && <div style={{ width: 2, height: '100%' }} />}
    </div>
  )
}

export { Badge }
export type { BadgeProps }
