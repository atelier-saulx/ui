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
  // isActionColor

  return (
    <styled.div
      onClick={onClick}
      style={{
        ...style,
        display: 'flex',
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: onClick ? 4 : 0,
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
      }}
    >
      {children}
    </styled.div>
  )
}
