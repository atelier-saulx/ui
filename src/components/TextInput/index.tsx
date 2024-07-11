import { useRef, useState } from 'react'
import { borderRadius } from '../../utils/border.js'
import { color } from '../../utils/colors.js'
import { Icon, IconProps } from '../Icon/index.js'
import { Text } from '../Text/index.js'

// TODO add maxlength/char counter

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
}: TextInputProps) {
  const [focus, setFocus] = useState(false)
  const empty = typeof value !== 'string' || value.length === 0
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
          type="text"
          style={{
            width: '100%',
            height: '100%',
            color: empty ? color('neutral-60') : color('neutral-100'),
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
        {clearable && !empty && (
          <span
            tabIndex={0}
            style={{
              color: color('neutral-80'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              onChange('')
            }}
          >
            <Icon variant="close" />
          </span>
        )}
      </div>
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon
            style={{ color: color('destructive-100') }}
            variant="error-filled"
          />
          <Text color="destructive-100" variant="display-medium">
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
