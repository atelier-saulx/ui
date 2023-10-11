import React, { useState } from 'react'
import { IconAlarmClock, Pill } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'
import props from '../props.json'

const example: ComponentDef = {
  name: 'Pill',
  component: Pill,
  description: 'Pill ',
  properties: {
    ...props.props.SelectPillProps.props,
    ...props.props.BooleanPillProps.props,
  },
  examples: [
    {
      props: { prefix: 'Identity', placeholder: 'Select one' },
      description: 'Single-Select Pill',
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
            <Pill
              value={value}
              onChange={(v) => {
                setValue(v)
                // console.log(v)
              }}
              options={options}
              {...props}
              type="select"
            />
          </>
        )
      },
    },
    {
      props: { prefix: 'Identity', placeholder: 'Select more' },
      description: 'Multi-Select Pill',
      customRenderer: (props) => {
        const [options] = useState(() =>
          Array.from({ length: 25 }).map((_, i) => ({
            label: faker.person.fullName(),
            value: `id${i}`,
          }))
        )

        return (
          <>
            <Pill options={options} {...props} type="multi" />
          </>
        )
      },
    },
    {
      description: 'Boolean Pill',
      props: {
        type: 'boolean',
        // icon: <IconAlarmClock />,
        defaultValue: true,
        onChange: (e) => console.log(e),
      },
    },
  ],
}

export default example
