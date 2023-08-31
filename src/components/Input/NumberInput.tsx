import React, { useState, FC, ReactNode } from 'react'
import {
  styled,
  Style,
  color,
  Badge,
  IconClose,
  IconSmallArrowheadDownSmall,
} from '../..'

// @ts-ignore
import { BadgeProps } from '../types'

export type NumberInputOwnProps = {
  clearButton?: boolean
  icon?: ReactNode
  afterIcon?: ReactNode
  prefix?: BadgeProps
  style: Style
  suffix?: BadgeProps
}

export type NumberInputProps = NumberInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix'>

export const NumberInput: FC<NumberInputProps> = ({
  prefix,
  suffix,
  icon,
  afterIcon,
  style,
  clearButton,
  ...props
}) => {
  const [isEmpty, setIsEmpty] = useState(!(props.value || props.defaultValue))
  const [value, setValue] = useState((props.value || props.defaultValue) ?? '')

  return (
    <styled.div
      style={{
        height: 40,
        width: '100%',
        padding: '0 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontSize: '14px',
        lineHeight: '24px',
        boxSizing: 'border-box',
        color: color('content', 'default', isEmpty ? 'secondary' : 'primary'),
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
        ...style,
      }}
    >
      {icon && <styled.div style={{ flexShrink: 0 }}>{icon}</styled.div>}
      {prefix && <Badge {...prefix}>{prefix}</Badge>}
      <styled.input
        value={value}
        onChange={(e) => {
          setIsEmpty(e.target.value === '')
          setValue(e.target.value)
          props?.onChange?.(e)
        }}
        type="number"
        style={{
          width: '100%',
          appearance: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          border: 'none',
          padding: 0,
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          '&:focus': {
            outline: 'none',
          },
          '&::-webkit-inner-spin-button': {
            opacity: 0,
          },
        }}
        {...props}
      />
      <styled.div>
        <styled.div
          style={{
            alignItems: 'center',
            border: `1px solid ${color(
              'inputBorder',
              'neutralNormal',
              'default'
            )}`,
            borderRadius: 4,
            display: 'flex',
            maxHeight: 12,
            marginBottom: 1,
            '&:hover': {
              backgroundColor: color('action', 'system', 'hover'),
            },
          }}
          onClick={() => setValue((prev) => +prev + 1)}
        >
          <IconSmallArrowheadDownSmall style={{ transform: 'scaleY(-1)' }} />
        </styled.div>
        <styled.div
          style={{
            alignItems: 'center',
            border: `1px solid ${color(
              'inputBorder',
              'neutralNormal',
              'default'
            )}`,
            borderRadius: 4,
            display: 'flex',
            maxHeight: 12,
            marginTop: 1,
            '&:hover': {
              backgroundColor: color('action', 'system', 'hover'),
            },
          }}
          onClick={() => setValue((prev) => +prev - 1)}
        >
          <IconSmallArrowheadDownSmall />
        </styled.div>
      </styled.div>
      {suffix && <Badge {...suffix}>{suffix}</Badge>}
      {clearButton ? (
        <IconClose
          onClick={() => {
            setValue('')
          }}
        />
      ) : (
        afterIcon && (
          <styled.div style={{ flexShrink: 0 }}>{afterIcon}</styled.div>
        )
      )}
    </styled.div>
  )
}
