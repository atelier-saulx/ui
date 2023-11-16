import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TextAreaInput',
  component: Input,
  description: 'Like a text input... but multiline 🙀',
  properties: {
    autoFocus: { type: 'boolean' },
    clearButton: { type: 'boolean' },
    error: { type: 'string' },
    label: { type: 'string' },
    onChange: { type: 'OnChangeHandler' },
    placeholder: { type: 'string' },
    style: { type: 'Style' },
    value: { type: 'string' },
  },
  examples: [
    {
      props: {
        type: 'textarea',
        placeholder: 'Some text',
        defaultValue: '',
        autoFocus: true,
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
