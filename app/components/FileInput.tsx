import React from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'FileInput',
  component: Input,
  description: 'Single file input',
  properties: props.props.FileInputProps.props,
  examples: [
    {
      props: {
        type: 'file',
      },
    },
    {
      props: {
        type: 'file',
        multiple: true,
        label: 'Add multiple fiels',
      },
    },
  ],
}

export default example
