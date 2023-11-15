import React, { useState, ReactNode } from 'react'
import { color } from '../../varsUtilities'
import { IconClose } from '../../icons'
import { Badge, BadgeProps, Text } from '../../components'
import { Style, styled } from 'inlines'
import { useControllableState } from '../../hooks/useControllableState'

export type TextInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  disabled?: boolean
  placeholder?: ReactNode
  prefix?: BadgeProps
  suffix?: BadgeProps
  icon?: React.ReactNode
  style?: Style
  afterIcon?: React.ReactNode
  clearButton?: boolean
  error?: boolean
  message?: ReactNode
  password?: boolean
  maxLength?: number
  autoFocus?: boolean
}

export function TextInput({
  prefix,
  suffix,
  icon,
  style,
  value: valueProp,
  defaultValue: defaultValueProp = '',
  onChange: onChangeProp,
  onFocus,
  onBlur,
  clearButton = false,
  afterIcon,
  disabled,
  placeholder,
  error,
  password,
  maxLength,
  autoFocus,
}: TextInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })

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
          border: `1px solid ${color(
            'inputBorder',
            error ? 'alert' : 'active',
            'default'
          )}`,
          boxShadow: error
            ? `0 0 0 2px ${color('inputBorder', 'alert', 'default')}`
            : `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
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
          setValue(e.target.value)
        }}
        onFocus={onFocus}
        onBlur={(e) => onBlur?.(e.target.value)}
        style={{
          width: '100%',
          height: 38,
          appearance: 'none',
          background: 'transparent',
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 400,
          textOverflow: 'ellipsis',
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
        type={password ? 'password' : 'inherit'}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
      {suffix && <Badge {...suffix} />}
      {(clearButton || afterIcon) && (
        <div style={{ flexShrink: 0 }}>
          {clearButton && value ? (
            <IconClose
              onClick={() => {
                setValue('')
              }}
            />
          ) : (
            afterIcon
          )}
        </div>
      )}
      {maxLength && value.length >= maxLength - 5 && (
        <Text
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            transform: 'translateY(100%)',
            fontSize: 12,
          }}
        >
          {value.length}/{maxLength}
        </Text>
      )}
    </styled.div>
  )
}
