import React, { FC } from 'react'
import { color as genColor } from '../../varsUtilities'
import { ColorActionColors } from '../../varsTypes'
import { styled } from 'inlines'

type RadioButtonProps = {
  disabled?: boolean
  color?: ColorActionColors
  active?: boolean
  onClick?: () => void
  value: any
}

export const RadioButton: FC<RadioButtonProps> = ({
  disabled,
  color,
  active,
  onClick,
  value,
}) => {
  return (
    <styled.div
      value={value}
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: active ? `5px solid` : `1px solid `,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: active
          ? genColor('action', color as ColorActionColors, 'normal')
          : genColor('inputBorder', 'neutralNormal', 'default'),
        '&:hover': {
          borderColor: active
            ? genColor('action', color as ColorActionColors, 'hover')
            : genColor('inputBorder', 'neutralNormal', 'default'),
        },
        '&:focus': {
          outline: '3px solid',
          outlineColor: genColor('action', 'primary', 'normal'),
          outlineOffset: '1px',
        },
      }}
    />
  )
}
