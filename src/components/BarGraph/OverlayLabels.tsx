import React from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color, colorHash } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export const OverlayLabels = ({
  xPos,
  yPos,
  objKey,
  objValue,
  valueFormat,
  direction,
  label,
}) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'muted'),

        borderRadius: 4,
        position: 'absolute',
        zIndex: 1,
        left: xPos,
        top: yPos,
        border: `1px solid ${color('inputBorder', 'neutralNormal')}`,
      }}
    >
      {label && (
        <Text
          weight="medium"
          size={14}
          style={{
            padding: '4px 12px',
            width: '100%',
            borderBottom: `1px solid ${color('inputBorder', 'neutralNormal')}`,
          }}
        >
          {label}
        </Text>
      )}
      <Text style={{ padding: '4px 12px' }}>
        <styled.div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: 5,
            backgroundColor: color(
              'nonSemanticBackground',
              colorHash('nonSemanticBackground', objKey),
              'strong'
            ),
          }}
        />{' '}
        {objKey} : {prettyNumber(objValue, valueFormat)}
      </Text>
    </styled.div>
  )
}
