import { ReactNode } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'

type CounterProps = {
  children: ReactNode
  color?:
    | 'neutral'
    | 'inverted'
    | 'red'
    | 'green'
    | 'blue'
    | 'orange'
    | 'white'
}

function Counter({ children, color = 'neutral' }: CounterProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 4px',
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
        ...(color === 'blue' && {
          background: colors.blue100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'orange' && {
          background: colors.orange100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'white' && {
          background: colors.white100,
          color: colors.black100,
        }),
      }}
    >
      <Text color="inherit" variant="subtext-bold">
        {children}
      </Text>
    </div>
  )
}

export { Counter }
export type { CounterProps }
