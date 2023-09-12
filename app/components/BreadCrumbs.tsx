import React from 'react'
import { Breadcrumbs } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Breadcrumbs',
  properties: props.props.BreadcrumbsProps.props,
  component: Breadcrumbs,
  description: 'set onchange value in route',
  examples: [
    {
      props: {
        style: {
          // [BpTablet]: {
          //   transform: 'scale(0.5)',
          // },
        },
        data: {
          flip: 'flip',
          flap: 'flap',
          flup: 'flup',
          snip: 'snip',
          snap: 'snap',
          snurp: 'snurp',
        },
        onChange: (v) => console.log(v),
      },
    },
  ],
}

export default example
