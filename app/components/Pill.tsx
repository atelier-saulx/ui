import React, { useState } from 'react'
import { Pill } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'Pill',
  component: Pill,
  description: 'Pill ',
  properties: {},
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState<string>('')
        const [options] = useState(() =>
          Array.from({ length: 25 }).map((_, i) => ({
            label: faker.person.fullName(),
            value: `id${i}`,
          }))
        )

        return (
          <Pill
            prefix="lala"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            options={options}
            placeholder="Select one"
          />
        )
      },
    },
  ],
}

export default example
