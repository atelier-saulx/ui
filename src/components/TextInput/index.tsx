import { useRef, useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { IconButton } from '../IconButton/index.js'

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
        <Text variant="subtext-regular" color="neutral-60">
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
          borderRadius: borderRadius(8),
          border: `1px solid ${color('neutral-20-adjusted')}`,
          color: color('neutral-60'),
          outline: 'none',
          ...(focus &&
            !disabled && {
              background: color('neutral-inverted-100'),
              border: `1px solid ${color('neutral-100')}`,
              outline: `4px solid ${color('neutral-20')}`,
            }),
          ...(error && {
            border: `1px solid ${color('destructive-80')}`,
            ...(focus &&
              !disabled && {
                background: color('neutral-inverted-100'),
                border: `1px solid ${color('destructive-100')}`,
                outline: `4px solid ${color('destructive-60')}`,
              }),
          }),
          ...(disabled && {
            color: color('neutral-20'),
            background: color('neutral-5'),
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
            color: length === 0 ? color('neutral-60') : color('neutral-100'),
            fontFamily: 'var(--font-sans)',
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
              borderRadius: borderRadius(4),
              background: color('neutral-100'),
              color: color('neutral-inverted-100'),
              transform: 'translateY(100%)',
              ...(error && {
                background: color('destructive-100'),
                color: color('neutral-100'),
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
            color: color('destructive-100'),
          }}
        >
          <Icon variant="error-filled" />
          <Text color="inherit" variant="display-medium">
            {error}
          </Text>
        </div>
      )}
      {description && (
        <Text variant="display-regular" color="neutral-60">
          {description}
        </Text>
      )}
    </div>
  )
}

export type { TextInputProps }
export { TextInput }
