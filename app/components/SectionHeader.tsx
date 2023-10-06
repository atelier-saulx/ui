import React, { useState } from 'react'
import { SectionHeader, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SectionHeader',
  component: SectionHeader,
  description: 'SectionHeader',
  properties: props.props.SectionHeaderProps.props,
  examples: [
    {
      props: {
        style: { width: 750 },
        children: 'Page',
        action: () => <Button>Hello</Button>,
      },
    },
  ],
}

export default example
