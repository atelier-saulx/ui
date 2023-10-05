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
      customRenderer: (props) => {
        const [value, setValue] = useState<string>('')
        const [options] = useState(() =>
          Array.from({ length: 25 }).map((_, i) => ({
            label: faker.person.fullName(),
            value: `id${i}`,
          }))
        )

        return (
          //TODO help
          <>
            <Pill
              value={value}
              onChange={(v) => {
                setValue(v)
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
