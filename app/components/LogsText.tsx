import React, { useState } from 'react'
import { LogsText, Button, Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const stateData = [
  {
    log: 'thisisalog',
    ts: 123123,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 123121233,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 123123,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 123123,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 123123123123,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 1234123412341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234123412341,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234123412341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234123412341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 12341234123412341234,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 1233333333333333333331,
    type: 'info',
    label: 'service 1',
  },
  {
    log: 'thisisalog',
    ts: 1233333333333333333331,
    type: 'info',
    label: 'service 1',
  },
]

const example: ComponentDef = {
  name: 'LogsText',
  properties: props.props.LogsTextProps.props,
  component: LogsText,
  description: 'Accordions to annoy ppl with on the street',
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const [amount, setAmount] = useState(1)
        const [data, setData] = useState(stateData)
        const [type, setType] = useState('info')

        const genLog = (amount, type) => {
          const tempArr = [] as any
          for (let i = 0; i < amount; i++) {
            tempArr.push({
              ts: Math.floor(100000000 + Math.random() * 900000000),
              log: 'log texct lorem ',
              type: type,
              label: 'LOGWOW',
            })
          }
          setData([...data, ...tempArr])
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginBottom: 20,
              }}
            >
              <Input
                value={type}
                type="select"
                onChange={(e) => setType(e)}
                options={[
                  { label: 'Warning', value: 'warning' },
                  { label: 'Info', value: 'info' },
                  { label: 'Error', value: 'error' },
                  { label: 'Log', value: 'log' },
                ]}
              />
              <Input
                type="number"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                style={{ width: '100px' }}
              />
            </div>
            <Button onClick={() => genLog(amount, type)}>
              Gen {amount} Log
            </Button>
            <LogsText
              // autoScroll
              style={{ width: 374, height: 400 }}
              //@ts-ignore
              data={data}
            />
          </div>
        )
      },
    },
  ],
}

export default example
