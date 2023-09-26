import React, { ReactNode, FC } from 'react'
import { Button, useOverlay, Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

/*
{
  width?: number | '100%' | 'target' | 'auto'
  position?: 'left' | 'right' | 'top' | 'bottom'
  placement?: 'center' | 'left' | 'right'
  variant?: 'over' | 'detached'
  offset?: { x: number; y: number }
  selectTarget?: SelectTarget
}

*/

export const positionProp = {}

const Component: FC<{ example: ReactNode }> = ({ example }) => {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Text truncate>{example}</Text>
    </div>
  )
}

const example: ComponentDef = {
  name: 'useOverlay',
  component: (props) => {
    return <div>custom</div>
  },
  description: 'Overlay system basis',
  properties: {
    example: { type: 'ReactNode' },
    width: { type: 'number' },
    position: {
      type: [
        { value: 'left' },
        { value: 'right' },
        { value: 'top' },
        { value: 'bottom' },
      ],
    },
    placement: {
      type: [{ value: 'center' }, { value: 'left' }, { value: 'right' }],
    },
    variant: { type: [{ value: 'over' }, { value: 'detached' }] },
    // offset: { x: { type: 'number' }, y: { type: 'number' } },
    selectTarget: { type: 'EventHandler' },
  },
  examples: [
    {
      props: { example: 'Example prop' },
      customRenderer: (props) => {
        const { width, position, placement, variant, selectTarget, ...p } =
          props

        const toolTip = useOverlay(Component, p, {
          placement: placement,
          position: position,
          width: 300,
        })
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={(e) => {
                console.info(e)
                toolTip(e)
              }}
            >
              Open overlay
            </Button>
          </div>
        )
      },
    },
  ],
}

export default example
