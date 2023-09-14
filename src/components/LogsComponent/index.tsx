import React, { FC, useState } from 'react'
import {
  ScrollArea,
  Style,
  styled,
  Text,
  color,
  IconAlertFill,
  Badge,
  ColorBackgroundColors,
  Button,
  IconMoreHorizontal,
  BpTablet,
} from '../..'
import dayjs from 'dayjs'

type LogsProps = {
  data?: SingleLogItemProps[]
  style?: Style
  // top to bottom // reverse order
  // autoscroll?
  // infinite scroll ,
  // behaviour to start at bottom
  //  clear logs option
  // group per time --> and type
}

type SingleLogItemProps = {
  msg?: string
  status?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  style?: Style
  ts?: number
  type?: string
  label?: string
}

const SingleLogItem: FC<SingleLogItemProps> = ({
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

export const Logs: FC<LogsProps> = ({ data, style }) => {
  return (
    <styled.div>
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          // border: '1px solid red',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text size={24} weight="strong">
          Logs
        </Text>
        <Button
          color="neutral"
          size="xsmall"
          icon={<IconMoreHorizontal />}
          style={{
            '&:hover': {
              backgroundColor: color('action', 'system', 'hover'),
            },
            [BpTablet]: {
              '&:hover': null,
            },
            '&:active': {
              backgroundColor: color('action', 'system', 'active'),
            },
          }}
        />
      </styled.div>
      <ScrollArea
        style={{
          maxHeight: 500,
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          ...style,
        }}
      >
        {/* Work in progress 🌲 */}
        {data?.map((item, idx) => (
          <SingleLogItem
            msg={item.msg}
            status={item.status}
            ts={item.ts}
            type={item.type}
            style={item.style}
            key={idx}
          />
        ))}
      </ScrollArea>
    </styled.div>
  )
}
