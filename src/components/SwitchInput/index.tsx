import { useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { colors } from '../../utils/colors.js'

type SwitchInputProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
}

function SwitchInput({ value, onChange, disabled, error }: SwitchInputProps) {
  const [focus, setFocus] = useState(false)

  return (
    <div
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
      style={{
        width: 24,
        height: 16,
        borderRadius: borderRadius('full'),
        border: `1px solid ${colors.neutral20Adjusted}`,
        background: colors.neutral10Adjusted,
        cursor: 'pointer',
        outline: 'none',
        ...(value && {
          border: `1px solid ${colors.neutral100}`,
          background: colors.neutral100,
        }),
        ...(focus &&
          !disabled && {
            outline: `4px solid ${colors.neutral20Adjusted}`,
          }),
        ...(error && {
          border: `1px solid ${colors.red100}`,
          background: colors.neutral10Adjusted,
          ...(value && {
            border: `1px solid ${colors.red100}`,
            background: colors.red100,
          }),
          ...(focus &&
            !disabled && {
              outline: `4px solid ${colors.red60}`,
            }),
        }),
        ...(disabled && {
          cursor: 'not-allowed',
          border: `1px solid transparent`,
          background: colors.neutral20,
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
          background: colors.neutral100,
          ...(value && {
            marginLeft: 'auto',
            background: colors.neutralInverted100,
          }),
          ...(error && {
            background: colors.neutral100,
          }),
          ...(disabled && {
            background: colors.neutralInverted80,
          }),
        }}
      />
    </div>
  )
}

export type { SwitchInputProps }
export { SwitchInput }
