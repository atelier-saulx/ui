import React, { useState } from 'react'
import { LogsText } from './LogsText'
import { LogProps } from './Log'
import { Style, styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Text } from '../Text'

export type LogsProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  style?: Style
  autoScroll?: boolean
}

export const Logs = ({ data: dataProp, style, autoScroll }: LogsProps) => {
  const [typeFilter, setTypeFilter] = useState<any>([])
  const [searchFilter, setSearchFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')

  const data = dataProp
    .filter(
      typeFilter.length !== 0
        ? (item) => typeFilter.includes(item.type)
        : (item) => item
    )
    .filter(
      searchFilter !== ''
        ? (item) => item.log.includes(searchFilter)
        : (item) => item
    )

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: '16px',
        }}
      >
        {/* <Text size={24} weight="strong" style={{ marginRight: '24px' }}>
          Logs
        </Text> */}
        <div style={{ maxWidth: 320 }}>
          <Input
            type="search"
            placeholder="Search logs"
            value={searchFilter}
            onChange={(v) => setSearchFilter(v)}
          />
        </div>

        <Pill
          style={{ maxWidth: '200px', padding: '8px 16px', borderRadius: 8 }}
          value={typeFilter}
          onChange={(v) => setTypeFilter(v)}
          prefix="Logs Type"
          placeholder="All"
          type="multi"
          options={[
            { value: 'error', label: 'Error' },
            { value: 'warning', label: 'Warning' },
            { value: 'log', label: 'Log' },
            { value: 'info', label: 'Info' },
            { value: 'positive', label: 'Positive' },
            // { value: 'brand', label: 'Brand' },
          ]}
        />
      </styled.div>

      <LogsText data={data} style={style} autoScroll={autoScroll} />
    </styled.div>
  )
}
