import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { ColorNonSemanticBackgroundColors } from '../../varsTypes'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { HorizontalBar } from './HorizontalBar'
import { VerticalBar } from './VerticalBar'
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

  let allValuesArr = []
  if (nested || stacked) {
    for (let i = 0; i < data.length; i++) {
      let arr = Object.values(data[i].value)
      allValuesArr.push(arr)
    }
  }

  let theLargestValue = Math.max(...allValuesArr.flat())

  let axisValues = []
  if (showAxis) {
    let divideByNo = 4
    let largest = stacked
      ? theLargestValue
      : nested
      ? Math.max(...totalValuesArr)
      : totalValue

    let step = largest / divideByNo

    for (let i = 0; i < divideByNo + 1; i++) {
      axisValues.push(i * step)
    }
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
          {showAxis && direction === 'vertical' && (
            <Yaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
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
                totalValue={theLargestValue}
                valueFormat={valueFormat}
                spacing={spacing}
                direction={direction}
                barWidth={barWidth}
              />
            </div>
          ))}
          {showAxis && direction !== 'vertical' && (
            <Xaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
        </styled.div>
      ) : direction === 'vertical' ? (
        <styled.div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            ...style,
          }}
        >
          {showAxis && (
            <Yaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
          {data.map((item, idx) => (
            <VerticalBar
              key={idx}
              valueFormat={valueFormat}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              color={item.color ? item.color : color}
              spacing={spacing}
              //   barWidth={item.barWidth ? item.barWidth : barWidth}
            />
          ))}
        </styled.div>
      ) : !direction || direction === 'horizontal' ? (
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
              barWidth={item.barWidth ? item.barWidth : barWidth}
              spacing={spacing}
            />
          ))}
          {showAxis && (
            <Xaxis
              axisValues={axisValues}
              spacing={spacing}
              valueFormat={valueFormat}
            />
          )}
        </styled.div>
      ) : (
        <></>
      )}
    </>
  )
}
