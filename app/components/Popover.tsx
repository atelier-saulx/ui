import React from 'react'
import { Popover } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Popover',
  component: Popover,
  description: 'PopoverTest',
  properties: props.props.PillProps.props,
  examples: [
    {
      props: {},
    },
  ],
}

export default example
