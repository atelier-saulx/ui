import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TextAreaInput',
  component: Input,
  description: 'Like a text input... but multiline 🙀',
  properties: {
    style: { type: 'Style' },
    value: { type: 'string' },
    onChange: { type: 'OnChangeHandler' },
    label: { type: 'string' },
    error: { type: 'string' },
    placeholder: { type: 'string' },
    clearButton: { type: 'boolean' },
  },
  examples: [
    {
      props: {
        type: 'textarea',
        placeholder: 'Some text',
        defaultValue: '',
      },
    },
    {
      props: {
        label: 'This is a label',
        placeholder: 'advanced',
        error: 'This is an error',
        type: 'textarea',
        defaultValue: 'default value 123',
        maxLength: 50,
      },
    },
  ],
}

export default example
