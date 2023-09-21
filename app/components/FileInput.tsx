import React from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'FileInput',
  component: Input,
  description: 'Single file input',
  properties: {
    ...props.props.FileInputProps.props,
    label: { type: 'string' },
    description: { type: 'string' },
    error: { type: 'string' },
  },
  examples: [
    {
      props: {
        type: 'file',
        // indent: true,
      },
    },
    {
      props: {
        type: 'file',
        multiple: true,
        label: 'Add multiple files',
        error: 'This is an error',
        description: 'This is a description',
      },
    },
    {
      props: {
        type: 'file',
        indent: true,
        label: 'Indented File upload',
        description: 'Indentation is nice',
      },
    },
  ],
}

export default example
