import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'
import props from '../props.json'

const example: ComponentDef = {
  name: 'NumberInput',
  component: Input,
  description: 'Number Input',
  properties: {
    autoFocus: { type: 'boolean' },
    clearButton: { type: 'boolean' },
    description: { type: 'string' },
    error: { type: 'boolean' },
    integer: { type: 'boolean' },
    label: { type: 'string' },
    max: { type: 'number' },
    message: { type: 'ReactNode' },
    min: { type: 'number' },
    onBlur: { type: 'OnBlurf' },
    onChange: { type: 'OnChangeHandler' },
    onFocus: { type: 'OnFocus' },
    placeholder: { type: 'string' },
    step: { type: 'number' },
    style: { type: 'Style' },
    value: { type: 'string' },
    // suffix: { ...props.props.BadgeProps.props },
    // prefix: { ...props.props.BadgeProps.props },
  },
  examples: [
    {
      props: {
        defaultValue: 12,
        label: 'This is a label',
        autoFocus: true,
        type: 'number',
        placeholder: 'Some Number',
        onChange: (e) => console.log(e, typeof e),
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
