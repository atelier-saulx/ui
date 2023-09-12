import React from 'react'
import { RadioButtons } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Radiobuttons',
  component: RadioButtons,
  description: 'Radiobuttons',
  properties: props.props.RadioButtonsProps.props,
  examples: [
    {
      props: {
        data: [
          { label: 'Radio1', value: 1, description: 'hwlloe 1' },
          { label: 'Radio2', value: 2, description: 'hwlloe 2' },
        ],
        onChange: (v) => console.log(v),
      },
    },
  ],
}

export default example
