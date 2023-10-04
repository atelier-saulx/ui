import React, { FC, ReactNode } from 'react'
import { ColorContentColors } from '../../varsTypes'
import { ClickHandler } from '../../types'
import { styled, Style } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { NumberFormat } from '@based/pretty-number'
import { useTextFormat } from '../../hooks'
import { DateFormat } from '@based/pretty-date'

type TextProps = {
  children: ReactNode
  color?: ColorContentColors | 'inherit'
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48
  style?: Style
  light?: boolean
  weight?: 'strong' | 'medium' | 'normal'
  onClick?: ClickHandler
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'none'
  align?: 'left' | 'center' | 'right'
  truncate?: number | boolean
  underline?: boolean
  selectable?:
    | 'none'
    | 'auto'
    | 'text'
    | 'contain'
    | 'all'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
  valueFormat?: NumberFormat | DateFormat
}

export const Text: FC<TextProps> = ({
  children,
  color = 'default',
  size = 14,
  style,
  light,
  underline,
  weight = 'normal',
  valueFormat,
  onClick,
  transform = 'none',
  align = 'left',
  truncate = false,
  selectable = 'text',
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

  const parsedColor =
    color === 'inherit'
      ? 'inherit'
      : genColor('content', color, light ? 'secondary' : 'primary')

  if (onClick) {
    selectable = 'none'
  }

  const parsedChildren = useTextFormat(children, valueFormat)

  return (
    <styled.div
      onClick={onClick}
      style={{
        display: truncate ? '-webkit-box' : 'block',
        color: parsedColor,
        cursor: onClick ? 'pointer' : null,
        fontSize: size,
        fontFamily:
          weight === 'strong'
            ? 'Inter-SemiBold'
            : weight === 'medium'
            ? 'Inter-Medium'
            : 'Inter-Regular',
        lineHeight: newLineHeight,
        textTransform: transform,
        textAlign: align,
        overflow: truncate ? 'hidden' : 'visible',
        userSelect: selectable,
        WebkitUserSelect: selectable,
        WebkitLineClamp:
          typeof truncate === 'number' ? truncate : truncate ? 1 : null,
        WebkitBoxOrient: 'vertical',
        '& b': {
          fontFamily: 'Inter-SemiBold',
        },
        ...style,
      }}
    >
      {parsedChildren}
      {underline ? (
        <styled.div
          style={{
            width: '100%',
            marginBottom: 3,
            marginTop: -4,
            borderBottom: `${1}px solid ${parsedColor}`,
          }}
        />
      ) : null}
    </styled.div>
  )
}
