import React, { FC } from 'react'
import {
  color as genColor,
  Text,
  Center,
  Style,
  ColorNonSemanticBackgroundColors,
} from '../..'

export type AvatarProps = {
  color?: ColorNonSemanticBackgroundColors
  imgsrc?: string
  onClick?: () => void
  label?: string
  size?: 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  style?: Style
  subtle?: boolean
}

export const Avatar: FC<AvatarProps> = ({
  color = 'aquamarine',
  imgsrc,
  onClick,
  label,
  size: sizeProp = 'medium',
  style,
  subtle,
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
          {label[0]?.toLocaleUpperCase()}
          {label.length > 1 ? label[1]?.toLocaleUpperCase() : ''}
        </Text>
      ) : null}
    </Center>
  )
}
