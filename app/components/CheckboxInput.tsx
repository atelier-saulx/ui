import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'CheckboxInput',
  component: Input,
  description: 'Checkbox input',
  properties: props.props.InputProps.props,
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            title="Subscribe to our newsletter"
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            intermediate
            title="Intermediate checkbox"
            description="Lorem ipusm asd 123"
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        const [checked, setChecked] = useState(true)
        return (
          <Input
            type="checkbox"
            disabled
            title="Disabled checkbox"
            description="Lorem ipusm asd 123"
            value={checked}
            onChange={(v) => {
              setChecked(v)
            }}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        const [checked, setChecked] = useState(false)
        return (
          <Input
            type="checkbox"
            title="Title"
            description="Description"
            value={checked}
            label="This is a label"
            error="This is an error"
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
