import React, { FC, ReactNode } from 'react'

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
  color = 'default',
  ghost,
  children,
  onClick,
  style,
  light,
}) => {
  const contentColor: ColorContentColors | ColorNonSemanticContentColors =
    light || ghost
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
    <styled.div
      onClick={onClick}
      style={{
        // display: 'inline-flex',
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
          color:
            color === 'default'
              ? genColor('content', 'default', 'primary')
              : genColor(
                  isSemanticColor(color) ? 'content' : 'nonSemanticContent',
                  contentColor,
                  'primary'
                ),
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
