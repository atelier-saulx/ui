import React, { FC } from 'react'
import { AlertBannerProps } from '../types'
import { Center } from '../Styled'
import { IconInfoFill, IconAlertFill, IconErrorFill } from '../..'
import { color as genColor } from '../../../src'
import { Text } from '../Text'
import { styled } from 'inlines'

// TODO BROKEN ICONS

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
