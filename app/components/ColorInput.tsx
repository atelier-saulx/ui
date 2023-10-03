import React from 'react'
import props from '../props.json'
import { Input } from '../../src/components/Input'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Color Input',
  component: Input,
  description: '',
  properties: props.props.ColorInputProps.props,
  examples: [
    {
      props: {
        label: 'color input',
        type: 'color',
        onChange: (v) => {
          console.log(v)
        },
      },
    },
  ],
}

export default example
