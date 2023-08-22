import React, { FC, ReactNode } from 'react'

import {
  Center,
  IconInfoFill,
  IconAlertFill,
  IconErrorFill,
  Text,
  color as genColor,
} from '../..'

import { styled, Style } from 'inlines'
import { ColorBackgroundColors } from '../../varsTypes'

export type AlertBannerProps = {
  color?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  icon?: ReactNode
  label?: string
  onClick?: () => void
  style?: Style
}

export const AlertBanner: FC<AlertBannerProps> = ({
  color = 'brand',
  label,
  onClick,
  style,
}) => {
  return (
    <Center
      onClick={onClick}
      style={{
        width: '100%',
        maxHeight: '48px',
        padding: '12px 0px',
        backgroundColor: genColor('background', color, 'strong'),
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          marginRight: label ? 8 : 0,
          width: 16,
          height: 16,
          maxWidth: '100%',
          maxHeight: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {color === 'negative' ? (
          <IconErrorFill color="inverted" />
        ) : color === 'warning' ? (
          <IconAlertFill />
        ) : (
          <IconInfoFill />
        )}
      </styled.div>
      <Text size={14} color="inverted">
        {label}
      </Text>
    </Center>
  )
}
