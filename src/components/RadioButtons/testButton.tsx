import React, { FC } from 'react'
import { styled } from 'inlines'
import { color as genColor } from '../../../src'
import { RadioButtonProps } from '../types'

export const TestButton: FC<RadioButtonProps> = ({
  warning,
  disabled,
  active,
  onClick,
  value,
}) => {
  console.log(value)

  return (
    <styled.input
      value={value}
      checked={active}
      onChange={onClick}
      type="radio"
      disabled={disabled}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: 20,
        height: 20,
        borderRadius: '50%',
        marginRight: 12,
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: genColor(
          'action',
          warning ? 'alert' : 'neutral',
          warning ? 'normal' : 'subtleNormal'
        ),
        '&:hover': {
          borderColor: genColor(
            'action',
            warning ? 'alert' : 'neutral',
            warning ? 'hover' : 'subtleHover'
          ),
        },
        '&:focus': {
          outline: '3px solid',
          outlineColor: genColor('action', 'primary', 'selected'),

          outlineOffset: '1px',
        },
        '&:checked': {
          backgroundColor: genColor('action', 'primary', 'normal'),
          borderColor: 'transparent',
          '&:hover': {
            backgroundColor: genColor('action', 'primary', 'hover'),
          },
          '&:before': {
            backgroundColor: genColor('action', 'inverted', 'normal'),

            width: '6px',
            height: '6px',
            borderRadius: '5px',
            content: `''`,
            display: 'block',
            //   backgroundColor: color('background'),
          },
        },
        opacity: disabled ? 0.4 : 1,
      }}
    />
  )
}
