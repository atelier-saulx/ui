import React, { useState } from 'react'
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
  disabled?: boolean
}

export type SelectInputProps = SelectInputOwnProps

export function SelectInput({
  options,
  beforeIcon,
  disabled,
}: SelectInputProps) {
  const [open, setOpen] = useState(false)

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
        backgroundColor: color('background', 'default', 'surface'),
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
        ...(disabled
          ? {
              opacity: '50%',
            }
          : {}),
      }}
    >
      {beforeIcon && <div style={{ flexShrink: 0 }}>{beforeIcon}</div>}
      <styled.button
        style={{
          width: '100%',
          height: '100%',
          appearance: 'none',
          border: 'none',
          background: 'transparent',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: 0,
          textAlign: 'left',
          color: color('content', 'default', 'primary'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:focus': {
            outline: 'none',
          },
        }}
        onClick={() => {
          if (disabled) return

          setOpen(true)
        }}
      >
        <div>todo asdasd asdasd </div>
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 8,
          }}
        >
          <IconChevronDownSmall />
        </div>
      </styled.button>

      {open && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 48,
            background: 'pink',
          }}
        >
          {options.map((option) => (
            <div key={option.value} onClick={() => {}}>{option.label}</div>
          ))}
        </div>
      )}
    </styled.div>
  )
}
