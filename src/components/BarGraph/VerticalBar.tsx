import React from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export const VerticalBar = ({
  valueFormat,
  label,
  value,
  percentage,
  color,
  barWidth = 32,
  spacing = 4,
}) => {
  return (
    <styled.div style={{ marginRight: spacing, textAlign: 'center' }}>
      <styled.div
        style={{
          height: '100%',
          minHeight: 278,
          display: 'flex',
          flexFlow: 'wrap-reverse',
          marginBottom: 8,
        }}
      >
        <styled.div
          style={{
            backgroundColor: genColor(
              'nonSemanticBackground',
              color || 'magenta',
              'muted'
            ),
            borderRadius: 3,
            height: `${percentage.toFixed()}%`,
            padding: '4px 8px',
            position: 'relative',
            whiteSpace: 'nowrap',
            width: barWidth,
            // display: 'flex',
            // alignItems: 'end',
            // justifyContent: 'center',
          }}
        >
          <Text
            selectable="none"
            weight="medium"
            style={{
              bottom: 26,
              left: 0,
              right: 0,
              position: 'absolute',
              transform: 'rotate(-90deg) ',
            }}
          >
            {label}
          </Text>
        </styled.div>
      </styled.div>

      <Text selectable="none" weight="medium">
        {valueFormat
          ? prettyNumber(value, valueFormat)
          : percentage.toFixed(1) + '%'}
      </Text>
    </styled.div>
  )
}
