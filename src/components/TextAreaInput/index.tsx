import { useRef, useState } from 'react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { Icon } from '../Icon/index.js'
import { radius } from '../../utils/radius.js'

type TextAreaInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  description?: string
  maxLength?: number
  rows?: 'adaptive' | number
  disabled?: boolean
}

function TextAreaInput({
  value,
  onChange,
  rows = 'adaptive',
  label,
  error,
  description,
  maxLength,
  placeholder,
  disabled,
}: TextAreaInputProps) {
  const [focus, setFocus] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const length = typeof value !== 'string' ? 0 : value.length

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
      <div style={{ position: 'relative', display: 'flex' }}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          style={{
            resize: 'none',
            color: length === 0 ? colors.neutral60 : colors.neutral100,
            borderRadius: radius[8],
            padding: '6px 8px',
            outline: 'none',
            width: '100%',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 'normal',
            ...(rows === 'adaptive' && {
              fieldSizing: 'content',
              minHeight: 68,
              maxHeight: 256,
            }),
            background: 'transparent',
            border: `1px solid ${colors.neutral20Adjusted}`,
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
          rows={rows === 'adaptive' ? undefined : rows}
        />
        {focus && maxLength && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: -4,
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

export type { TextAreaInputProps }
export { TextAreaInput }
