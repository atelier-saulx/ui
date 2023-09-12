import React from 'react'
import { TooltipTest } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TooltipTest',
  component: TooltipTest,
  description: 'just a teset',
  properties: props.props.ScrollAreaProps.props,
  examples: [{ props: {} }],
}

export default example
