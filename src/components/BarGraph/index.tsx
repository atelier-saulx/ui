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
import { NestedBars } from './NestedBars'
import { Xaxis } from './Xaxis'
import { Yaxis } from './Yaxis'

export type BarGraphSingleItem = {
  label: string
  value: number
  color?: ColorNonSemanticBackgroundColors
  [key: string]: any
}

type BarGraphProps = {
  data: BarGraphSingleItem[]
  direction?: 'horizontal' | 'vertical'
  valueFormat?: NumberFormat
  style?: Style
  color?: ColorNonSemanticBackgroundColors
  barWidth?: number
  stacked?: boolean
  nested?: boolean
  spacing?: number
  showAxis?: boolean
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  direction,
  style,
  valueFormat,
  color,
  barWidth,
  stacked,
  nested,
  spacing,
  showAxis,
}) => {
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)
  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
  }))

  //  console.log(data, '🐨')

  // TODO: hide labels on custom bars
  // TODO: show x, y axis with values

  let totalValuesArr = []
  if (stacked || nested) {
    for (let i = 0; i < data.length; i++) {
      totalValuesArr.push(
        Object.values(data[i].value)
          .map((item) => item)
          .reduce((a, b) => a + b, 0)
      )
    }
  }

  let axisValues = []
  if (showAxis) {
    let divideByNo = 4
    let largest = stacked || nested ? Math.max(...totalValuesArr) : totalValue

    let step = largest / divideByNo

    for (let i = 0; i < divideByNo + 1; i++) {
      axisValues.push(i * step)
    }

    console.log(axisValues, 'arr')
  }

  return (
    <>
      {nested ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'row' : 'column',
            ...style,
          }}
        >
          {data.map((item, idx) => (
            <NestedBars
              value={item.value}
              key={idx}
              label={item.label}
              largestValue={Math.max(...totalValuesArr)}
              barWidth={barWidth}
              spacing={spacing}
              valueFormat={valueFormat}
              direction={direction}
            />
          ))}
          {showAxis && direction !== 'vertical' && (
            <Xaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
        </styled.div>
      ) : stacked ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'row' : 'column',
            ...style,
          }}
        >
          {showAxis && direction === 'vertical' && (
            <Yaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
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
              {direction === 'vertical' && (
                <Text style={{ textAlign: 'center', marginRight: spacing }}>
                  {item.label}
                </Text>
              )}
              {showAxis && direction !== 'vertical' && (
                <Xaxis
                  axisValues={axisValues}
                  spacing={spacing}
                  valueFormat={valueFormat}
                />
              )}
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
                {valueFormat
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
