import React from 'react'
import { useOverlay } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

// make useModal as well

const example: ComponentDef = {
  name: 'useOverlay',
  component: (props) => {
    return <div>fix fix</div>
  },
  description: 'Overlay system basis',
  properties: props.props.TooltipProps.props,
  examples: [
    {
      props: { label: 'asdasd', position: 'top-left' },
      customRenderer: (props) => {
        const toolTip = useTooltip(props.label, props.position)
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div {...toolTip}>Hover me!</div>
          </div>
        )
      },
    },
  ],
}

export default example
