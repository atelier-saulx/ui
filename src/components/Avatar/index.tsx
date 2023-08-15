import React, { FC, SyntheticEvent, useState } from 'react'
import { styled, Style } from 'inlines'
import { ColorActionColors, ColorContentColors } from '../../../src/varsTypes'

import { color as genColor } from '../../../src'
import { Text } from '../Text'
import { Center } from '../Styled'

export type AvatarProps = {
  size?: 'large' | 'medium' | 'small'
  color?: ColorActionColors
  img?: string
  label?: string
  onClick?: (e: SyntheticEvent) => void
  style?: Style
  emphasis?: 'low' | 'high'
}
export const Avatar: FC<AvatarProps> = ({
  size: sizeProp = 'medium',
  emphasis = 'low',
  color = 'primary',
  img,
  label,
  onClick,
  style,
  ...rest
}) => {
  const size =
    sizeProp === 'large'
      ? 48
      : sizeProp === 'medium'
      ? 40
      : sizeProp === 'small'
      ? 32
      : sizeProp === 'XSMALL'
      ? 24
      : 20

  let contentColor: ColorContentColors =
    emphasis && color === 'alert'
      ? 'negative'
      : emphasis && color === 'neutral'
      ? 'default'
      : emphasis
      ? 'brand'
      : 'inverted'

  return (
    <Center
      style={{
        border: '1px solid red',
        flexShrink: '0',
        width: size,
        height: size,
        color: genColor('action', color, !emphasis ? 'subtleNormal' : 'normal'),
        borderRadius: '50%',
        backgroundImage: img ? `url(${img})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {label && !img ? (
        <Text
          color={contentColor}
          //@ts-ignoreignore
          size={size / 2}
          style={{ lineHeight: '32px' }}
        >
          {label[0].toLocaleUpperCase()}
        </Text>
      ) : null}
    </Center>
  )
}
