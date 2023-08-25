import React, { FC } from 'react'
import {
  IconAlertFill,
  color as genColor,
  Text,
  styled,
  Center,
  ColorBackgroundColors,
} from '../..'

export type ModalWarningProps = {
  color?: Exclude<
    ColorBackgroundColors,
    'default' | 'inverted' | 'neutral' | 'informative' | 'positive' | 'brand'
  >
  label?: string
}

export const ModalWarning: FC<ModalWarningProps> = ({
  color = 'warning',
  label,
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
      }}
    >
      <Center style={{ height: '20px', width: '20px', marginRight: '8px' }}>
        <IconAlertFill color={color} />
      </Center>
      <Text size={14} color="default">
        {label}
      </Text>
    </styled.div>
  )
}
