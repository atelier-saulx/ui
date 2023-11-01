import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text } from '../Text'
import { color as genColor } from '../../varsUtilities'
import { ColorNonSemanticBackgroundColors } from '../../varsTypes'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { transparent } from '../ColorPicker/bg'

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
}

const HorizontalBar = ({ valueFormat, label, value, percentage, color }) => {
  return (
    <styled.div
      style={{ display: 'flex', marginBottom: 4, alignItems: 'center' }}
    >
      <styled.div style={{ width: '100%' }}>
        <styled.div
          style={{
            borderRadius: 3,
            backgroundColor: genColor(
              'nonSemanticBackground',
              color || 'magenta',
              'muted'
            ),
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            width: `${percentage.toFixed()}%`,
          }}
        >
          <Text selectable="none" weight="medium">
            {label}
          </Text>
        </styled.div>
      </styled.div>
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: 26,
          whiteSpace: 'nowrap',
          width: 28,
        }}
      >
        <Text selectable="none" weight="medium">
          {valueFormat !== 'percentages'
            ? prettyNumber(value, valueFormat)
            : percentage.toFixed(1) + '%'}
        </Text>
      </styled.div>
    </styled.div>
  )
}

const VerticalBar = ({ valueFormat, label, value, percentage, color }) => {
  return (
    <styled.div style={{ marginRight: 4, textAlign: 'center' }}>
      <styled.div
        style={{
          height: '100%',
          minHeight: 278,
          display: 'flex',
          flexFlow: 'wrap-reverse',
          marginBottom: 8,
        }}
      >
        <styled.div
          style={{
            backgroundColor: genColor(
              'nonSemanticBackground',
              color || 'magenta',
              'muted'
            ),
            borderRadius: 3,
            height: `${percentage.toFixed()}%`,
            padding: '4px 8px',
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 32,
          }}
        >
          <Text
            selectable="none"
            weight="medium"
            style={{
              bottom: 26,
              display: 'block',
              left: 0,
              right: 0,
              position: 'absolute',
              transform: 'rotate(-90deg)',
            }}
          >
            {label}
          </Text>
        </styled.div>
      </styled.div>

      <Text selectable="none" weight="medium">
        {valueFormat !== 'percentages'
          ? prettyNumber(value, valueFormat)
          : percentage.toFixed(1) + '%'}
      </Text>
    </styled.div>
  )
}

const CustomWidthBars = ({ percentage, color, noOfItems, index, barWidth }) => {
  let transparentHeight = 100 / noOfItems

  return (
    <styled.div
      style={{
        height: barWidth < 24 ? `${transparentHeight}%` : `${barWidth}px`,
        top:
          barWidth < 24
            ? `${transparentHeight * index}%`
            : `${barWidth * index}px`,
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <styled.div
        style={{
          marginLeft: 12,
          height: barWidth,
          width: `${percentage.toFixed()}%`,
          backgroundColor: genColor(
            'nonSemanticBackground',
            color || 'magenta',
            'muted'
          ),
        }}
      />
    </styled.div>
  )
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  direction,
  style,
  valueFormat = 'percentages',
  color,
  barWidth,
}) => {
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)
  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
  }))

  console.log(data.length, 'length ??🐨')

  return (
    <>
      {!barWidth && direction === 'vertical' ? (
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
              <CustomWidthBars
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
