import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'SelectInput',
  component: Input,
  description: 'Select input',
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
          <Input
            type="select"
            label="This is a label"
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
          <Input
            type="select"
            label="This is a searchable select"
            searchable
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
