import React from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color as genColor, colorHash } from '../../varsUtilities'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export const HorizontalBar = ({
  valueFormat,
  label,
  value,
  percentage,
  color,
  barWidth,
  legend,
  spacing = 4,
}) => {
  return (
    <styled.div
      style={{ display: 'flex', marginBottom: spacing, alignItems: 'center' }}
    >
      <styled.div style={{ width: '100%' }}>
        <styled.div
          style={{
            borderRadius: 3,
            backgroundColor: color
              ? genColor('nonSemanticBackground', color || 'magenta', 'muted')
              : genColor(
                  'nonSemanticBackground',
                  colorHash('nonSemanticBackground', label),
                  legend ? 'strong' : 'muted'
                ),
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            width: `${percentage.toFixed()}%`,
            height: barWidth ? barWidth : 'auto',
          }}
        >
          <Text selectable="none" weight="medium">
            {!legend && label}
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
          {valueFormat
            ? prettyNumber(value, valueFormat)
            : percentage.toFixed(1) + '%'}
        </Text>
      </styled.div>
    </styled.div>
  )
}
