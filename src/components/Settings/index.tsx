import React, { FC, ReactNode } from 'react'
import { useTheme } from '~/hooks/useTheme'
import {
  ColorBackgroundColors,
  ColorNonSemanticBackgroundColors,
  color as genColor,
  styled,
  Style,
} from '~'
import { ClickHandler } from '../../types'

export type SettingsProps = {
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  ghost?: boolean
  children?: ReactNode
  onClick?: ClickHandler
  style?: Style
  light?: boolean
}

export const Settings: FC<SettingsProps> = ({
  color: colorProp = 'default',
  ghost,
  children,
  onClick,
  style,
  light,
}) => {
  return <styled.div>HELLO</styled.div>
}

// pulsate
