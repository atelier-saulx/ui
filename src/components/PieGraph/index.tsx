import React, { FC } from 'react'
import { styled, Style, color } from '../..'

type PieGraphProps = {
  data?: any
}

export const PieGraph: FC<PieGraphProps> = ({ data }) => {
  const totalValue = data.map((item) => item.value).reduce((a, b) => a + b, 0)

  // percentages
  data = data.map((item) => ({
    ...item,
    percentage: Math.round((item.value / totalValue) * 100),
    degrees: 0,
  }))

  // rotating degrees
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      data[i].degrees = 0
    } else {
      data[i].degrees = data[i - 1].percentage * 3.6 + data[i - 1].degrees
    }
  }

  console.log(totalValue)

  console.log('🍰', data)

  let colorTest = ['blue', 'red', 'emerald', 'orange']

  return (
    <styled.div
      style={{
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        '& svg': {
          width: '200px',
          height: '200px',
        },
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 142 142"
        style={{
          overflow: 'visible',
        }}
      >
        <circle
          cx="60"
          cy="60"
          r="64"
          fill="none"
          // stroke={color('action', 'primary', 'normal')}
          stroke="#FFF"
          strokeWidth="32"
          pathLength="100"
        />

        {data.map((item, idx) => {
          return (
            <circle
              key={idx}
              cx="60"
              cy="60"
              r="64"
              fill="none"
              stroke={color('nonSemanticBackground', colorTest[idx], 'strong')}
              strokeWidth="24"
              strokeDasharray={100}
              pathLength="100"
              strokeDashoffset={100 - item.percentage}
              style={{
                transform: `rotate(${item.degrees}deg)`,
                transformOrigin: '60px 60px',
              }}
            />
          )
        })}

        {/* <circle
          cx="60"
          cy="60"
          r="64"
          fill="none"
          stroke={color('action', 'primary', 'normal')}
          strokeWidth="32"
          strokeDasharray={100}
          pathLength="100"
          strokeDashoffset={50}
        />

        <circle
          cx="60"
          cy="60"
          r="64"
          fill="none"
          stroke={color('nonSemanticBackground', 'magenta', 'strong')}
          strokeWidth="24"
          strokeDasharray={100}
          pathLength="100"
          strokeDashoffset={75}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
        />

        <circle
          cx="60"
          cy="60"
          r="64"
          fill="none"
          stroke={color('nonSemanticBackground', 'emerald', 'strong')}
          strokeWidth="24"
          strokeDasharray={100}
          pathLength="100"
          strokeDashoffset={75}
          style={{ transform: 'rotate(180deg)', transformOrigin: '60px 60px' }}
        /> */}
      </svg>
    </styled.div>
  )
}
