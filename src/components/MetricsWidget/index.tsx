import React, { FC, useEffect, useState } from 'react'
import {
  styled,
  Style,
  color,
  Text,
  Button,
  Input,
  IconEmojiSmile,
  IconChartLine,
  useOverlay,
} from '../..'
import { ChartOptionsOverlay, CalculateOptionsOverlay } from './overlays'

type MetricsWidgetProps = {
  label?: string
  data?: any
  chart?: 'bar' | 'line' | 'pie'
  calcOption?: 'percentage' | 'numbers'
  style?: Style
}

export const MetricsWidget: FC<MetricsWidgetProps> = ({
  label,
  data,
  calcOption,
  chart,
  style,
}) => {
  const [chartOption, setChartOption] = useState(chart)
  const [calculationOption, setCalculationOption] = useState(calcOption)

  //   const changeChartTooltip = useTooltip('Change chart type', 'top')
  //   const changeCalculation = useTooltip('Change calculation', 'top')

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
        <Text weight="strong" size={16}>
          {label}
        </Text>
        <styled.div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Input
            type="select"
            multiple={false}
            value={''}
            onChange={(v) => {
              console.log(v)
            }}
            style={{ maxWidth: '110px' }}
            placeholder="Select one"
            options={[
              { label: 'Item one', value: 'value1' },
              { label: 'Item two', value: 'value2' },
              { label: 'Item three', value: 'value3' },
            ]}
          />
          <styled.div
            style={{
              width: 1,
              height: 28,
              backgroundColor: color('border', 'default', 'strong'),
            }}
          />
          <Button
            icon={<IconEmojiSmile />}
            size="small"
            color="system"
            light
            style={{ border: '0px solid transparent' }}
            onClick={openCalculateOptions}
            // {...changeCalculation}
          />
          <Button
            icon={<IconChartLine />}
            size="small"
            color="system"
            light
            style={{ border: '0px solid transparent' }}
            onClick={openChartOptions}
            // {...changeChartTooltip}
          />
        </styled.div>
      </styled.div>
      <styled.div style={{ padding: '16px 16px 16px 20px' }}>
        Show this chart: {chartOption} <br />
        Calculate option: {calculationOption}
      </styled.div>
    </styled.div>
  )
}
