import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import { styled } from 'inlines'

type SwitchInputProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
}

function SwitchInput({ value, onChange, disabled, error }: SwitchInputProps) {
  return (
    <styled.label
      data-disabled={disabled ? disabled : undefined}
      data-checked={value ? value : undefined}
      data-error={error ? value : undefined}
      style={{
        display: 'inline-flex',
        width: 24,
        height: 16,
        padding: 2,
        borderRadius: radius.full,
        background: colors.neutral20Adjusted,
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        '&[data-checked]': {
          background: colors.neutral100,
        },
        '&:has(:focus-visible):not([data-disabled])': {
          outline: `4px solid ${colors.neutral20Adjusted}`,
        },
        '&[data-error]': {
          background: colors.red100,
        },
        '&[data-error]:has(:focus-visible):not([data-disabled])': {
          outline: `4px solid ${colors.red60}`,
        },
        '&[data-disabled]': {
          cursor: 'not-allowed',
          background: colors.neutral20Adjusted,
        },
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: radius.full,
          background: colors.neutralInverted100,
          ...(value && {
            marginLeft: 'auto',
            background: colors.neutralInverted100,
          }),
          ...(error && {
            background: colors.neutral100,
          }),
          ...(disabled && {
            background: colors.neutralInverted60,
          }),
        }}
      />
      <input
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
        type="checkbox"
        checked={value}
        onChange={() => {
          if (disabled) return

          onChange(!value)
        }}
        disabled={disabled}
      />
    </styled.label>
  )
}

export type { SwitchInputProps }
export { SwitchInput }
