import React, { FC } from 'react'
import { ColorContentColors, styled, color as useColor } from '../../'
import { prettyDate } from '@based/pretty-date'

export type LogProps = {
  label?: string
  log?: string
  type?: ColorContentColors
  ts?: number
}

export const Log: FC<LogProps> = ({ ts, label, log, type }) => {
  let d = prettyDate(~~(ts / 60e3) * 60e3, 'date-time')

  return (
    <styled.div
      style={{
        userSelect: 'text',
        fontSize: 14,
        color: useColor('content', type, 'primary'),
        fontFamily: 'Fira Code',
        display: 'flex',
        '&:hover': {
          background: useColor('action', 'system', 'hover'),
        },
      }}
    >
      {d && (
        <styled.div
          style={{
            userSelect: 'text',
            color: useColor('content', 'default', 'secondary'),
          }}
        >
          {d}
        </styled.div>
      )}
      <styled.div
        style={{
          display: 'flex',
          paddingLeft: 10,
        }}
      >
        <styled.span style={{ color: 'inherit' }}>{label}:</styled.span>
        <styled.span
          style={{
            color: useColor(
              'content',
              type === 'warning'
                ? 'warning'
                : type === 'negative'
                ? 'negative'
                : 'default',
              'primary'
            ),
          }}
        >
          {log}
        </styled.span>
      </styled.div>
    </styled.div>
  )
}
