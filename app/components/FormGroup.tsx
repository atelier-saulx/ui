import React from 'react'
import { FormGroup, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const fieldProps = {
  id: 1337,
  values: { array: [['asd', 'asd', ''], ['asd']], text: 'asd' },
  config: {
    array: {
      type: 'array',
      values: {
        type: 'array',
        values: {
          type: 'string',
        },
      },
    },
    text: {
      type: 'text',
    },
  },

  onChange: (values) => console.info(values),
}

const example: ComponentDef = {
  name: 'FormGroup',
  component: FormGroup,
  description: 'FormGroup Component, can be grid or column',
  properties: {}, //props.props.FormGroupProps.props,
  examples: [
    // {
    //   props: {
    //     ...fieldProps,
    //     variant: 'grid',
    //     autoFocus: true,
    //   },
    // },
    {
      name: 'Column',
      description: 'Same form displayed as a colum',
      props: {
        ...fieldProps,
        style: {
          width: 750,
        },
        variant: 'column',
      },
    },
    {
      name: 'Column',
      description: 'Same modified accept buttons',
      props: {
        ...fieldProps,
        style: {
          width: 750,
        },
        confirmationLabel: 'Add user',
        variant: 'column',
      },
    },
  ],
}

export default example
