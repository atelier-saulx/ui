import React, { useState } from 'react'
import { Style, styled, color, Badge, IconClose, BadgeProps } from '~'

export type MultilineInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: React.ReactNode
  prefix?: BadgeProps
  suffix?: BadgeProps
  icon?: React.ReactNode
  style?: Style
  afterIcon?: React.ReactNode
  clearButton?: boolean
  error?: string
  password?: boolean
  maxLength?: number
}

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

export function MultilineInput({
  prefix,
  suffix,
  icon,
  style,
  value,
  onChange,
  clearButton = false,
  afterIcon,
  disabled,
  placeholder,
  error,
  password,
  maxLength,
}: MultilineInputProps) {
  const [currentLength, setCurrentLength] = useState(0)

  return (
    <styled.div
      style={{
        position: 'relative',
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
      <styled.textarea
        ref={resize}
        value={value}
        onChange={(e) => {
          setCurrentLength(e.target.value.length)
          onChange(e.target.value)
        }}
        style={{
          fontFamily: 'Inter-Regular',
          resize: 'none',
          width: '100%',
          height: 38,
          appearance: 'none',
          background: 'transparent',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 400,
          border: 'none',
          paddingTop: 12,
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        placeholder={placeholder}
        type={password ? 'password' : 'inherit'}
        maxLength={maxLength}
        onInput={({ target }) => resize(target)}
      />
      {suffix && <Badge {...suffix} />}
      {(clearButton || afterIcon) && (
        <div
          style={{ flexShrink: 0, position: 'absolute', bottom: 4, right: 4 }}
        >
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
      {maxLength && currentLength >= maxLength - 5 && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            transform: 'translateY(100%)',
            fontSize: 12,
          }}
        >
          {currentLength}/{maxLength}
        </div>
      )}
    </styled.div>
  )
}
