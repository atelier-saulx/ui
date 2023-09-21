import React from 'react'
import { Slider, BpMobile } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Slider',
  component: Slider,
  description: 'Range Slider you can also use keyboard arrow keys',
  properties: props.props.SliderProps.props,
  examples: [
    {
      props: {
        style: { [BpMobile]: { transform: 'scale(0.75)' } },
        data: [
          { id: 'flip', title: 'Flippie', index: 0 },
          { id: 'flap', title: 'Flap', index: 1 },
          { id: 'Flurp', title: 'Flupr', index: 2 },
        ],
      },
    },
    {
      props: {
        style: { [BpMobile]: { transform: 'scale(0.75)' } },
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
