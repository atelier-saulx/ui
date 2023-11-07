import React, { useState } from 'react'
import { ColorPicker } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'ColorPicker',
  component: ColorPicker,
  description: '',
  properties: props.props.ColorPickerProps.props,
  examples: [
    {
      props: {
        value: 'rgba(0,0,0,0)',
        onChange: (v) => {
          console.log()
        },
      },
    },
    {
      name: 'controlled',
      props: {},
      customRenderer: () => {
        const [value, setValue] = useState('rgba(0,0,0,0')
        return <ColorPicker value={value} onChange={(v) => setValue(v)} />
      },
    },
  ],
}

export default example
