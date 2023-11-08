import React from 'react'
import { Button, Tooltip, Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Tooltip',
  component: Tooltip,
  description: 'Tooltip',
  properties: props.props.TooltipProps.props,
  examples: [
    {
      props: { text: 'Tooltip content' },
      customRenderer: (props) => {
        return (
          <Tooltip {...props}>
            <Button color="system">Hover me</Button>
          </Tooltip>
        )
      },
    },
    {
      props: { text: 'Tooltip content' },
      customRenderer: (props) => {
        return (
          <Tooltip {...props}>
            <div>helow</div>
          </Tooltip>
        )
      },
    },
  ],
}

export default example
