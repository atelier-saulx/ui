import React from 'react'
import { SidePanel } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SidePanel',
  component: SidePanel,
  description: 'SidePaneltest',
  properties: props.props.PillProps.props,
  examples: [
    {
      props: {},
    },
  ],
}

export default example
