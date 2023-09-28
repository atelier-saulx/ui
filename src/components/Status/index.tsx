import React, { FC, ReactNode } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { styled, Style } from 'inlines'
import { isSemanticColor } from '../../utils'
import { color as genColor } from '../../varsUtilities'
import { IconSmallDot } from '../../icons'
import { Text } from '../../components'
import { ClickHandler } from '../../types'
import {
  ColorContentColors,
  ColorNonSemanticContentColors,
  ColorBackgroundColors,
  ColorNonSemanticBackgroundColors,
} from '../../varsTypes'

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
        }}
        color="inherit"
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
      </Text>
    </styled.div>
  )
}

// pulsate
