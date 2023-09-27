import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TextInput',
  component: Input,
  description: 'Text Input',
  properties: {
    style: { type: 'Style' },
    value: { type: 'string' },
    onFocus: { type: 'OnFocus' },
    onBlur: { type: 'OnBlurf' },
    onChange: { type: 'OnChangeHandler' },
    label: { type: 'string' },
    error: { type: 'boolean' },
    placeholder: { type: 'string' },
    clearButton: { type: 'boolean' },
    message: { type: 'ReactNode' },
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
        error: true,
        message: 'Hello this is wrong!',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="text"
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
    {
      props: {
        type: 'password',
        placeholder: 'Type password',
      },
    },
  ],
}

export default example
