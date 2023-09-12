import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SearchInput',
  component: Input,
  description: 'Text Input',
  properties: {
    value: { type: 'string' },
    placeholder: { type: 'string' },
  },
  examples: [
    {
      props: {
        placeholder: 'fun',
      },
      customRenderer: (props) => {
        return <Input type="search" {...props} />
      },
    },
    {
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="search"
            label="You can add a clear button"
            clearButton
            placeholder="Search"
            value={value}
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
            type="search"
            label="You can add a label"
            error="and an error if you really want"
            placeholder="Search"
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
