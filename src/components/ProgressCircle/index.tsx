import React, { FC, useState, useEffect } from 'react'
import { color as genColor, ColorActionColors, Style, styled } from '../..'

const invertedStyle = {
  // height: '64px',
  // width: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  // backgroundColor: genColor('background', 'inverted', 'surface'),
}

export type ProgressCircleProps = {
  color?: ColorActionColors
  style?: Style
  loading?: boolean
  // value is progress in decimal 1 === complete
  value?: number
}

export const ProgressCircle: FC<ProgressCircleProps> = ({
  value = 0,
  color = 'neutral',
  loading,
  style,
}) => {
  const [newValue, setNewValue] = useState(value)

  const barProg = newValue * 100
  const inverted = color === 'inverted'

  // non stop loading animation
  const [loadingCounter, setLoadingCounter] = useState<number>(0)

  if (loading) {
    if (loadingCounter < 1) {
      setTimeout(() => {
        setLoadingCounter(loadingCounter + 0.04)
      }, 24)
    } else {
      setLoadingCounter(0)
    }
  }

  useEffect(() => {
    setNewValue(loadingCounter)
  }, [loadingCounter])

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
          '& svg': {
            width: '16px',
            height: '16px',
          },
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
