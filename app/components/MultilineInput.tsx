import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Multiline Input',
  component: Input,
  description: 'Like a text input... but multiline 🙀',
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
        type: 'multiline',
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
            type="multiline"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            maxLength={16}
            {...props}
          />
        )
      },
    },
  ],
}

export default example
