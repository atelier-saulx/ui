import React, { useState } from 'react'
import { LogsText } from './LogsText'
import { LogProps } from './Log'
import { Style, styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Text } from '../Text'
import { Button } from '../Button'
import { BpMobile } from '../../utils'
import { Counter } from '../Counter'
import { IconDelete } from '../../icons'
import { Tooltip } from '../Tooltip'

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

  const counterData = {
    error: 0,
    warning: 0,
    log: 0,
    info: 0,
    positive: 0,
  }

  dataProp.map((item) => (counterData[item.type] += 1))

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
          ]}
        />
        <Tooltip text="Clear logs" position="top">
          <Button
            icon={<IconDelete />}
            size="medium"
            color="alert"
            light
            style={{
              marginLeft: 'auto',
              [BpMobile]: {
                marginTop: '-52px',
                marginRight: '4px',
              },
            }}
            onClick={onDelete}
          />
        </Tooltip>
      </styled.div>
      {/* counter */}
      {showCounters && (
        <styled.div
          style={{
            display: 'flex',
            marginBottom: 16,
            gap: 6,
            marginTop: '-4px',
            [BpMobile]: {
              justifyContent: 'center',
            },
          }}
        >
          {Object.entries(counterData)
            .filter((item) => item[1] !== 0)
            .map((item, idx) => (
              <Counter
                key={idx}
                light
                // @ts-ignore
                color={
                  item[0] === 'log'
                    ? 'default'
                    : item[0] === 'info'
                    ? 'brand'
                    : item[0] === 'error'
                    ? 'red'
                    : item[0]
                }
              >
                {item[1]}
              </Counter>
            ))}
        </styled.div>
      )}

      <LogsText data={data} style={style} />
    </styled.div>
  )
}
