import { useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'
import { Icon } from '../Icon/index.js'

type CheckboxInputProps = {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
}

function CheckboxInput({
  value,
  onChange,
  disabled,
  error,
}: CheckboxInputProps) {
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
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        height: 16,
        borderRadius: borderRadius(4),
        border: `1px solid ${color('neutral-20-adjusted')}`,
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        color: color('neutral-inverted-100'),
        ...(value && {
          border: `1px solid ${color('neutral-100')}`,
          background: color('neutral-100'),
        }),
        ...(focus &&
          !disabled && {
            outline: `4px solid ${color('neutral-20-adjusted')}`,
          }),
        ...(error && {
          border: `1px solid ${color('destructive-100')}`,
          ...(value && {
            border: `1px solid ${color('destructive-100')}`,
            background: color('destructive-100'),
          }),
          ...(focus &&
            !disabled && {
              outline: `4px solid ${color('destructive-60')}`,
            }),
        }),
        ...(disabled && {
          cursor: 'not-allowed',
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
      {value && (
        <span
          style={{
            position: 'absolute',
            left: -5,
            top: -5,
          }}
        >
          <Icon variant="checkmark-small" />
        </span>
      )}
    </div>
  )
}

export type { CheckboxInputProps }
export { CheckboxInput }
