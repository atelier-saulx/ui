import React from 'react'
import { FormGroup } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'FormGroup',
  component: FormGroup,
  description: 'FormGroup Component',
  properties: props.props.FormGroupProps.props,
  examples: [
    {
      props: {
        data: {
          port: {
            type: 'number',
            description: 'Network port',
          },
          'args.name': {
            label: 'Name',
            type: 'text',
            description: 'Instance name',
          },
        },
        values: {
          port: 443,
          args: {
            name: 'hello',
          },
        },
        onChange: (values) => console.info(values),
      },
    },
  ],
}

export default example
