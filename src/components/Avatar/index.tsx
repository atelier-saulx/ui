import React, { FC, ReactNode } from 'react'
import { color as genColor, colorHash } from '../../varsUtilities'
import { Text } from '../Text'
import { Center } from '../Styled'
import { Style } from 'inlines'
import { ColorNonSemanticBackgroundColors } from '../../varsTypes'
import { ClickHandler } from '../../types'

export type AvatarProps = {
  children?: ReactNode
  color?: ColorNonSemanticBackgroundColors
  src?: string
  onClick?: ClickHandler
  size?: 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  squared?: boolean
  style?: Style
  light?: boolean
  autoColor?: boolean
}

export const Avatar: FC<AvatarProps> = ({
  color,
  squared = false,
  src,
  onClick,
  children,
  size: sizeProp = 'medium',
  style,
  light,
  autoColor,
  ...rest
}) => {
  if (autoColor && !color) {
    color = colorHash('nonSemanticBackground', children ?? src)
  } else if (!color) {
    color = 'grey'
  }

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
      ? 16
      : sizeProp === 'medium'
      ? 14
      : sizeProp === 'small'
      ? 12
      : 10

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
        backgroundImage: src ? `url(${src})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {children && !src ? (
        <Text
          selectable="none"
          color="inverted"
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
