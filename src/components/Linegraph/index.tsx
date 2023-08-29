import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { NumberFormat } from '@based/pretty-number'
import { LineGraphDataInput, LineXGraphFormat } from './types'
import { getGlobalMinMax, processData } from './utils'
import genLabels from './genLabels'
import { genPaths } from './genPath'
import XAxis from './XAxis'
import Labels from './Labels'
import OverlayWrapper from './OverlayWrapper'
import { Style, styled, Text } from '../..'

const Graph = ({
  width,
  height,
  data: dataInput,
  xFormat,
  label,
  valueFormat,
  style,
}: {
  width: number
  height: number
  data: LineGraphDataInput
  xFormat?: LineXGraphFormat
  label?: string
  valueFormat?: NumberFormat | string
  style?: Style
}) => {
  const labelRef = useRef<any>()
  const [labelWidth, updateLabelWidth] = useState(0)
  const svgWidth = width - labelWidth
  const svgHeight = height - (label ? 66 : 32) + (xFormat ? 0 : 16)

  const data = processData({ dataInput })
  const { globalMaxY, globalMinY, globalMaxX, globalMinX } =
    getGlobalMinMax(data)
  const ySpread = globalMaxY - globalMinY

  useEffect(() => {
    if (labelRef.current) {
      updateLabelWidth(labelRef.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { paths, lineRefs } = genPaths({
    data: data,
    width: svgWidth,
    height: svgHeight,
  })

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, globalMaxY)

  return (
    <styled.div
      style={{
        width,
        height,
      }}
    >
      {label ? (
        <Text size={16} weight="strong" style={{ marginBottom: 24 }}>
          {label}
        </Text>
      ) : null}
      <div
        style={{
          width,
          height: svgHeight,
          display: 'flex',
          paddingTop: 12,
        }}
      >
        <div
          ref={labelRef}
          style={{
            marginTop: -32,
            paddingRight: 24,
          }}
        >
          <Labels
            labels={labels}
            labelHeight={labelHeight}
            valueFormat={valueFormat}
          />
        </div>
        <OverlayWrapper
          isStacked={false}
          legend={false}
          width={svgWidth}
          height={svgHeight}
          labelHeight={labelHeight}
          labels={labels}
          data={data}
          ySpread={ySpread}
          lineRefs={lineRefs}
          xFormat={xFormat}
        >
          {paths}
        </OverlayWrapper>
      </div>
      {xFormat ? (
        <div
          style={{
            paddingLeft: labelWidth + 'px',
          }}
        >
          <XAxis
            maxX={globalMaxX}
            minX={globalMinX}
            xFormat={xFormat}
            width={svgWidth}
          />
        </div>
      ) : null}
    </styled.div>
  )
}

export type LineGraphProps = {
  data: LineGraphDataInput
  xFormat?: LineXGraphFormat
  valueFormat?: NumberFormat | string
  label?: string
  width?: number
  height?: number
}
export const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  xFormat = 'number',
  valueFormat = 'number-short',
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Graph
            label={label}
            data={data}
            height={height}
            width={width}
            xFormat={xFormat}
            valueFormat={valueFormat}
          />
        )
      }}
    </AutoSizer>
  )
}
