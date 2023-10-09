import React from 'react'
import { FormGroup, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const fieldProps = {
  config: {
    port: {
      type: 'number',
      description: 'Network port',
    },
    arrayOfStrings: {
      type: 'text',
      multiple: true,
      default: ['123', '346'],
      addMultipleLabel: 'Add extra string',
    },
    arrayOfNumbers: {
      type: 'number',
      multiple: true,
      default: [123, 456],
      addMultipleLabel: 'Add extra number',
    },
    'args.name': {
      label: 'Name',
      type: 'text',
      description: 'Instance name',
      validation: () => (val) => {
        return val && val.length > 4
      },
    },
    'args.x.y': {
      label: 'Status',
      description: 'status time',
      options: ['good', 'bad', 'medium'],
      props: {
        placeholder: 'FLAP',
      },
    },
    range: {
      label: 'Bla',
      description: 'hello',
      type: 'range',
    },
    file: {
      label: 'File',
      description: 'hello',
      type: 'file',
    },
    custom: {
      label: 'Status',
      description: 'status time',
      type:
        () =>
        ({ onChange, value }) => {
          return (
            <Button
              color="system"
              onClick={() => {
                onChange('custom', { x: value.x + 1 })
              }}
            >
              bla {value.x}
            </Button>
          )
        },
    },
    isThisNce: {
      label: 'Nice',
      description: 'is it nice?',
      type: 'checkbox',
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
}

const example: ComponentDef = {
  name: 'FormGroup',
  component: FormGroup,
  description: 'FormGroup Component, can be grid or column',
  properties: {}, //props.props.FormGroupProps.props,
  examples: [
    {
      props: {
        ...fieldProps,
        variant: 'grid',
        autoFocus: true,
      },
    },
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
