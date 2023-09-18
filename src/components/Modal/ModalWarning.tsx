import React, { FC } from 'react'
import {
  IconAlertFill,
  color as genColor,
  Text,
  styled,
  Style,
  Center,
  ColorBackgroundColors,
} from '~'

export type ModalWarningProps = {
  color?: Exclude<
    ColorBackgroundColors,
    'default' | 'inverted' | 'neutral' | 'informative' | 'positive' | 'brand'
  >
  children?: string
  style?: Style
}

export const ModalWarning: FC<ModalWarningProps> = ({
  color = 'warning',
  children,
  style,
}) => {
  return (
    <styled.div
      style={{
        backgroundColor: genColor('background', color, 'subtle'),
        display: 'flex',
        alignItems: 'center',
        maxHeight: '48px',
        padding: '12px 16px',
        borderRadius: '4px',
        ...style,
      }}
    >
      <Center style={{ height: '20px', width: '20px', marginRight: '8px' }}>
        <IconAlertFill color={color} />
      </Center>
      <Text>{children}</Text>
    </styled.div>
  )
}
