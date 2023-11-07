import React, { useState } from 'react'
import { BpMobile, Button, Divider, Input, Logs } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { styled } from 'inlines'
import { faker } from '@faker-js/faker'

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max })

const genLog = (amount) => {
  const tempArr = new Array(amount).fill(null).map(() => ({
    ts: faker.date.anytime().getTime(),
    label: faker.lorem.words(1),
    log: faker.lorem.sentence(randomNumber(3, 24)),
    type: faker.helpers.arrayElement([
      'error',
      'log',
      'warning',
      'info',
      'brand',
      'positive',
    ]),
  }))

  return tempArr
}

const stateData = genLog(10)

const example: ComponentDef = {
  name: 'Logs',
  properties: props.props.LogsTextProps.props,
  component: Logs,
  description: 'Accordions to annoy ppl with on the street',
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const [amount, setAmount] = useState(1)
        const [data, setData] = useState<any[]>(stateData)

        return (
          <div>
            <styled.div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
                [BpMobile]: {
                  flexDirection: 'column',
                },
              }}
            >
              <Input
                step={3}
                min={10}
                label="amount of logs"
                clearButton
                value={amount}
                type="number"
                onChange={(e) => setAmount(e)}
                style={{ maxWidth: '224px' }}
              />
              <Button
                onClick={() => {
                  const x = genLog(amount)
                  setData([...data, ...x])
                }}
                size="small"
              >
                Gen {amount} Log
              </Button>
            </styled.div>
            <Divider style={{ marginBottom: 24 }} />
            <Logs
              style={{
                width: 667,
                height: 500,
              }}
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
