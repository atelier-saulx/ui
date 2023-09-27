import React from 'react'
import { Popover, usePopover, Text } from '../../src'
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
        position: 'top-left',
        style: {
          textTransform: 'uppercase',
        },
      },
      customRenderer: (props) => {
        const popover = usePopover(
          <Text>This is a popver</Text>,
          props.position,
          props.style
        )

        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div {...popover}>
              <Text>Hover me! {props.position}</Text>
            </div>
          </div>
        )
      },
    },
  ],
}

export default example
