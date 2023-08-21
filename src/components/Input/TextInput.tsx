import React from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { Badge } from '../Badge'
import { BadgeProps } from '../types'

export type TextInputOwnProps = {
  prefix?: BadgeProps
  suffix?: BadgeProps
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export type TextInputProps = TextInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'style' | 'prefix'>

export function TextInput({
  prefix,
  suffix,
  beforeIcon,
  afterIcon,
  ...props
}: TextInputProps) {
  return (
    <styled.div
      style={{
        height: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        fontSize: '14px',
        lineHeight: '24px',
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        '&:hover': {
          border: `1px solid ${color(
            'inputBorder',
            'neutralHover',
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
        ...(props.disabled
          ? {
              opacity: '50%',
            }
          : {}),
      }}
    >
      {beforeIcon && <div style={{ flexShrink: 0 }}>{beforeIcon}</div>}
      {prefix && <Badge {...prefix}>{prefix}</Badge>}
      <styled.input
        style={{
          width: '100%',
          appearance: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
        }}
        {...props}
      />
      {suffix && <Badge {...suffix}>{suffix}</Badge>}
      {afterIcon && <div style={{ flexShrink: 0 }}>{afterIcon}</div>}
    </styled.div>
  )
}
