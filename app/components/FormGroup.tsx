import React from 'react'
import { FormGroup, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const fieldProps = {
  id: 1337,
  config: {
    object2: {
      type: 'object',
      description: 'wowoweewow',
      properties: {
        flap: {
          type: 'boolean',
        },
        flirp: {
          type: 'boolean',
        },
        snap: {
          type: 'text',
        },
        snop: {
          type: 'file',
        },
        flop: {
          type: 'object',
          properties: {
            nested1flap: {
              type: 'boolean',
            },
            nested1snurp: {
              type: 'boolean',
            },
            nested1cod: {
              type: 'boolean',
            },
            nested1bla: {
              type: 'object',
              properties: {
                nested2flap: {
                  type: 'boolean',
                },
                nested2snurp: {
                  type: 'boolean',
                },
                nested2cod: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
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
