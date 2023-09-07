import React, { FC } from 'react'
import {
  ColorNonSemanticBackgroundColors,
  styled,
  Style,
  Text,
  color as genColor,
} from '../..'

type BarGraphSingleItem = {
  label: string
  value: number
  color?: ColorNonSemanticBackgroundColors
  [key: string]: any
}

type BarGraphProps = {
  data: BarGraphSingleItem[]
  display?: 'percentages' | 'values'
  direction?: 'horizontal' | 'vertical'
  style?: Style
}

const HorizontalBar = ({ display, label, value, percentage, color }) => {
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
          <Text weight="medium">{label}</Text>
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
        <Text weight="medium">
          {display === 'values' ? value : percentage.toFixed(1) + '%'}
        </Text>
      </styled.div>
    </styled.div>
  )
}

const VerticalBar = ({ display, label, value, percentage, color }) => {
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

      <Text weight="medium">
        {display === 'values' ? value : percentage.toFixed(1) + '%'}
      </Text>
    </styled.div>
  )
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  display,
  direction = 'horizontal',
  style,
}) => {
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)
  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
  }))

  return (
    <styled.div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'row' : 'column',
        ...style,
      }}
    >
      {direction === 'vertical'
        ? data.map((item, idx) => (
            <VerticalBar
              key={idx}
              display={display}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              color={item.color}
            />
          ))
        : data.map((item, idx) => (
            <HorizontalBar
              key={idx}
              display={display}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
              color={item.color}
            />
          ))}
    </styled.div>
  )
}
