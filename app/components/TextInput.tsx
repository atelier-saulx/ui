import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TextInput',
  component: Input,
  description: 'Text Input',
  properties: {},
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="text"
            value={value}
            placeholder="Simple"
            onChange={(v) => {
              setValue(v)
            }}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="text"
            label="This is a label"
            placeholder="Advanced"
            error="This is an error"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
          />
        )
      },
    },
  ],
}

export default example
