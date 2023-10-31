import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { color as genColor } from '../../varsUtilities'
import { LineGraphDataInput } from '../Linegraph/types'
import { genPaths } from '../Linegraph/genPath'
import { processData } from '../Linegraph/utils'
import { ColorNonSemanticBackgroundColors } from 'src/varsTypes'

type SingleMetricProps = {
  label?: string
  valueFormat?: NumberFormat
  style?: Style
  data: LineGraphDataInput
  color?: ColorNonSemanticBackgroundColors
  value?: number
}

export const SingleMetric: FC<SingleMetricProps> = ({
  label,
  valueFormat = 'number-short',
  data: dataInput = [{ x: 0, y: 0 }],
  style,
  color = 'violet',
  value,
}) => {
  const data = processData({ dataInput })

  let width = 100
  let height = 52

  const { paths } = genPaths({
    data: data,
    width: width,
    height: height,
  })

  return (
    <styled.div
      style={{
        padding: '14px 24px 10px 20px',
        border: `1px solid ${genColor('border', 'default', 'strong')}`,
        borderRadius: 8,
        backgroundColor: genColor('background', 'default', 'strong'),
        display: 'flex',
        alignItems: 'center',
        maxWidth: 282,
        justifyContent: 'space-between',
        gap: 16,
        ...style,
      }}
    >
      <styled.div>
        <Text size={12} light truncate>
          {label}
        </Text>
        <Text size={24} weight="strong">
          {value
            ? prettyNumber(value, valueFormat)
            : // @ts-ignore
            dataInput[dataInput.length - 1].y
            ? // @ts-ignore
              prettyNumber(dataInput[dataInput.length - 1].y, valueFormat)
            : 0}
        </Text>
      </styled.div>

      <styled.div
        style={{
          width: 100,
          height: 56,
          '& svg': {
            '& path': {
              stroke: ` ${genColor(
                'nonSemanticBackground',
                color,
                'strong'
              )}  !important`,
            },
          },
        }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          {paths}
        </svg>
      </styled.div>
    </styled.div>
  )
}
