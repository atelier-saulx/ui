import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { ColorContentColors } from '../../../src/varsTypes'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'

type ButtonProps = {
  // TODO add IconProps here
  afterIcon?: any
  beforeIcon?: any
  color?: ColorContentColors
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
  color,
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
  return (
    <styled.div
      onClick={disabled ? null : onClick}
      style={{
        alignItems: 'center',
        backgroundColor: ghost ? 'transparent' : 'pink',
        borderRadius: size === 'small' ? '4px' : '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        padding:
          size === 'small'
            ? '2px 16px'
            : size === 'medium'
            ? '6px 16px'
            : '10px 16px',
        width: 'fit-content',
        ...style,
      }}
    >
      {beforeIcon && (
        <styled.div style={{ marginRight: 8 }}>
          {renderOrCreateElement(beforeIcon)}
        </styled.div>
      )}
      {label}
      {afterIcon && (
        <styled.div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(afterIcon)}
        </styled.div>
      )}
    </styled.div>
  )
}
