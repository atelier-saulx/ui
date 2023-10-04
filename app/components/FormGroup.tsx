import React from 'react'
import { FormGroup, Button } from '../../src'
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
        config: {
          port: {
            type: 'number',
            description: 'Network port',
          },
          'args.name': {
            label: 'Name',
            type: 'text',
            description: 'Instance name',
          },
          'args.x.y': {
            label: 'Status',
            description: 'status time',
            options: ['good', 'bad', 'medium'],
            props: {
              placeholder: 'FLAP',
              style: {
                transform: 'rotate(3deg)',
              },
            },
          },
          range: {
            label: 'Bla',
            description: 'hello',
            type: 'range',
          },
          custom: {
            label: 'Status',
            description: 'status time',
            type:
              () =>
              ({ onChange, value }) => {
                return (
                  <Button
                    onClick={() => {
                      onChange('custom', { x: value.x + 1 })
                    }}
                  >
                    bla {value.x}
                  </Button>
                )
              },
          },
        },
        values: {
          port: 443,
          range: { min: 0, max: 1 },
          custom: { x: 100 },
          args: {
            name: 'hello',
            x: {
              y: 'snapje',
            },
          },
        },
        onChange: (values) => console.info(values),
      },
    },
  ],
}

export default example
