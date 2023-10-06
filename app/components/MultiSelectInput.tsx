import React, { useState } from 'react'
import { IconAlarmClock, Input } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'
import props from '../props.json'

const example: ComponentDef = {
  name: 'MultiSelectInput',
  component: Input,
  description: 'MultiSelectInput ',
  properties: {
    ...props.props.MultiSelectProps.props,
    label: { type: 'string' },
    description: { type: 'string' },
  },
  examples: [
    {
      props: { prefix: 'Identity', placeholder: 'Select more' },
      description: 'Multi-Select MultiSelectInput',
      customRenderer: (props) => {
        const [value, setValue] = useState<any>('')
        const [options] = useState(() =>
          Array.from({ length: 25 }).map((_, i) => ({
            label: faker.person.fullName(),
            value: `id${i}`,
          }))
        )

        return (
          <>
            <Input
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
              options={options}
              {...props}
              type="multi-select"
            />
          </>
        )
      },
    },
    {
      props: { prefix: 'Identity', placeholder: 'Select more' },
      description: 'uncontrolled multiinput',
      customRenderer: (props) => {
        const [options] = useState(() =>
          Array.from({ length: 25 }).map((_, i) => ({
            label: faker.person.fullName(),
            value: `id${i}`,
          }))
        )

        return (
          <>
            <Input options={options} {...props} type="multi-select" />
          </>
        )
      },
    },
  ],
}

export default example
