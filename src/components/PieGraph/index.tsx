import React, { FC, useState } from 'react'
import { styled, Style, color, Text, ColorNonSemanticBackgroundColors } from '~'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

export type PieGraphSingleItem = {
  label: string
  value: number
  color?: ColorNonSemanticBackgroundColors
  [key: string]: any
}

type PieGraphProps = {
  data: PieGraphSingleItem[]
  valueFormat?: 'percentages' | NumberFormat
  style?: Style
}

const colorArray: ColorNonSemanticBackgroundColors[] = [
  'grey',
  'violet',
  'red',
  'raspberry',
  'magenta',
  'purple',
  'grape',
  'blue',
  'cyan',
  'teal',
  'aquamarine',
  'green',
  'white',
  'emerald',
  'orange',
]

export const PieGraph: FC<PieGraphProps> = ({
  data,
  valueFormat = 'percentages',
  style,
}) => {
  const [featured, setFeatured] = useState<{
    label: string
    percentage: number
    value: number
  }>()
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)

  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
    degrees: 0,
  }))

  // rotating degrees
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      data[i].degrees = -90
    } else {
      data[i].degrees = data[i - 1].percentage * 3.6 + data[i - 1].degrees
    }
  }

  const objectWithLargestValue = data.reduce(function (prev, current) {
    return prev.value > current.value ? prev : current
  })

  // if biggest strokeWidth = 32 and smallest 22
  const onePercentSmallestStrokeWidth = objectWithLargestValue.value / 100

  data = data.map((item) => ({
    ...item,
    strokeWidth:
      Math.round(item.value / onePercentSmallestStrokeWidth) / 10 + 22,
  }))

  return (
    <div>
      <styled.div
        style={{
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          width: 264,
          height: 264,
          marginTop: 32,
          ...style,
        }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 120 120"
          style={{
            overflow: 'visible',
          }}
        >
          {data.map((item, idx) => {
            return (
              <circle
                onMouseEnter={() => {
                  setFeatured({
                    label: item.label,
                    percentage: item.percentage,
                    value: item.value,
                  })
                }}
                onMouseLeave={() => setFeatured(undefined)}
                key={idx}
                cx="60"
                cy="60"
                r="64"
                fill="none"
                stroke={color(
                  'nonSemanticBackground',
                  item?.color || colorArray[idx] || 'violet',
                  'strong'
                )}
                strokeWidth={item.strokeWidth}
                strokeDasharray={100}
                pathLength="100"
                strokeDashoffset={100 - item.percentage + 0.5}
                style={{
                  transform: `rotate(${item.degrees}deg)`,
                  transformOrigin: '60px 60px',
                  opacity: featured && item.label !== featured.label ? 0.4 : 1,
                }}
              />
            )
          })}
        </svg>
        <styled.div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            inset: '0px',
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <Text weight="strong" size={32}>
            {featured
              ? valueFormat !== 'percentages'
                ? prettyNumber(featured.value, valueFormat)
                : featured?.percentage.toFixed(1) + '%'
              : valueFormat !== 'percentages'
              ? prettyNumber(objectWithLargestValue.value, valueFormat)
              : objectWithLargestValue.percentage.toFixed(1) + '%'}
          </Text>
          <Text weight="strong" size={12}>
            {featured ? featured?.label : objectWithLargestValue.label}
          </Text>
        </styled.div>
      </styled.div>

      <styled.div
        style={{ display: 'flex', gap: 20, justifyContent: 'center' }}
      >
        {data.map((item, idx) => (
          <styled.div
            style={{ display: 'flex', gap: 6, alignItems: 'center' }}
            key={idx}
          >
            <styled.div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: color(
                  'nonSemanticBackground',
                  item?.color || colorArray[idx] || 'violet',
                  'strong'
                ),
              }}
            />
            <Text size={12} weight="medium" truncate>
              {item.label}
            </Text>
          </styled.div>
        ))}
      </styled.div>
    </div>
  )
}
