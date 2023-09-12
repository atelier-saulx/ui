import React from 'react'
import { Toggle } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Toggle',
  component: Toggle,
  description: 'Toggle button',
  properties: props.props.ToggleProps.props,
  examples: [
    {
      props: {
        size: 'large',
        value: true,
        disabled: false,
      },
    },
    {
      props: {
        size: 'medium',
        value: true,
        onClick: (v) => console.log(v),
        color: 'neutral',
      },
    },
  ],
}

export default example
