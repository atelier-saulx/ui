import React, { FC, ReactNode } from 'react'
import {
  color as genColor,
  Text,
  Center,
  Style,
  ColorNonSemanticBackgroundColors,
} from '../..'
import { ClickHandler } from '../../types'

export type AvatarProps = {
  children?: ReactNode
  color?: ColorNonSemanticBackgroundColors
  imgsrc?: string
  onClick?: ClickHandler
  size?: 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  squared?: boolean
  style?: Style
  light?: boolean
}

export const Avatar: FC<AvatarProps> = ({
  color = 'aquamarine',
  squared = false,
  imgsrc,
  onClick,
  children,
  size: sizeProp = 'medium',
  style,
  light,
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
          light ? 'muted' : 'strong'
        ),
        borderRadius: squared ? '8px' : '50%',
        backgroundImage: imgsrc ? `url(${imgsrc})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {children && !imgsrc ? (
        <Text
          color="inverted"
          //@ts-ignoreignore
          size={fontSize}
          style={{
            lineHeight: '32px',
            color: genColor(
              'nonSemanticContent',
              light ? color : 'white',
              'primary'
            ),
          }}
        >
          {children[0]?.toLocaleUpperCase()}
          {children[1]?.toLocaleUpperCase()}
        </Text>
      ) : null}
    </Center>
  )
}
