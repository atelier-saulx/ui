import { useRef, useState } from 'react'
import { radius } from '../../utils/radius.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { IconButton } from '../IconButton/index.js'
import { colors } from '../../utils/colors.js'
import { KeyHint, KeyHintProps } from '../KeyHint/index.js'
import { Badge } from '../Badge/index.js'

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
  suffix?: string
  keyHint?: KeyHintProps['hint']
  type?: 'text' | 'email' | 'password'
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
  suffix,
  keyHint,
  type = 'text',
}: TextInputProps) {
  const [focus, setFocus] = useState(false)
  const length = typeof value !== 'string' ? 0 : value.length
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 8,
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
          type={type}
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
        {suffix && (
          <span style={{ marginLeft: -4, pointerEvents: 'none' }}>
            <Text color="inherit">{suffix}</Text>
          </span>
        )}
        {keyHint && <KeyHint hint={keyHint} color="neutral" />}
        {clearable && length !== 0 && (
          <IconButton
            size="small"
            icon="close"
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
              transform: 'translateY(100%)',
              display: 'flex',
            }}
          >
            <Badge
              color={error ? 'red-fill' : 'neutral-fill'}
            >{`${length}/${maxLength}`}</Badge>
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
