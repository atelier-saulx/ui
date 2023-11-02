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

export const Yaxis = ({ axisValues, spacing, valueFormat }: YaxisProps) => {
  return (
    <styled.div
      style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',

        borderRight: `1px solid ${genColor('inputBorder', 'neutralNormal')}`,
        marginRight: !spacing || spacing < 6 ? 12 : spacing,
      }}
    >
      {axisValues.map((item, idx) => (
        <Text
          size={12}
          light
          //   style={{
          //     transform: idx === 0 ? 'translateX(-50%)' : 'translateX(50%)',
          //   }}
        >
          {prettyNumber(item, valueFormat)}
        </Text>
      ))}
    </styled.div>
    // <styled.div
    //   style={{
    //     display: 'flex',
    //     position: 'relative',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     borderTop: `1px solid ${genColor('inputBorder', 'neutralNormal')}`,
    //     marginTop: !spacing || spacing < 6 ? 12 : spacing,
    //     marginBottom: 16,
    //   }}
    // >
    //   {axisValues.map((item, idx) => (
    //     <Text
    //       size={12}
    //       light
    //       style={{
    //         transform: idx === 0 ? 'translateX(-50%)' : 'translateX(50%)',
    //       }}
    //     >
    //       {prettyNumber(item, valueFormat)}
    //     </Text>
    //   ))}
    // </styled.div>
  )
}
