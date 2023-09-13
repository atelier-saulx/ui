import React from 'react'
import { Style, styled, color, Badge, IconClose, BadgeProps } from '../..'

export type TextInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  prefix?: BadgeProps
  suffix?: BadgeProps
  icon?: React.ReactNode
  style?: Style
  afterIcon?: React.ReactNode
  clearButton?: boolean
  error?: string
}

export function TextInput({
  prefix,
  suffix,
  icon,
  style,
  value,
  onChange,
  clearButton = true,
  afterIcon,
  disabled,
  placeholder,
  error,
}: TextInputProps) {
  return (
    <styled.div
      style={{
        minHeight: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        boxSizing: 'border-box',
        color: color(
          'content',
          'default',
          value === '' ? 'secondary' : 'primary'
        ),
        border: `1px solid ${color(
          'inputBorder',
          error ? 'alert' : 'neutralNormal',
          'default'
        )}`,
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            error ? 'alert' : 'neutralHover',
            'default'
          )}`,
        },
        '&:focus-within': {
          border: `1px solid ${color('inputBorder', 'active', 'default')}`,
          boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
        },
        '& > * + *': {
          // px instead of raw number bc of https://github.com/atelier-saulx/inlines/issues/1
          marginLeft: '8px',
        },
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
        ...style,
      }}
    >
      {icon && <styled.div style={{ flexShrink: 0 }}>{icon}</styled.div>}
      {prefix && <Badge {...prefix} />}
      <styled.input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        style={{
          width: '100%',
          height: 38,
          appearance: 'none',
          background: 'transparent',
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 400,
          border: 'none',
          padding: 0,
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        placeholder={placeholder}
      />
      {suffix && <Badge {...suffix} />}
      {(clearButton || afterIcon) && (
        <div style={{ flexShrink: 0 }}>
          {clearButton && value ? (
            <IconClose
              onClick={() => {
                onChange('')
              }}
            />
          ) : (
            afterIcon
          )}
        </div>
      )}
    </styled.div>
  )
}
