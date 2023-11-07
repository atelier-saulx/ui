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
}

export const Logs = ({ data: dataProp, style }: LogsProps) => {
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
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <Text size={24} weight="strong" style={{ marginRight: '24px' }}>
          Logs
        </Text>
        <Input
          type="search"
          placeholder="Search logs"
          value={searchFilter}
          onChange={(v) => setSearchFilter(v)}
        />
      </styled.div>
      {console.log(typeFilter)}
      <Pill
        style={{ maxWidth: '200px', marginBottom: '16px' }}
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
          // { value: 'brand', label: 'Brand' },
        ]}
      />
      <LogsText data={data} style={style} />
    </styled.div>
  )
}
