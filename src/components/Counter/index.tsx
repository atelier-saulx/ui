import React, { FC } from 'react'
import { CounterProps } from '../types'
import { Center } from '../Styled'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
} from '../../varsTypes'
import { color as genColor } from '../../../src'

const COLORGUARD = [
  'default',
  'inverted',
  'neutral',
  'informative',
  'positive',
  'warning',
  'negative',
  'brand',
]

// color?: ColorBackgroundColors
// label?: number
// onClick?: () => void
// style?: Style
// subtle?: boolean

export const Counter: FC<CounterProps> = ({
  color = 'default',
  label,
  onClick,
  style,
  subtle,
}) => {
  const contentColor: ColorContentColors | ColorNonSemanticContentColors =
    subtle
      ? color === 'neutral'
        ? 'default'
        : color
      : COLORGUARD.includes(color)
      ? color === 'warning'
        ? 'default'
        : 'inverted'
      : color === 'orange'
      ? 'grey'
      : 'white'

  return (
    <Center
      style={{
        // display: 'inline-flex',
        border: color === 'default' ? '1px solid' : undefined,
        borderColor: genColor(
          'nonSemanticBorder',
          'grey',
          subtle ? 'subtle' : 'strong'
        ),
        backgroundColor: genColor(
          COLORGUARD.includes(color) ? 'background' : 'nonSemanticBackground',
          color,
          subtle ? 'muted' : 'strong'
        ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                COLORGUARD.includes(color) ? 'content' : 'nonSemanticContent',
                contentColor,
                'primary'
              ),
        borderRadius: '16px',
        minWidth: 'fit-content',
        width: 'fit-content',
        padding: '2px 6px',
        maxHeight: '24px',
        height: '24px',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      24
    </Center>
  )
}
