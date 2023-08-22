import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'

export const Divider: FC<{
  style?: Style
}> = ({ style }) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('border', 'default', 'strong'),
        height: '1px',
        width: '100%',
        ...style,
      }}
    />
  )
}
