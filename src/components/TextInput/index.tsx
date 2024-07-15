import { useRef, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { IconButton } from '../IconButton/index.js'
import { colors } from '../../utils/colors.js'

type TextInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  label?: string
  prefix?: string
  leadIcon?: IconProps['variant']
  description?: string
  error?: string
  maxLength?: number
  clearable?: boolean
}

function TextInput({
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  disabled,
  prefix,
  leadIcon,
  clearable,
  maxLength,
}: TextInputProps) {
  const [focus, setFocus] = useState(false)
  const length = typeof value !== 'string' ? 0 : value.length
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
      }}
    >
      {label && (
        <Text variant="subtext-regular" color="neutral60">
          {label}
        </Text>
      )}
      <div
        style={{
          position: 'relative',
          height: 36,
          gap: 4,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 8px',
          borderRadius: radius[8],
          border: `1px solid ${colors.neutral20Adjusted}`,
          color: colors.neutral60,
          outline: 'none',
          ...(focus &&
            !disabled && {
              background: colors.neutralInverted100,
              border: `1px solid ${colors.neutral100}`,
              outline: `4px solid ${colors.neutral20}`,
            }),
          ...(error && {
            border: `1px solid ${colors.red80}`,
            ...(focus &&
              !disabled && {
                background: colors.neutralInverted100,
                border: `1px solid ${colors.red100}`,
                outline: `4px solid ${colors.red60}`,
              }),
          }),
          ...(disabled && {
            color: colors.neutral20,
            background: colors.neutral5,
            border: `1px solid transparent`,
          }),
        }}
      >
        {leadIcon && (
          <span
            style={{
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon variant={leadIcon} />
          </span>
        )}
        {prefix && (
          <span style={{ marginRight: -4, pointerEvents: 'none' }}>
            <Text color="inherit">{prefix}</Text>
          </span>
        )}
        <input
          ref={ref}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          type="text"
          style={{
            width: '100%',
            height: '100%',
            color: length === 0 ? colors.neutral60 : colors.neutral100,
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 'normal',
            background: 'transparent',
            outline: 'none',
            border: 'none',
            padding: 0,
            ...(disabled && {
              cursor: 'not-allowed',
            }),
          }}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
        />
        {clearable && length !== 0 && (
          <IconButton
            size="small"
            variant="close"
            onClick={() => {
              onChange('')
            }}
          />
        )}
        {focus && maxLength && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: -5,
              padding: '4px 6px',
              borderRadius: radius[4],
              background: colors.neutral100,
              color: colors.neutralInverted100,
              transform: 'translateY(100%)',
              ...(error && {
                background: colors.red100,
                color: colors.neutral100,
              }),
            }}
          >
            <Text
              color="inherit"
              variant="subtext-medium"
            >{`${length}/${maxLength}`}</Text>
          </div>
        )}
      </div>
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: colors.red100,
          }}
        >
          <Icon variant="error-filled" />
          <Text color="inherit" variant="display-medium">
            {error}
          </Text>
        </div>
      )}
      {description && (
        <Text variant="display-regular" color="neutral60">
          {description}
        </Text>
      )}
    </div>
  )
}

export type { TextInputProps }
export { TextInput }
