import React, { FC } from 'react'
import { ModalWarningProps } from '../types'
import { styled } from 'inlines'
import { color as genColor } from '../../../src'
import { Text } from '../Text'
import { IconAlertFill } from '../../../src'
import { Center } from '../Styled'

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
        width: '100%',
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
