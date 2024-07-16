import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'

type BadgeProps = {
  children: string
  color?: 'neutral' | 'red' | 'green' | 'indigo' | 'amber'
  type?: 'filled' | 'subtle'
}

function Badge({ children, color = 'neutral', type = 'filled' }: BadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: '4px 6px',
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
      <Text color="inherit" variant="subtext-medium">
        {children}
      </Text>
    </div>
  )
}

export { Badge }
export type { BadgeProps }
