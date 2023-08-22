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
  icon?: ReactNode
  label?: string
  style?: Style
  // onClick?: () => void
  // actionLabel?: string
  action?: { onClick: () => void; label: string }
}

export const AlertBanner: FC<AlertBannerProps> = ({
  color = 'brand',
  label,
  style,
  // onClick,
  // actionLabel,
  action,
}) => {
  return (
    <Center
      // onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '48px',
        padding: action ? '8px 0px' : '12px 0px',
        // cursor: !actionLabel && onClick ? 'pointer' : 'default',
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
      <Text size={14} color={color === 'warning' ? 'default' : 'inverted'}>
        {label}
      </Text>
      {action && (
        <Button
          onClick={action.onClick}
          underline={true}
          size="xsmall"
          color={color === 'warning' ? 'neutral' : 'inverted'}
          style={{
            marginLeft: '9px',
            // color: genColor(
            //   'content',
            //   color === 'warning' ? 'inverted' : 'inverted',
            //   'primary'
            // ),
          }}
        >
          {action.label}
        </Button>
      )}
    </Center>
  )
}
