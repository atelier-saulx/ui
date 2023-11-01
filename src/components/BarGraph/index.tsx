import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { Row } from '../Styled'
import { color as genColor } from '../../varsUtilities'
import { ColorNonSemanticBackgroundColors } from '../../varsTypes'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { HorizontalBar } from './HorizontalBar'
import { VerticalBar } from './VerticalBar'
import { CustomWidthBar } from './CustomWidthBar'
import { StackedBars } from './StackedBars'

export type BarGraphSingleItem = {
  label: string
  value: number
  color?: ColorNonSemanticBackgroundColors
  [key: string]: any
}

type BarGraphProps = {
  data: BarGraphSingleItem[]
  direction?: 'horizontal' | 'vertical'
  valueFormat?: 'percentages' | NumberFormat
  style?: Style
  color?: ColorNonSemanticBackgroundColors
  barWidth?: number
  stacked?: boolean
  spacing?: number
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  direction,
  style,
  valueFormat = 'percentages',
  color,
  barWidth,
  stacked,
  spacing,
}) => {
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)
  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
  }))

  console.log(data, '🐨')

  // TODO: hide labels on custom bars
  // TODO: show x axis with values

  let totalValuesArr = []
  if (stacked) {
    for (let i = 0; i < data.length; i++) {
      totalValuesArr.push(
        Object.values(data[i].value)
          .map((item) => item)
          .reduce((a, b) => a + b, 0)
      )
    }
  }

  return (
    <>
      {stacked ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'row' : 'column',
            ...style,
          }}
        >
          {data.map((item, idx) => (
            <div key={idx}>
              <StackedBars
                value={item.value}
                key={idx}
                label={item.label}
                largestValue={Math.max(...totalValuesArr)}
                color={item.color || color}
                valueFormat={valueFormat}
                spacing={spacing}
                direction={direction}
              />
              <Text style={{ textAlign: 'center', marginRight: spacing }}>
                {item.label}
              </Text>
            </div>
          ))}
        </styled.div>
      ) : !barWidth && direction === 'vertical' ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            ...style,
          }}
        >
          {data.map((item, idx) => (
            <VerticalBar
              key={idx}
              valueFormat={valueFormat}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              color={item.color ? item.color : color}
            />
          ))}
        </styled.div>
      ) : !barWidth && (!direction || direction === 'horizontal') ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...style,
          }}
        >
          {data.map((item, idx) => (
            <HorizontalBar
              key={idx}
              valueFormat={valueFormat}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              color={item.color ? item.color : color}
            />
          ))}
        </styled.div>
      ) : (
        // custom width bar and labels
        <styled.div
          style={{
            display: 'table',
            transform:
              direction === 'vertical' ? 'rotate(-90deg)' : 'rotate(0deg)',
            ...style,
          }}
        >
          {/* Text labels */}
          <styled.div
            style={{
              display: 'table-cell',
              flexDirection: 'column',
            }}
          >
            {data.map((item, idx) => (
              <Text
                selectable="none"
                weight="medium"
                key={idx}
                style={{
                  justifyContent: 'flex-end',
                  height: barWidth > 24 ? `${barWidth}px` : 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.label}{' '}
                {valueFormat !== 'percentages'
                  ? prettyNumber(item.value, valueFormat)
                  : item.percentage.toFixed(1) + '%'}
              </Text>
            ))}
          </styled.div>
          {/* bars */}
          <styled.div
            style={{
              display: 'table-cell',
              flexDirection: 'column',
              minWidth: 400,
              height: '100%',
              position: 'relative',
            }}
          >
            {data.map((item, idx) => (
              <CustomWidthBar
                key={idx}
                percentage={item.percentage}
                color={item.color ? item.color : color}
                noOfItems={data.length}
                index={idx}
                barWidth={barWidth}
              />
            ))}
          </styled.div>
        </styled.div>
      )}
    </>
  )
}
