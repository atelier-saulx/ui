import { useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'
import { useHadKeyboardEvent } from '../../hooks/useHadKeyboardEvent.js'

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
  const hadKeyboardEvent = useHadKeyboardEvent()
  const focused = focus && hadKeyboardEvent

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
        borderRadius: radius[4],
        border: `1px solid ${colors.neutral20Adjusted}`,
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        color: colors.neutralInverted100,
        ...(value && {
          border: `1px solid ${colors.neutral100}`,
          background: colors.neutral100,
        }),
        ...(focused &&
          !disabled && {
            outline: `4px solid ${colors.neutral20Adjusted}`,
          }),
        ...(error && {
          border: `1px solid ${colors.red100}`,
          ...(value && {
            border: `1px solid ${colors.red100}`,
            background: colors.red100,
          }),
          ...(focused &&
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
