import React from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'
import { Text } from '../Text'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type XaxisProps = {
  axisValues: number[]
  spacing?: number
  valueFormat?: NumberFormat
}

export const Xaxis = ({ axisValues, spacing, valueFormat }: XaxisProps) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        width: '100%',
        borderTop: `1px solid ${genColor('inputBorder', 'neutralNormal')}`,
        marginTop: !spacing || spacing < 6 ? 12 : spacing,
        marginBottom: 16,
      }}
    >
      {axisValues.map((item, idx) => (
        <Text
          size={12}
          light
          style={{
            transform: idx === 0 ? 'translateX(-50%)' : 'translateX(50%)',
          }}
        >
          {prettyNumber(item, valueFormat)}
        </Text>
      ))}
    </styled.div>
  )
}
