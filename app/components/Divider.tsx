import React from 'react'
import { Divider } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Divider',
  properties: props.props.DividerProps.props,
  description: '',
  component: Divider,
  examples: [{ props: { style: { width: '342px' } } }],
}

export default example
