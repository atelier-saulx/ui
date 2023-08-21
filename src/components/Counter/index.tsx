import React, { FC } from 'react'
import { CounterProps } from '../types'
import { Center } from '../Styled'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
} from '../../varsTypes'
import { color as genColor } from '../../../src'
import { isSemanticColor } from '../../utils/isSemanticColor'
import { Text } from '../Text'

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
      : isSemanticColor(color)
      ? color === 'warning'
        ? 'default'
        : 'inverted'
      : color === 'orange'
      ? 'grey'
      : 'white'

  return (
    <Center
      onClick={onClick}
      style={{
        border: color === 'default' ? '1px solid' : undefined,
        borderColor: genColor(
          'nonSemanticBorder',
          'grey',
          subtle ? 'subtle' : 'strong'
        ),
        backgroundColor: genColor(
          isSemanticColor(color) ? 'background' : 'nonSemanticBackground',
          color,
          subtle ? 'muted' : 'strong'
        ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                contentColor,
                'primary'
              ),
        borderRadius: '16px',
        minWidth: '24px',
        width: 'fit-content',
        padding: '2px 6px',
        maxHeight: '24px',
        height: '24px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Text style={{ color: 'inherit' }}>{label}</Text>
    </Center>
  )
}
