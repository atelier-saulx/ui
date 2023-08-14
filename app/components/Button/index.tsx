import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { ColorActionColors, ColorContentColors } from '../../../src/varsTypes'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'
import { IconChevronDownSmall, color as genColor } from '../../../src'

type ButtonProps = {
  // TODO add IconProps here
  afterIcon?: any
  beforeIcon?: any
  color?: ColorActionColors
  disabled?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  label?: string
  loading?: boolean
  onClick?: () => void
  size?: 'large' | 'medium' | 'small'
  style?: Style
  subtle?: boolean
}

// TODO states
// hover, active, focus, selected

export const Button: FC<ButtonProps> = ({
  afterIcon,
  beforeIcon,
  color = 'primary',
  disabled,
  dropdownIndicator,
  ghost,
  label,
  loading,
  onClick,
  size = 'large',
  style,
  subtle,
}) => {
  // todo Comp Text Inside

  IconChevronDownSmall

  return (
    <styled.div
      onClick={disabled ? null : onClick}
      style={{
        alignItems: 'center',
        backgroundColor: ghost
          ? 'transparent'
          : genColor('action', color, 'normal'),
        borderRadius: size === 'small' ? '4px' : '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        opacity: disabled ? 0.4 : 1,
        padding:
          size === 'small'
            ? '2px 16px'
            : size === 'medium'
            ? '6px 16px'
            : '10px 16px',
        width: 'fit-content',
        '&:active': {
          backgroundColor: genColor('action', color, 'active'),
        },
        '&:focus': {
          backgroundColor: genColor('action', color, 'selected'),
          border: `1px solid ${genColor('content', 'inverted', 'primary')}`,
          boxShadow: `0px 0px 0px 2px ${genColor(
            'action',
            'primary',
            'normal'
          )}`,
        },
        '&:hover': {
          backgroundColor: genColor('action', color, 'hover'),
        },
        ...style,
      }}
    >
      {beforeIcon && (
        <styled.div style={{ marginRight: 8 }}>
          {renderOrCreateElement(beforeIcon, { color: 'inverted' })}
        </styled.div>
      )}
      {label}
      {afterIcon && (
        <styled.div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(afterIcon, { color: 'inverted' })}
        </styled.div>
      )}
      {dropdownIndicator && (
        <styled.div style={{ marginLeft: 12 }}>
          {renderOrCreateElement(IconChevronDownSmall, { color: 'inverted' })}
        </styled.div>
      )}
    </styled.div>
  )
}
