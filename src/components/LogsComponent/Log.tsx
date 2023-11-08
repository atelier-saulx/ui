import React, { ReactNode, FC } from 'react'
import { Text } from '../Text'
import { Badge } from '../Badge'
import { Status } from '../Status'
import { styled } from 'inlines'
import { color as useColor } from '../../varsUtilities'
import { prettyDate } from '@based/pretty-date'
import { BpMobile, BpSmall } from 'src/utils'

export type LogProps = {
  label?: ReactNode
  log?: string
  type?: 'error' | 'warning' | 'log' | 'info' | 'positive'
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
      : type === 'positive'
      ? 'positive'
      : 'default'
  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 2,
        '&:hover': {
          background: useColor('action', 'system', 'hover'),
        },
        '& div': {
          userSelect: 'text',
          fontFamily: 'Fira Code !important',
          lineHeight: '20px !important',
        },
        [BpMobile]: {
          flexDirection: 'column',
        },
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          [BpMobile]: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-end',
          },
        }}
      >
        {d && (
          <Text
            light
            style={{
              minWidth: '142px',
              marginRight: 16,
              color: useColor(
                'content',
                type === 'warning'
                  ? 'warning'
                  : type === 'error'
                  ? 'negative'
                  : type === 'info'
                  ? 'brand'
                  : type === 'positive'
                  ? 'positive'
                  : 'default',
                'secondary'
              ),
            }}
          >
            {result[1] + ' ' + result[0]}
          </Text>
        )}
        <Badge
          style={{
            textWrap: 'nowrap',
            marginRight: 16,
            marginTop: 3,
            marginBottom: 6,
            borderRadius: 4,
          }}
          light
          color={color}
        >
          {/* {label} */}
          {type}
        </Badge>
      </styled.div>
      <Text
        style={{
          color: useColor(
            'content',
            type === 'warning'
              ? 'warning'
              : type === 'error'
              ? 'negative'
              : type === 'positive'
              ? 'positive'
              : type === 'info'
              ? 'brand'
              : 'default',
            'primary'
          ),
        }}
      >
        {log}
      </Text>
    </styled.div>
  )
}
