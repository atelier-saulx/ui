import React, { FC, ReactNode } from 'react'
import { ColorContentColors } from '../varsTypes'
import { Style, styled } from 'inlines'
import { ClickHandler } from '../types'
import { color as genColor } from '../varsUtilities'

export type IconProps = {
  color?: ColorContentColors | 'inherit'
  style?: Style
  onClick?: ClickHandler
  children?: ReactNode
}

export const Icon: FC<IconProps> = ({ color, style, children, onClick }) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        display: 'flex',
        transition: 'transform 0.1s',
        cursor: onClick ? 'pointer' : 'inherit',
        borderRadius: onClick ? 4 : 0,
        '&:active': onClick
          ? {
              transform: 'scale(0.95)',
            }
          : null,
        '&:hover': onClick
          ? {
              color: genColor(
                'action',
                color === 'warning' || color === 'negative'
                  ? 'alert'
                  : 'primary',
                'hover'
              ),
            }
          : null,
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
