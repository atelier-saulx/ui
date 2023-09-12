import React from 'react'
import { Pill } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Pill',
  component: Pill,
  description: 'Pill',
  properties: props.props.PillProps.props,
  examples: [
    {
      props: {
        prefix: 'Select',
        label: 'something',
        options: [
          { label: 'Item one', value: 'value1' },
          { label: 'Item two', value: 'value2' },
          { label: 'Item three', value: 'value3' },
        ],
        type: 'select',
      },
    },
    {
      props: {
        filled: true,
        prefix: 'Yes??',
        label: 'YEs?',
        value: true,
        type: 'select',
      },
    },
  ],
}

export default example
