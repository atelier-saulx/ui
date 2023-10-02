import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'NumberInput',
  component: Input,
  description: 'Number Input',
  properties: {
    style: { type: 'Style' },
    value: { type: 'string' },
    onFocus: { type: 'OnFocus' },
    onBlur: { type: 'OnBlurf' },
    step: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' },
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
        type: 'number',
        placeholder: 'Some Number',
      },
    },
    {
      props: {
        type: 'number',
        placeholder: 'Wow steps and clear stuff',
        min: 0,
        max: 47,
        step: 10,
        clearButton: true,
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
            type="number"
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
