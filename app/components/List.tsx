import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { List } from '../../src'
import { CheckboxInput } from '../../src/components/Input/CheckboxInput'

const example: ComponentDef = {
  name: 'List',
  properties: props.props.CalendarProps.props,
  description: 'List template',
  component: List,
  examples: [
    {
      props: {
        title: 'This is a prompt',
        description: 'Enter a value',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState([''])
        return (
          <List
            type="text"
            field="Array of strings"
            onChange={(v) => setValue(v)}
            value={value}
          />
        )
      },
    },
  ],
}

export default example
