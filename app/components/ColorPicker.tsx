import React from 'react'
import { ColorPicker } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'ColorPicker',
  component: ColorPicker,
  description: '',
  properties: props.props.CodeProps.props,
  examples: [
    {
      props: {
        onChange: (v) => {
          console.log(v)
        },
      },
    },
  ],
}

export default example
