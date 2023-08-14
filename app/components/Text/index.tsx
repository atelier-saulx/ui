import React, { FC, ReactNode } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../../src'
import { ColorContentColors } from '../../../src/varsTypes'

type TextProps = {
  children: ReactNode
  color?: ColorContentColors
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48
  style?: Style
  weight?: 'strong' | 'medium' | 'normal'
}

export const Text: FC<TextProps> = ({
  children,
  color = 'default',
  size = 12,
  style,
  weight = 'normal',
}) => {
  let newLineHeight =
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
      style={{
        color: genColor('content', color, 'primary'),
        fontSize: size,
        fontWeight: weight === 'strong' ? 600 : weight === 'medium' ? 500 : 400,
        lineHeight: newLineHeight,
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
