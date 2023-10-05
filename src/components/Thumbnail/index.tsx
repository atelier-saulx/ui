import React, { FC, ReactNode } from 'react'
import { Text } from '../Text'
import { Style, styled } from 'inlines'
import {
  ColorNonSemanticBackgroundColors,
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticContentColors,
} from '../../varsTypes'
import {
  border,
  color as genColor,
  boxShadow,
  colorHash,
} from '../../varsUtilities'
import { ClickHandler } from '../../types'
import { Center } from '../Styled'

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

type ThumbnailProps = {
  size?: 'small' | 'medium' | 'large'
  src?: string
  icon?: ReactNode
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  style?: Style
  label?: string // If no color is provided will use this by default
  outline?: boolean
  counter?: number
  light?: boolean
  onClick?: ClickHandler
  autoColor?: boolean
}

const CounterBadge = styled('div', {
  width: 20,
  height: 20,
  borderRadius: 10,
  border: border(1),
  backgroundColor: genColor('background', 'default'),
  position: 'absolute',
  right: -10,
  top: -10,
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: boxShadow('small'),
})

export const Thumbnail: FC<ThumbnailProps> = ({
  size = 'medium',
  src,
  color,
  icon,
  style,
  label,
  outline,
  onClick,
  light,
  counter,
  autoColor,
}) => {
  if (autoColor && !color) {
    color = colorHash('nonSemanticBackground', label ?? src)
  } else if (!color) {
    color = 'brand'
  }

  const calcedSize = size === 'small' ? 40 : size === 'large' ? 80 : 60

  const contentColor: ColorContentColors | ColorNonSemanticContentColors = light
    ? color === 'neutral'
      ? 'default'
      : color
    : COLORGUARD.includes(color)
    ? color === 'warning' || color === 'default'
      ? 'default'
      : 'inverted'
    : color === 'orange'
    ? 'grey'
    : 'white'

  const labelNode = label ? (
    <Text
      weight={size === 'small' ? 'strong' : 'medium'}
      color="inherit"
      selectable="none"
      size={size === 'small' ? 14 : size === 'large' ? 32 : 24}
    >
      {label.length > 1
        ? label[0].toUpperCase() + label[1].toUpperCase()
        : label}
    </Text>
  ) : null

  const backgroundColor = genColor(
    COLORGUARD.includes(color) ? 'background' : 'nonSemanticBackground',
    color,
    light ? 'muted' : 'strong'
  )

  return (
    <styled.div
      style={{
        backgroundColor,
        borderRadius: size === 'small' ? 6 : 8,
        color: genColor(
          COLORGUARD.includes(color) ? 'content' : 'nonSemanticContent',
          contentColor,
          'primary'
        ),
        border: outline
          ? `1px solid ${genColor(
              COLORGUARD.includes(color)
                ? 'background'
                : 'nonSemanticBackground',
              color,
              light ? 'strong' : 'muted'
            )}`
          : 'none',
        display: 'flex',
        cursor: onClick ? 'pointer' : 'default',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: src ? `url(${src})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        position: 'relative',
        minWidth: calcedSize,
        width: calcedSize,
        height: calcedSize,
        ...style,
      }}
      onClick={onClick}
    >
      {counter && (
        <CounterBadge>
          <Text selectable="none" weight="strong">
            {counter}
          </Text>
        </CounterBadge>
      )}
      {label && src ? (
        <Center
          style={{
            borderRadius: 8,
            width: '100%',
            height: '100%',
          }}
        >
          {labelNode}
        </Center>
      ) : label ? (
        labelNode
      ) : icon ? (
        icon
      ) : null}
    </styled.div>
  )
}
