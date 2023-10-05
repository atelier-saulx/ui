import React from 'react'
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
        type: 'checkbox',
        defaultValue: false,
      },
    },
    {
      props: {
        title: 'Indeterminate checkbox',
        description: 'Lorem ipusm asd 123',
        intermediate: true,
        type: 'checkbox',
        defaultValue: false,
      },
    },
    {
      props: {
        title: 'Disabled Checkbox',
        description: 'Lorem ipusm asd 123',
        disabled: true,
        intermediate: false,
        type: 'checkbox',
        defaultValue: true,
      },
    },

    {
      props: {
        title: 'Title',
        description: 'Description',
        label: 'This is a label',
        error: 'This is an error',
        type: 'checkbox',
        defaultValue: true,
      },
    },
  ],
}

export default example
