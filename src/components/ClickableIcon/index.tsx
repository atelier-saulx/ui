import React, { FC } from 'react'
import { ClickableIconProps } from '../types'
import { styled } from 'inlines'
import { renderOrCreateElement } from '../../utils/renderOrCreateElement'
import { color as genColor } from '../../../src'

export const ClickableIcon: FC<ClickableIconProps> = ({
  icon,
  onClick,
  size: propSize = 'large',
  style,
}) => {
  const size = propSize === 'large' ? '24px' : '16px'

  return (
    <styled.button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: propSize === 'large' ? '4px' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid red',
        color: genColor('content', 'default', 'primary'),
        '&:hover': {
          backgroundColor: genColor('action', 'ghost', 'hover'),
        },
        '&:active': {
          backgroundColor: genColor('action', 'ghost', 'active'),
        },
        // '&:focus': {
        //   backgroundColor: genColor('action', 'ghost', 'selected'),
        // },
        ...style,
      }}
    >
      {renderOrCreateElement(icon, {
        color: 'inherit',
      })}
    </styled.button>
  )
}
