import React, { FC, useState } from 'react'
import {
  Style,
  styled,
  Text,
  IconAlertFill,
  Badge,
  ColorBackgroundColors,
} from '~'
import dayjs from 'dayjs'

export type SingleLogItemProps = {
  msg?: string
  status?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  style?: Style
  ts?: number
  type?: string
  label?: string
}

export const SingleLogItem: FC<SingleLogItemProps> = ({
  msg,
  status,
  style,
  ts,
  type,
  label,
}) => {
  return (
    <styled.div
      style={{
        // border: '1px solid yellow',
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
      }}
    >
      <Badge
        light
        color={status}
        icon={IconAlertFill}
        style={{ alignSelf: 'end' }}
      />
      <styled.div
        style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <styled.div style={{ display: 'flex', gap: 10 }}>
          <Text light size={12}>
            {dayjs(ts).format('HH:mm:ss')}
          </Text>
          <Text light size={12}>
            {dayjs(ts).format('DD/MM/YYYY')}
          </Text>
        </styled.div>

        <Text weight="strong" style={{}}>
          {msg}
        </Text>
      </styled.div>
      <Badge style={{ alignSelf: 'end' }} light>
        {label ?? 'db:set'}
      </Badge>
    </styled.div>
  )
}
