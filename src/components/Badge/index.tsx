import React, { FC, SyntheticEvent } from 'react'
import { ColorActionColors } from '../../varsTypes'
import { styled, Style } from 'inlines'

export type BadgeProps = {
  color?: ColorActionColors
  img?: string
  label?: string
  onClick?: (e: SyntheticEvent) => void
  style?: Style
  emphasis?: 'low' | 'high'
}

export const Badge: FC<BadgeProps> = () => {
  return styled
}
