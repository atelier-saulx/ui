import React, { ReactNode, FC } from 'react'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color as useColor } from '../../varsUtilities'
import { prettyDate } from '@based/pretty-date'

export type LogProps = {
  label?: ReactNode
  log?: string
  type?: 'error' | 'warning' | 'log' | 'info' | 'brand'
  ts?: number
  data?: any
  index?: number
}

export const Log: FC<LogProps> = ({ ts, label, log, type, data, index }) => {
  let d = prettyDate(~~(ts / 60e3) * 60e3, 'date-time')

  const date = new Date(ts)
  const result = date
    .toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split(', ')

  const color =
    type === 'error'
      ? 'negative'
      : type === 'warning'
      ? 'warning'
      : type === 'info'
      ? 'brand'
      : 'default'
  return (
    <Text
      style={{
        userSelect: 'text',
        fontSize: 14,
        color: useColor('content', color, 'primary'),
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
            width: '145px',
            userSelect: 'text',
            color: useColor('content', 'default', 'secondary'),
          }}
        >
          {result[1] + ' ' + result[0]}
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
                : type === 'error'
                ? 'negative'
                : 'default',
              'primary'
            ),
          }}
        >
          {log}
        </styled.span>
      </styled.div>
    </Text>
  )
}
