import React, { FC, ReactNode } from 'react'
import { color as genColor, styled, Style, ColorContentColors } from '../../'
import { ClickHandler } from '../../types'

type TextProps = {
  children: ReactNode
  color?: ColorContentColors
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48
  style?: Style
  light?: boolean
  weight?: 'strong' | 'medium' | 'normal'
  onClick?: ClickHandler
}

export const Text: FC<TextProps> = ({
  children,
  color = 'default',
  size = 14,
  style,
  light,
  weight = 'normal',
  onClick,
}) => {
  const newLineHeight =
    size === 10
      ? '16px'
      : size === 12
      ? '20px'
      : size === 14
      ? '24px'
      : size === 16
      ? '28px'
      : size === 18
      ? '32px'
      : size === 24
      ? '36px'
      : size === 32
      ? '44px'
      : size === 40
      ? '56px'
      : size === 48
      ? '64px'
      : '16px'

  return (
    <styled.div
      onClick={onClick}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        color: genColor('content', color, light ? 'secondary' : 'primary'),
        fontSize: size,
        fontFamily:
          weight === 'strong'
            ? 'Inter-SemiBold'
            : weight === 'medium'
            ? 'Inter-Medium'
            : 'Inter-Regular',
        lineHeight: newLineHeight,
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
