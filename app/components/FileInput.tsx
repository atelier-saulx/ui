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
    error: { type: 'boolean' },
  },
  examples: [
    {
      props: {
        type: 'file',
        // indent: true,
        accept: ['image/png'],
      },
    },
    {
      props: {
        type: 'file',
        multiple: true,
        label: 'Add multiple files',
        error: 'This is an error',
        description: 'This is a description',
        accept: ['image/jpeg'],
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
