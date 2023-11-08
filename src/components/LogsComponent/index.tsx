import React, { useState } from 'react'
import { LogsText } from './LogsText'
import { LogProps } from './Log'
import { Style, styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Text } from '../Text'
import { Button } from '../Button'
import { BpMobile } from 'src/utils'
import { Counter } from '../Counter'
import { IconDelete } from 'src/icons'

export type LogsProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  style?: Style
  onDelete?: () => void
  showCounters?: boolean
}

export const Logs = ({
  data: dataProp,
  style,
  onDelete,
  showCounters,
}: LogsProps) => {
  const [typeFilter, setTypeFilter] = useState<any>([])
  const [searchFilter, setSearchFilter] = useState('')

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
        minWidth: 324,
        ...style,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          marginBottom: '16px',
          [BpMobile]: {
            flexDirection: 'column',
            alignItems: 'normal',
          },
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
        <Button
          icon={<IconDelete />}
          size="medium"
          color="alert"
          light
          style={{ marginLeft: 'auto' }}
          onClick={onDelete}
        />
      </styled.div>
      {/* counter */}
      {showCounters && (
        <styled.div style={{ display: 'flex', marginBottom: 16, gap: 6 }}>
          <Counter color="informative">{15}</Counter>
          <Counter color="warning">{11}</Counter>
        </styled.div>
      )}

      <LogsText data={data} style={style} />
    </styled.div>
  )
}
