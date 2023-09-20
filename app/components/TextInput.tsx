import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TextInput',
  component: Input,
  description: 'Text Input',
  properties: {
    style: { type: 'Style' },
    value: { type: 'string' },
    onChange: { type: 'OnChangeHandler' },
    label: { type: 'string' },
    error: { type: 'string' },
    placeholder: { type: 'string' },
    clearButton: { type: 'boolean' },
  },
  examples: [
    {
      props: {
        type: 'text',
        placeholder: 'Some text',
      },
    },
    {
      props: {
        label: 'This is a label',
        placeholder: 'advanced',
        error: 'This is an error',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="text"
            // clearButton={false}
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            {...props}
          />
        )
      },
    },
  ],
}

export default example
