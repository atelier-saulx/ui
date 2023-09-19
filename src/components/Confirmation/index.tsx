import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { Button } from '../Button'
import { IconClose, IconCheckLarge } from '~/icons'
import { color } from '../../varsUtilities'

// return true or false
type ConfirmationProps = {
  style?: Style
}

export const Confirmation: FC<ConfirmationProps> = ({ style }) => {
  return (
    <styled.div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <Text light>Apply changes?</Text>
      <Button
        icon={<IconClose />}
        size="xsmall"
        style={{
          marginLeft: '8px',
          padding: '3px',
          '&:hover': {
            backgroundColor: color('background', 'neutral', 'subtle'),
          },
          '&:active': {
            backgroundColor: color('background', 'neutral', 'muted'),
          },
        }}
        onClick={() => console.log('No')}
      />
      <Button
        icon={<IconCheckLarge />}
        size="xsmall"
        color="primary"
        style={{
          marginLeft: '8px',
          padding: '3px',
          '&:hover': {
            backgroundColor: color('background', 'neutral', 'subtle'),
          },
          '&:active': {
            backgroundColor: color('background', 'neutral', 'muted'),
          },
        }}
        onClick={() => console.log('Yes')}
      />
    </styled.div>
  )
}
