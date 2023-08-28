import React, { FC, ReactNode } from 'react'
import {
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
  ColorNonSemanticContentColors,
  isSemanticColor,
  color as genColor,
  Text,
  Center,
  Style,
} from '../..'
import { ClickHandler } from '../../types'

export type CounterProps = {
  color?: Exclude<
    ColorBackgroundColors | ColorNonSemanticBackgroundColors,
    'default'
  >
  children?: ReactNode
  onClick?: ClickHandler
  style?: Style
  light?: boolean
}

export const Counter: FC<CounterProps> = ({
  color = 'default',
  children,
  onClick,
  style,
  light,
}) => {
  const contentColor: string = light
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
          light ? 'subtle' : 'strong'
        ),
        backgroundColor: genColor(
          isSemanticColor(color) ? 'background' : 'nonSemanticBackground',
          color as ColorBackgroundColors | ColorNonSemanticBackgroundColors,
          light ? 'muted' : 'strong'
        ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                contentColor as ColorContentColors,
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
      <Text style={{ color: 'inherit' }} weight="strong">
        {children}
      </Text>
    </Center>
  )
}
