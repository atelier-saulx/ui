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
    {
      name: 'Copy badge',
      description:
        'Copy a specific value or use the contents of children on click',
      props: {
        copy: true,
        color: 'inverted',
        children: 'Copy me!',
      },
    },
  ],
}

export default example
