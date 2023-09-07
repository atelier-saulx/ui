import React, { FC, useEffect, useState } from 'react'
import {
  styled,
  Style,
  color,
  Text,
  Button,
  Input,
  IconChartLine,
  useOverlay,
  IconPercentage,
  IconChartBarHorizontal,
  IconChartPie,
  IconHash,
  LineGraph,
  useTooltip,
  PieGraph,
  BarGraph,
} from '../..'
import { ChartOptionsOverlay, CalculateOptionsOverlay } from './overlays'

type MetricsWidgetProps = {
  calcOption?: 'percentage' | 'numbers'
  chart?: 'bar' | 'line' | 'pie'
  // TODO fix this TS type
  data?: { [key: string]: { x: number; y: number }[] }
  height?: number
  style?: Style
}

// TODO find a way to pass Chart Specific props // ??
// pass select options  ??

export const MetricsWidget: FC<MetricsWidgetProps> = ({
  calcOption,
  chart,
  data,
  height = 296,
  style,
}) => {
  const [selected, setSelected] = useState('')
  const [chartOption, setChartOption] = useState(chart)
  const [calculationOption, setCalculationOption] = useState(calcOption)

  // const changeChartTooltip = useTooltip('Change chart type', 'top')
  // const changeCalculation = useTooltip('Change calculation', 'top')

  console.log(data)

  const selectOptions = Object.keys(data).map((item, idx) => ({
    label: item,
    value: item,
  }))

  console.log(selectOptions)

  if (!selected) {
    setSelected(selectOptions[0]?.value)
  }

  const openChartOptions = useOverlay(
    ChartOptionsOverlay,
    { chartOption, setChartOption },
    { width: '100%', position: 'bottom' },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto' } }
  )

  const openCalculateOptions = useOverlay(
    CalculateOptionsOverlay,
    { calculationOption, setCalculationOption },
    { width: '100%', position: 'bottom' },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto' } }
  )

  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'strong'),
        border: `1px solid ${color('border', 'default', 'strong')}`,
        borderRadius: 8,
        width: 588,
        height: 430,
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
          justifyContent: 'space-between',
          padding: '16px 16px 16px 20px',
        }}
      >
        <Text weight="strong" size={16} transform="capitalize">
          {selected}
        </Text>
        <styled.div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Input
            type="select"
            multiple={false}
            value={selected}
            onChange={(v) => {
              console.log(v)
              setSelected(v)
            }}
            style={{ maxWidth: '110px' }}
            placeholder="Select one"
            options={selectOptions}
          />
          <styled.div
            style={{
              width: 1,
              height: 28,
              backgroundColor: color('border', 'default', 'strong'),
            }}
          />
          <Button
            icon={
              calculationOption === 'numbers' ? (
                <IconHash />
              ) : (
                <IconPercentage />
              )
            }
            size="small"
            color="system"
            light
            style={{
              border: '0px solid transparent',
              '&:focus': {
                boxShadow: 'none',
              },
            }}
            onClick={openCalculateOptions as () => void}
            // {...changeCalculation}
          />
          <Button
            icon={
              chartOption === 'bar' ? (
                <IconChartBarHorizontal />
              ) : chartOption === 'line' ? (
                <IconChartLine />
              ) : chartOption === 'pie' ? (
                <IconChartPie />
              ) : (
                <IconChartBarHorizontal />
              )
            }
            size="small"
            color="system"
            light
            style={{
              border: '0px solid transparent',
              '&:focus': {
                boxShadow: 'none',
              },
            }}
            onClick={openChartOptions as () => void}
            // {...changeChartTooltip}
          />
        </styled.div>
      </styled.div>
      <styled.div
        style={{
          position: 'relative',
          height: height,
          padding: '16px 16px 16px 20px',
        }}
      >
        {chartOption === 'bar' && (
          <BarGraph
            data={data[selected]}
            display={calculationOption === 'numbers' ? 'values' : 'percentages'}
          />
        )}
        {chartOption === 'line' && <LineGraph data={data[selected]} />}
        {chartOption === 'pie' && (
          <PieGraph
            data={data[selected]}
            display={calculationOption === 'numbers' ? 'values' : 'percentages'}
          />
        )}
        {/* Calculate option: {calculationOption} */}
      </styled.div>
    </styled.div>
  )
}
