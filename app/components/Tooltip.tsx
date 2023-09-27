import React from 'react'
import { Button, Tooltip } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Tooltip',
  component: Tooltip,
  description: 'Tooltip',
  properties: props.props.TooltipProps.props,
  examples: [
    {
      props: {},
      customRenderer: () => {
        return (
          <Tooltip text="Tooltip content">
            <Button color="system">Hover me</Button>
          </Tooltip>
        )
      },
    },
  ],
}

export default example
