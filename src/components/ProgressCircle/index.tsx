import { Style, styled } from 'inlines'
import React, { FC } from 'react'
import { ProgressCircleProps } from '../../types'
import { color as genColor } from '../..'

const invertedStyle = {
  // height: '64px',
  // width: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  // backgroundColor: genColor('background', 'inverted', 'surface'),
}

export const ProgressCircle: FC<ProgressCircleProps> = ({
  value = 0,
  color = 'neutral',
  style,
}) => {
  const barProg = value * 100
  const inverted = color === 'inverted'

  return (
    <styled.div
      style={
        color === 'inverted' ? { ...invertedStyle, ...style } : { ...style }
      }
    >
      <styled.div
        style={{
          margin: '0 auto',
          width: '100%',
          display: 'flex',
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
            stroke={genColor(
              'action',
              inverted ? 'inverted' : 'neutral',
              'subtleNormal'
            )}
            strokeWidth="16"
            pathLength="100"
            opacity={inverted ? 0.2 : 1}
          />

          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={genColor('action', color, 'normal')}
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
