import React from 'react'
import { useTooltip, TooltipTest, Badge } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'TooltipTest',
  component: TooltipTest,
  description: 'Tooltip',
  properties: props.props.TooltipProps.props,
  examples: [
    {
      props: { label: 'asdasd', position: 'top-left' },
      customRenderer: (props) => {
        const toolTip = useTooltip(props.label, props.position)

        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div {...toolTip}>
              Hover me! {props.label + ' ' + props.position}
            </div>
          </div>
        )
      },
    },
  ],
}

export default example
