import React, { Fragment } from 'react'
import {
  Style,
  styled,
  color,
  Badge,
  IconClose,
  BadgeProps,
  IconAlert,
} from '../..'

export type TextInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  label?: string
  error?: string
  prefix?: BadgeProps
  suffix?: BadgeProps
  icon?: React.ReactNode
  style?: Style
  afterIcon?: React.ReactNode
  clearButton?: boolean
}

export function TextInput({
  prefix,
  suffix,
  icon,
  style,
  value,
  onChange,
  clearButton,
  afterIcon,
  disabled,
  placeholder,
  label,
  error,
}: TextInputProps) {
  const Wrapper = label ? 'label' : error ? 'div' : Fragment
  const wrapperProps = label || error ? { style: {} } : {}

  return (
    <Wrapper {...wrapperProps}>
      {label && (
        <div
          style={{
            marginBottom: 8,
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
            color: color('content', 'default', 'primary'),
          }}
        >
          {label}
        </div>
      )}
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
            {clearButton ? (
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
      {error && (
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            color: color('content', 'negative', 'primary'),
          }}
        >
          <IconAlert />
          <div
            style={{
              marginLeft: 5,
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            {error}
          </div>
        </div>
      )}
    </Wrapper>
  )
}
