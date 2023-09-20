import React, { useState } from 'react'
import { Input, Style } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SelectInput',
  component: Input,
  description: 'Select input',
  properties: {
    preventCloseOnSelect: { type: 'boolean' },
    beforeIcon: { type: 'icon' },
    style: { type: 'style' },
    disabled: { type: 'boolean' },
    placeholder: { type: 'string' },
  },
  examples: [
    {
      props: { placeholder: 'Select one' },
      customRenderer: (props) => {
        const [value, setValue] = useState<number | string>('')
        return (
          <Input
            type="select"
            multiple={false}
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            {...props}
            options={[
              { label: 'Item one', value: 'value1' },
              { label: 'Item two', value: 'value2' },
              { label: 'Item three', value: 'value3' },
            ]}
          />
        )
      },
    },
    {
      props: { label: 'This is a label', placeholder: 'Select multiple' },
      customRenderer: (props) => {
        const [multiValue, setMultiValue] = useState<(string | number)[]>([])
        return (
          <Input
            type="select"
            multiple
            value={multiValue}
            label="This is a label"
            onChange={(v) => {
              setMultiValue(v)
            }}
            {...props}
            placeholder="Select multiple"
            options={[
              { label: 'Item one', value: 'value1' },
              { label: 'Item two', value: 'value2' },
              { label: 'Item three', value: 'value3' },
            ]}
          />
        )
      },
    },
  ],
}

export default example
