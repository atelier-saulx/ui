import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SelectInput',
  component: Input,
  description: 'Select input',
  properties: props.props.InputProps.props,
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('')
        return (
          <Input
            type="select"
            multiple={false}
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            placeholder="Select one"
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
      props: {},
      customRenderer: () => {
        const [multiValue, setMultiValue] = useState<string[]>([])
        return (
          <Input
            type="select"
            multiple
            value={multiValue}
            label="This is a label"
            onChange={(v) => {
              setMultiValue(v)
            }}
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
