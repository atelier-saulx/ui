import React from 'react'
import { Status } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Status',
  component: Status,
  description: '',
  properties: props.props.StatusProps.props,
  examples: [
    {
      props: {
        children: 'Status Text',
        color: 'informative',
      },
    },
  ],
}

export default example
