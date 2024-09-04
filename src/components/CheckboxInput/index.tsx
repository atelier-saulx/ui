import { radius } from '../../utils/radius.js'
import { Icon } from '../Icon/index.js'
import { colors } from '../../utils/colors.js'
import { styled } from 'inlines'

type CheckboxInputProps = {
  value?: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  error?: boolean
  size?: 'regular' | 'small'
}

function CheckboxInput({
  value,
  onChange,
  disabled,
  error,
  size = 'regular',
}: CheckboxInputProps) {
  return (
    <styled.label
      data-disabled={disabled ? disabled : undefined}
      data-checked={value ? value : undefined}
      data-error={error ? value : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size === 'small' ? 16 : 20,
        height: size === 'small' ? 16 : 20,
        borderRadius: radius[4],
        border: `1px solid ${colors.neutral20Adjusted}`,
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        color: colors.neutralInverted100,
        '&[data-checked]': {
          border: `1px solid ${colors.neutral100}`,
          background: colors.neutral100,
        },
        '&:has(:focus-visible):not([data-disabled])': {
          outline: `4px solid ${colors.neutral20Adjusted}`,
        },
        '&[data-error]': {
          border: `1px solid ${colors.red100}`,
        },
        '&[data-error][data-checked]': {
          background: colors.red100,
        },
        '&[data-error]:has(:focus-visible):not([data-disabled])': {
          outline: `4px solid ${colors.red60}`,
        },
        '&[data-disabled]': {
          cursor: 'not-allowed',
          border: `1px solid transparent`,
          background: colors.neutral20,
        },
      }}
    >
      {value && (
        <span
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            left: size === 'small' ? -5 : -3,
            top: size === 'small' ? -5 : -3,
          }}
        >
          <Icon variant={size === 'small' ? 'checkmark-small' : 'checkmark'} />
        </span>
      )}
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
        checked={value ?? false}
        onChange={() => {
          if (disabled) return

          onChange(!value)
        }}
        disabled={disabled}
      />
    </styled.label>
  )
}

export type { CheckboxInputProps }
export { CheckboxInput }
