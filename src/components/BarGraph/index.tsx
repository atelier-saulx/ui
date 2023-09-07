import React, { FC } from 'react'
import {
  ColorNonSemanticBackgroundColors,
  styled,
  Style,
  Text,
  color,
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

  const HorizontalBar = ({ label, value, percentage }) => {
    return (
      <styled.div
        style={{ display: 'flex', marginBottom: 4, alignItems: 'center' }}
      >
        <styled.div style={{ width: '100%' }}>
          <styled.div
            style={{
              borderRadius: 3,
              backgroundColor: color(
                'nonSemanticBackground',
                'magenta',
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

  return (
    <styled.div style={{ width: '100%', ...style }}>
      {data.map((item, idx) => (
        <HorizontalBar
          key={idx}
          label={item.label}
          value={item.value}
          percentage={item.percentage}
        />
      ))}
    </styled.div>
  )
}
