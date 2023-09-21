import React from 'react'
import { Counter } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { IconChartPie } from '../../src/icons/index'

const example: ComponentDef = {
  name: 'Counter',
  properties: props.props.CounterProps.props,
  description: '',
  component: Counter,
  examples: [
    {
      props: {
        color: 'informative',
        children: 24,
      },
    },
    {
      props: {
        color: 'warning',
        children: 8833,
        icon: () => React.createElement(IconChartPie),
        valueFormat: 'number-bytes',
      },
    },
  ],
}

export default example
