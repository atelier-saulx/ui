import React from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export const HorizontalBar = ({
  valueFormat,
  label,
  value,
  percentage,
  color,
}) => {
  return (
    <styled.div
      style={{ display: 'flex', marginBottom: 4, alignItems: 'center' }}
    >
      <styled.div style={{ width: '100%' }}>
        <styled.div
          style={{
            borderRadius: 3,
            backgroundColor: genColor(
              'nonSemanticBackground',
              color || 'magenta',
              'muted'
            ),
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            width: `${percentage.toFixed()}%`,
          }}
        >
          <Text selectable="none" weight="medium">
            {label}
          </Text>
        </styled.div>
      </styled.div>
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: 26,
          whiteSpace: 'nowrap',
          width: 28,
        }}
      >
        <Text selectable="none" weight="medium">
          {valueFormat !== 'percentages'
            ? prettyNumber(value, valueFormat)
            : percentage.toFixed(1) + '%'}
        </Text>
      </styled.div>
    </styled.div>
  )
}
