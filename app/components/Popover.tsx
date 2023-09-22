import React from 'react'
import { Popover, usePopover } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Popover',
  component: Popover,
  description: 'PopoverTest',
  properties: props.props.PopoverProps.props,
  examples: [
    {
      props: {
        children: <div>This is a popover</div>,
        position: 'top-left',
        style: {
          textTransform: 'uppercase',
        },
      },
      customRenderer: (props) => {
        const popover = usePopover(props.children, props.position, props.style)

        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div {...popover}>Hover me! {props.position}</div>
          </div>
        )
      },
    },
  ],
}

export default example
