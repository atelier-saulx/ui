import React, { useState } from 'react'
import { SidePanel, useSidePanel, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'SidePanel',
  component: SidePanel,
  description: 'SidePaneltest',
  properties: {
    ...props.props.SidePanelProps.props,
  },
  examples: [
    {
      props: {
        children: (
          <div
            style={{ width: '100%', height: '100%' }}
            onClick={() => {
              console.log('asdasd')
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage:
                  'url("https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg?w=1272&h=848")',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        ),
        position: 'right',
        style: {
          textTransform: 'uppercase',
        },
        title: 'This is a title',
        cancel: { onClick: () => console.log('ligma'), label: 'asdasd' },
        primaryAction: {
          onClick: () => {
            console.log('ligmaaaa')
          },
          label: 'Primary Action',
        },
      },
      customRenderer: (props) => {
        const { open } = useSidePanel(
          props.children,
          props.position,
          props.style,
          props.title,
          props.cancel,
          props.primaryAction
        )

        return <Button onClick={(e: any) => open(e)}>Open SidePanel</Button>
      },
    },
  ],
}

export default example
