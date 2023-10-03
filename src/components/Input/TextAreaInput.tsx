import React from 'react'
import { color } from '../../varsUtilities'
import { Text } from '..'
import { Style, styled } from 'inlines'
import { useControllableState } from 'src/hooks/useControllableState'

export type TextAreaInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  icon?: React.ReactNode
  style?: Style
  error?: boolean
  maxLength?: number
}

export function TextAreaInput({
  style,
  value: valueProp,
  defaultValue: defaultValueProp = '',
  onChange: onChangeProp,
  disabled,
  placeholder,
  error,
  maxLength,
}: TextAreaInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })

  return (
    <styled.div
      data-value={value}
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'grid',
        width: '100%',
        '&::after': {
          width: '100%',
          content: `attr(data-value) " "`,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          visibility: 'hidden',
          gridArea: '1 / 1 / 2 / 2',
          border: '1px solid transparent',
          padding: '6px 12px',
          fontSize: '14px',
          lineHeight: '24px',
          fontFamily: 'Inter-Regular',
        },
      }}
    >
      <styled.textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'none',
          overflow: 'hidden',
          gridArea: '1 / 1 / 2 / 2',
          padding: '6px 12px',
          fontSize: '14px',
          lineHeight: '24px',
          fontFamily: 'Inter-Regular',
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          borderRadius: 8,
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
          '&:focus': {
            border: `1px solid ${color(
              'inputBorder',
              error ? 'alert' : 'active',
              'default'
            )}`,
            boxShadow: error
              ? `0 0 0 2px ${color('inputBorder', 'alert', 'default')}`
              : `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
          },
        }}
      />
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
