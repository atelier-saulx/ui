import React from 'react'
import { SegmentedControl } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SegmentedControl',
  component: SegmentedControl,
  description: '',
  properties: props.props.SegmentedControlProps.props,
  examples: [
    {
      props: {
        data: [2, '15d', 'Option', 'Option 2'],
        onChange: (v) => console.log(v),
      },
    },
  ],
}

export default example
