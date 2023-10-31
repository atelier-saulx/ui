import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { color } from '../../varsUtilities'
import { LineGraphDataInput } from '../Linegraph/types'
import { LineGraph } from '../Linegraph'
import { genPaths } from '../Linegraph/genPath'
import { processData } from '../Linegraph/utils'

type SingleMetricProps = {
  label?: string
  valueFormat?: NumberFormat
  style?: Style
  data?: LineGraphDataInput
}

export const SingleMetric: FC<SingleMetricProps> = ({
  label,
  valueFormat,
  data: dataInput,
  style,
}) => {
  const data = processData({ dataInput })

  let width = 100
  let height = 56

  const { paths, lineRefs } = genPaths({
    data: data,
    width: width,
    height: height,
  })

  return (
    <styled.div
      style={{
        padding: '14px 24px 10px 20px',
        border: `1px solid ${color('border', 'default', 'strong')}`,
        borderRadius: 8,
        backgroundColor: color('background', 'default', 'strong'),
        display: 'flex',
        alignItems: 'center',
        maxWidth: 282,
        ...style,
      }}
    >
      <styled.div>
        <Text size={12} light>
          {label}
        </Text>
        <Text size={24} weight="strong">
          6,1k
        </Text>
      </styled.div>

      <styled.div style={{ width: 100, height: 56 }}>
        {/* <LineGraph data={data} /> */}
        <svg
          // ref={ref}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
        >
          {paths}
        </svg>
      </styled.div>
    </styled.div>
  )
}
