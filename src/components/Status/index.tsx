import React, { FC, ReactNode } from 'react'
import { useTheme } from '~/hooks/useTheme'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
  ColorBackgroundColors,
  ColorNonSemanticBackgroundColors,
  isSemanticColor,
  color as genColor,
  styled,
  Style,
  Text,
  IconSmallDot,
} from '~'
import { ClickHandler } from '../../types'

export type StatusProps = {
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  ghost?: boolean
  children?: ReactNode
  onClick?: ClickHandler
  style?: Style
  light?: boolean
}

export const Status: FC<StatusProps> = ({
  color: colorProp = 'default',
  ghost,
  children,
  onClick,
  style,
  light,
}) => {
  const { theme } = useTheme()

  const color =
    colorProp === 'white'
      ? theme === 'dark'
        ? 'inverted'
        : 'default'
      : colorProp

  const contentColor: ColorContentColors | ColorNonSemanticContentColors =
    light || ghost
      ? color === 'neutral' || (color === 'inverted' && ghost)
        ? 'default'
        : color
      : isSemanticColor(color)
      ? color === 'warning'
        ? 'default'
        : 'inverted'
      : color === 'orange'
      ? 'grey'
      : 'white'

  console.log(color)

  return (
    <styled.div
      onClick={onClick}
      style={{
        backgroundColor: ghost
          ? null
          : genColor(
              isSemanticColor(color) ? 'background' : 'nonSemanticBackground',
              color,
              light ? 'muted' : 'strong'
            ),
        color:
          color === 'default'
            ? genColor('content', 'default', 'primary')
            : genColor(
                isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                contentColor,
                'primary'
              ),
        borderRadius: '4px',
        minWidth: '24px',
        width: 'fit-content',
        padding: ' 0px 8px 0px 4px',
        maxHeight: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <IconSmallDot
        style={{
          marginRight: '4px',
          color: 'inherit',
        }}
      />

      <Text
        selectable="none"
        style={{
          color: 'inherit',
          height: '24px',
          lineHeight: '24px',
        }}
      >
        {children}
        {theme}
      </Text>
    </styled.div>
  )
}

// pulsate
