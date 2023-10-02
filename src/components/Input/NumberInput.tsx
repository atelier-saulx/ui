import React, { useState, FC, ReactNode } from 'react'
import { IconClose, IconSmallArrowheadDownSmall } from '../../icons'
import { Badge, BadgeProps } from '../Badge'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'

export type NumberInputOwnProps = {
  value: number
  clearButton?: boolean
  icon?: ReactNode
  afterIcon?: ReactNode
  prefix?: BadgeProps
  suffix?: BadgeProps
  style?: Style
  onChange: (value: number) => void
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  placeholder?: ReactNode
  error?: boolean
  message?: ReactNode
  min: number
  max: number
}

export type NumberInputProps = NumberInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix'>

//TODO onblur do min max check

export const NumberInput: FC<NumberInputProps> = ({
  value,
  min,
  max,
  prefix,
  suffix,
  onChange,
  icon,
  afterIcon,
  style,
  clearButton,
  error,
  disabled,
  onFocus,
  onBlur,
  placeholder,
  ...props
}) => {
  // const handleBlur = () => {
  //   console.log('hasdasdas', value)
  //   if (min && value < min) {
  //     onChange(min)
  //   }
  //   if (max && value > max) {
  //     onChange(max)
  //   }
  //   onBlur?.()
  // }

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
          value === null ? 'secondary' : 'primary'
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
          onChange(e.target.value)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        // onBlur={() => handleBlur()}
        min={min}
        max={max}
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
        type="number"
        {...props}
      />
      {suffix && <Badge {...suffix} />}
      {(clearButton || afterIcon) && (
        <div style={{ flexShrink: 0 }}>
          {clearButton && value ? (
            <IconClose
              onClick={() => {
                onChange(0)
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
