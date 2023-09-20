import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'CheckboxInput',
  component: Input,
  description: 'Checkbox input',
  properties: {
    ...props.props.CheckboxInputProps.props,
    label: { type: 'string' },
    error: { type: 'string' },
  },
  examples: [
    {
      props: {
        title: 'Subscribe to our newsletter',
      },
      customRenderer: ({
        title,
        description,
        label,
        error,
        intermediate,
        disabled,
      }) => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            disabled={disabled}
            intermediate={intermediate}
            title={title}
            description={description}
            label={label}
            error={error}
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
    {
      props: {
        title: 'Indeterminate checkbox',
        description: 'Lorem ipusm asd 123',
        intermediate: true,
      },
      customRenderer: ({
        title,
        description,
        label,
        error,
        intermediate,
        disabled,
      }) => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            disabled={disabled}
            intermediate={intermediate}
            title={title}
            description={description}
            label={label}
            error={error}
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
    {
      props: {
        title: 'Disabled Checkbox',
        description: 'Lorem ipusm asd 123',
        disabled: true,
        intermediate: false,
      },
      customRenderer: ({
        title,
        description,
        label,
        error,
        intermediate,
        disabled,
      }) => {
        const [checked, setChecked] = useState(true)
        return (
          <Input
            type="checkbox"
            disabled={disabled}
            intermediate={intermediate}
            title={title}
            description={description}
            label={label}
            error={error}
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },

    {
      props: {
        title: 'Title',
        description: 'Description',
        label: 'This is a label',
        error: 'This is an error',
      },
      customRenderer: ({
        title,
        description,
        label,
        error,
        intermediate,
        disabled,
      }) => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            disabled={disabled}
            intermediate={intermediate}
            title={title}
            description={description}
            label={label}
            error={error}
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
  ],
}

export default example
