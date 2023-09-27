import React from 'react'
import { Settings } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Settings',
  component: Settings,
  description: 'Settings component',
  properties: props.props.SliderProps.props,
  examples: [
    {
      props: {
        data: [
          { id: 'flip', title: 'Flippie', index: 0 },
          { id: 'flap', title: 'Flap', index: 1 },
          { id: 'Flurp', title: 'Flupr', index: 2 },
        ],
      },
    },
    {
      props: {
        min: 0,
        max: 60,
        steps: 5,
        onChange: (v) => console.log(v),
        color: 'alert',
        valueFormat: 'number-dollar',
      },
    },
  ],
}

export default example
