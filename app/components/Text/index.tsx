import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../../src'
import { ColorContentColors } from '../../../src/varsTypes'

type TextProps = {
  children: string
  color?: ColorContentColors | 'inherit'
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48
  style?: Style
  weight?: 'strong' | 'medium' | 'normal'
}

export const Text: FC<TextProps> = ({
  children,
  color = genColor('content', 'default', 'primary'),
  size = 12,
  style,
  weight = 'normal',
}) => {
  return (
    <styled.div
      style={{ color: color, fontSize: size, fontWeight: 400, ...style }}
    >
      {children}
    </styled.div>
  )
}
