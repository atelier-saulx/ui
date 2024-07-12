import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'

type SwitchInputProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
}

function SwitchInput({ value, onChange, disabled, error }: SwitchInputProps) {
  return (
    <div
      style={{
        width: 24,
        height: 16,
        borderRadius: borderRadius('full'),
        border: `1px solid ${color('neutral-20-adjusted')}`,
        background: color('neutral-10-adjusted'),
        ...(value && {
          border: `1px solid ${color('neutral-100')}`,
          background: color('neutral-100'),
        }),
        ...(error && {
          border: `1px solid ${color('destructive-100')}`,
          background: color('neutral-10-adjusted'),
          ...(value && {
            border: `1px solid ${color('destructive-100')}`,
            background: color('destructive-100'),
          }),
        }),
        ...(disabled && {
          border: `1px solid transparent`,
          background: color('neutral-20'),
        }),
      }}
      tabIndex={0}
      onClick={() => {
        if (disabled) return

        onChange(!value)
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: borderRadius('full'),
          background: color('neutral-100'),
          ...(value && {
            marginLeft: 'auto',
            background: color('neutral-inverted-100'),
          }),
          ...(error && {
            background: color('neutral-100'),
          }),
          ...(disabled && {
            background: color('neutral-inverted-80'),
          }),
        }}
      />
    </div>
  )
}

export type { SwitchInputProps }
export { SwitchInput }
