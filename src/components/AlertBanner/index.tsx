import React, { FC, ReactNode } from 'react'
import {
  Center,
  ColorBackgroundColors,
  IconInfoFill,
  IconAlertFill,
  IconErrorFill,
  Text,
  color as genColor,
  styled,
  Style,
  Button,
} from '../..'

export type AlertBannerProps = {
  color?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  children?: ReactNode
  style?: Style
  action?: { onClick: () => void; label: string }
}

export const AlertBanner: FC<AlertBannerProps> = ({
  color = 'brand',
  children,
  style,
  action,
}) => {
  return (
    <Center
      style={{
        width: '100%',
        padding: action ? '8px' : '12px',
        backgroundColor: genColor('background', color, 'strong'),
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          marginRight: children ? 8 : 0,
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
      <Text
        size={14}
        weight="strong"
        color={color === 'warning' ? 'default' : 'inverted'}
      >
        {children}
      </Text>
      {action && (
        <Button
          onClick={action.onClick}
          underline={true}
          size="xsmall"
          color={color === 'warning' ? 'neutral' : 'inverted'}
          style={{
            marginLeft: '9px',
          }}
        >
          {action.label}
        </Button>
      )}
    </Center>
  )
}
