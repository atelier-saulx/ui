import React from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { IconChevronDownSmall } from '../..'

export type SelectInputOption = {
  label: string
  value: string
  beforeIcon?: React.ReactNode
  afterIcon?: React.ReactNode
}

export type SelectInputOwnProps = {
  options: SelectInputOption[]
  beforeIcon?: React.ReactNode
}

export type SelectInputProps = SelectInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<'select'>, 'style'>

export function SelectInput({
  options,
  beforeIcon,
  ...props
}: SelectInputProps) {
  return (
    <styled.div
      style={{
        position: 'relative',
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
        ...(props.disabled
          ? {
              opacity: '50%',
            }
          : {}),
      }}
    >
      {beforeIcon && <div style={{ flexShrink: 0 }}>{beforeIcon}</div>}
      <styled.select
        style={{
          width: '100%',
          height: '100%',
          appearance: 'none',
          border: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          paddingRight: 28,
          color: color('content', 'default', 'primary'),
          '&::placeholder': {
            color: color('content', 'default', 'secondary'),
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </styled.select>
      <div
        style={{
          flexShrink: 0,
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <IconChevronDownSmall />
      </div>
    </styled.div>
  )
}
