import React from 'react'
import { Badge, IconSmallBolt } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Badge',
  properties: props.props.BadgeProps.props,
  component: Badge,
  description: 'Badge component',
  examples: [
    {
      props: {
        children: 'Hello badge',
        color: 'informative',
        light: false,
      },
    },
    {
      props: {
        icon: () => React.createElement(IconSmallBolt),
      },
    },
  ],
}

export default example
