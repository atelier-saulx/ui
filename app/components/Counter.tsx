import React from 'react'
import { Counter } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { IconChartPie, IconWifi } from '../../src/icons/index'

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
    {
      props: {
        label: 'Hello this is wifi %!',
        color: 'blue',
        children: 0.21,
        icon: () => React.createElement(IconWifi),
        valueFormat: 'number-ratio',
      },
    },
  ],
}

export default example
