import React, { FC, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import { color } from '../../varsUtilities'
import { ChartOptionsOverlay, CalculateOptionsOverlay } from './overlays'
import {
  Text,
  Button,
  Popover,
  LineGraph,
  PieGraph,
  BarGraph,
  BarGraphSingleItem,
  PieGraphSingleItem,
} from '../../components'

import {
  IconChartLine,
  IconPercentage,
  IconChartBarHorizontal,
  IconChartPie,
  IconHash,
} from '../../icons'

type MetricsWidgetProps = {
  calcOption?: 'percentage' | 'numbers'
  chart?: 'bar' | 'line' | 'pie'
  // TODO fix this TS type
  data?:
    | { [key: string]: { x: number; y: number }[] | { [key: string]: any } }
    | BarGraphSingleItem[]
    | PieGraphSingleItem[]
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
  const [selected, setSelected] = useState<string | number>('')
  const [chartOption, setChartOption] = useState(chart)
  const [calculationOption, setCalculationOption] = useState(calcOption)

  // const changeChartTooltip = useTooltip('Change chart type', 'top')
  // const changeCalculation = useTooltip('Change calculation', 'top')

  const selectOptions = Object.keys(data).map((item, idx) => ({
    label: item,
    value: item,
  }))

  if (!selected) {
    setSelected(selectOptions[0]?.value)
  }

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
          <styled.div
            style={{
              width: 1,
              height: 28,
              backgroundColor: color('border', 'default', 'strong'),
            }}
          />
          <Popover.Root>
            <Popover.Trigger>
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
                // {...changeCalculation}
              />
            </Popover.Trigger>
            <Popover.Content
              side="bottom"
              sideOffset={6}
              style={{ padding: 0 }}
            >
              {/*@ts-ignore*/}
              {({ close }) => (
                <CalculateOptionsOverlay
                  calculationOption={calculationOption}
                  setCalculationOption={setCalculationOption}
                  close={close}
                />
              )}
            </Popover.Content>
          </Popover.Root>
          <Popover.Root>
            <Popover.Trigger>
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

                // {...changeChartTooltip}
              />
            </Popover.Trigger>
            <Popover.Content
              side="bottom"
              sideOffset={6}
              style={{ padding: 0 }}
            >
              {/*@ts-ignore*/}
              {({ close }) => (
                <ChartOptionsOverlay
                  chartOption={chartOption}
                  setChartOption={setChartOption}
                  close={close}
                />
              )}
            </Popover.Content>
          </Popover.Root>
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
            // @ts-ignore
            valueFormat={
              calculationOption === 'numbers' ? 'number-human' : 'percentages'
            }
          />
        )}
        {chartOption === 'line' && <LineGraph data={data[selected]} />}
        {chartOption === 'pie' && (
          <PieGraph
            data={data[selected]}
            valueFormat={
              calculationOption === 'numbers' ? 'number-human' : 'percentages'
            }
          />
        )}
        {/* Calculate option: {calculationOption} */}
      </styled.div>
    </styled.div>
  )
}
