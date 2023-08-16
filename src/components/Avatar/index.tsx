import React, { FC, SyntheticEvent, useState } from 'react'
import { color as genColor } from '../../../src'
import { Text } from '../Text'
import { Center } from '../Styled'
import { AvatarProps } from '../types'

export const Avatar: FC<AvatarProps> = ({
  size: sizeProp = 'medium',
  subtle,
  color = 'aquamarine',
  imgsrc,
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
      : sizeProp === 'xsmall'
      ? 24
      : 20
  const fontSize =
    sizeProp === 'large'
      ? '16px'
      : sizeProp === 'medium'
      ? '14px'
      : sizeProp === 'small'
      ? '12px'
      : '10px'

  return (
    <Center
      style={{
        flexShrink: '0',
        width: size,
        height: size,
        backgroundColor: genColor(
          'nonSemanticBackground',
          color,
          subtle ? 'muted' : 'strong'
        ),
        borderRadius: '50%',
        backgroundImage: imgsrc ? `url(${imgsrc})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {label && !imgsrc ? (
        <Text
          color="inverted"
          //@ts-ignoreignore
          size={fontSize}
          style={{
            lineHeight: '32px',
            color: genColor(
              'nonSemanticContent',
              subtle ? color : 'white',
              'primary'
            ),
          }}
        >
          {label[0].toLocaleUpperCase() + label[1].toLocaleUpperCase()}
        </Text>
      ) : null}
    </Center>
  )
}
