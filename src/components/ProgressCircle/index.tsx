import React, { FC, useState } from 'react'
import { color as genColor } from '../../varsUtilities'
import { ColorContentColors } from '../../varsTypes'
import { Style, styled } from 'inlines'

export type ProgressCircleProps = {
  color?: ColorContentColors
  style?: Style
  loading?: boolean
  // value is progress in decimal 1 === complete
  value?: number
}

export const ProgressCircle: FC<ProgressCircleProps> = ({
  value = 0,
  color = 'default',
  loading,
  style,
}) => {
  const [newValue, setNewValue] = useState(value)

  const barProg = loading ? 66 : newValue * 100
  const inverted = color === 'inverted'

  return (
    <styled.div style={style}>
      <styled.div
        style={{
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          '& svg': {
            width: '16px',
            height: '16px',
          },
          '@keyframes': {
            from: {
              transform: 'rotate(0deg)',
            },
            to: {
              transform: loading ? 'rotate(360deg)' : 'rotate(0deg)',
            },
          },
          animationDuration: loading ? '0.45s' : 'unset',
          animationFillMode: loading ? 'forwards' : 'unset',
          animationTimingFunction: loading ? 'linear' : 'unset',
          animationIterationCount: loading ? 'infinite' : 'unset',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 120 120"
          style={{
            transform: 'rotate(-90deg)',
            overflow: 'visible',
            margin: '0 auto',
          }}
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={genColor('content', color)}
            strokeWidth="16"
            pathLength="100"
            opacity={0.2}
          />

          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={genColor('content', color)}
            strokeWidth="16"
            strokeDasharray={100}
            pathLength="100"
            strokeDashoffset={100 - barProg}
            strokeLinecap="round"
          />
        </svg>
      </styled.div>
    </styled.div>
  )
}
