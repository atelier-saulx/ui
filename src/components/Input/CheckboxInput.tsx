import React from 'react'
import { IconCheckSmall, IconMinus, Style, color, styled } from '../..'

export type CheckboxInputProps = {
  title: string
  description?: string
  value: boolean
  onChange: (newValue: boolean) => void
  disabled?: boolean
  intermediate?: boolean
  style?: Style
}

export function CheckboxInput({
  value,
  onChange,
  disabled,
  title,
  style,
  description,
  intermediate,
}: CheckboxInputProps) {
  return (
    <styled.label
      className="checkbox-group"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
          opacity: disabled ? '40%' : '100%',
        }}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            if (disabled || intermediate) return

            onChange(e.target.checked)
          }}
          disabled={disabled}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        />
        <styled.div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            boxSizing: 'border-box',
            background: intermediate
              ? color('action', 'primary', 'normal')
              : value
              ? color('action', 'primary', 'normal')
              : 'transparent',
            border:
              intermediate || value
                ? 'transparent'
                : `1px solid ${color(
                    'inputBorder',
                    'neutralNormal',
                    'default'
                  )}`,
            color: color('content', 'inverted', 'primary'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '.checkbox-group:hover &': {
              borderColor: `${color(
                'inputBorder',
                'neutralHover',
                'default'
              )} !important`,
              background: `${
                intermediate
                  ? color('action', 'primary', 'hover')
                  : value
                  ? color('action', 'primary', 'hover')
                  : 'transparent'
              } !important`,
            },
            '.checkbox-group:focus-within &': {
              boxShadow: `0 0 0 1px white,0 0 0 3px ${color(
                'border',
                'brand',
                'subtle'
              )}`,
            },
          }}
        >
          {intermediate ? <IconMinus /> : value ? <IconCheckSmall /> : null}
        </styled.div>
      </div>
      <div style={{ marginLeft: 12 }}>
        <div
          style={{
            lineHeight: '24px',
            fontSize: 14,
            fontWeight: 500,
            color: color('content', 'default', 'primary'),
          }}
        >
          {title}
        </div>
        <div
          style={{
            lineHeight: '24px',
            fontSize: 14,
            fontWeight: 500,
            color: color('content', 'default', 'secondary'),
          }}
        >
          {description}
        </div>
      </div>
    </styled.label>
  )
}
