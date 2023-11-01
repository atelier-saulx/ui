import React from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export const OverlayLabels = ({
  xPos,
  yPos,
  objKey,
  objValue,
  valueFormat,
  direction,
}) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'muted'),
        padding: '4px 12px',
        borderRadius: 4,
        position: 'absolute',
        left: xPos,
        top: yPos,
        border: `1px solid ${color('inputBorder', 'neutralNormal')}`,
      }}
    >
      <Text>
        {objKey} : {prettyNumber(objValue, valueFormat)}
      </Text>
    </styled.div>
  )
}
