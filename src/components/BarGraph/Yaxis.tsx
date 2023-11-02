import React from 'react'
import { color as genColor } from '../../varsUtilities'
import { styled } from 'inlines'
import { Text } from '../Text'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type YaxisProps = {
  axisValues: number[]
  spacing?: number
  valueFormat?: NumberFormat
}

export const Yaxis = ({
  axisValues,
  spacing,
  valueFormat = 'number-short',
}: YaxisProps) => {
  return (
    <styled.div
      style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        paddingRight: 6,
        borderRight: `1px solid ${genColor('inputBorder', 'neutralNormal')}`,
        marginRight: !spacing || spacing < 6 ? 12 : spacing,
      }}
    >
      {axisValues.map((item, idx) => (
        <Text
          key={idx}
          align="right"
          size={12}
          light
          style={{
            transform:
              idx === 0
                ? 'translateY(50%)'
                : idx === axisValues.length - 1
                ? 'translateY(-50%)'
                : 'none',
          }}
        >
          {prettyNumber(item, valueFormat)}
        </Text>
      ))}
    </styled.div>
  )
}
