import React, { FC, useState } from 'react'
import { ScrollArea, Style, styled, Text, color } from '../..'
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
  status?: string
  style?: Style
  ts?: number
  type?: string
}

const SingleLogItem: FC<SingleLogItemProps> = ({
  msg,
  status,
  style,
  ts,
  type,
}) => {
  return (
    <styled.div>
      <styled.div style={{ display: 'flex', gap: 10 }}>
        <Text light size={12}>
          {dayjs(ts).format('HH:mm:ss')}
        </Text>
        <Text light size={12}>
          {dayjs(ts).format('DD/MM/YYYY')}
        </Text>
      </styled.div>

      <Text weight="strong">{msg}</Text>
    </styled.div>
  )
}

export const Logs: FC<LogsProps> = ({ data, style }) => {
  return (
    <ScrollArea
      style={{ maxHeight: 500, width: 600, border: '1px solid red', ...style }}
    >
      Work in progress 🌲
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
  )
}
