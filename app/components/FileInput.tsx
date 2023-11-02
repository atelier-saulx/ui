import React from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'FileInput',
  component: Input,
  description: 'Single file input',
  properties: {},
  examples: [
    {
      props: {
        type: 'file',
        label: 'Avatar',
        onChange: (value) => {
          console.log(value)
        },
      },
    },
  ],
}

export default example
