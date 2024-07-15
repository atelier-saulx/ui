import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'

type CounterProps = {
  children: number
  color?: 'neutral' | 'inverted' | 'red' | 'green' | 'indigo' | 'amber'
}

function Counter({ children, color = 'neutral' }: CounterProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px',
        height: 20,
        minWidth: 20,
        borderRadius: radius.full,
        ...(color === 'neutral' && {
          background: colors.neutral100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'inverted' && {
          background: colors.neutralInverted100,
          color: colors.neutral100,
        }),
        ...(color === 'red' && {
          background: colors.red100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'green' && {
          background: colors.green100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'indigo' && {
          background: colors.indigo100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'amber' && {
          background: colors.amber100,
          color: colors.neutralInverted100,
        }),
      }}
    >
      <Text color="inherit" variant="subtext-medium">
        {children.toString()}
      </Text>
    </div>
  )
}

export { Counter }
export type { CounterProps }
