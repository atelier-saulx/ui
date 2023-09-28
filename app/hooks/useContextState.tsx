import React, { ReactNode, FC } from 'react'
import { Button, useOverlay, Text } from '../../src'
import { ComponentDef } from '../types'

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
  name: 'useContextState',
  component: (props) => {
    return <div>custom</div>
  },
  description: 'State manager for certain areas of an app',
  properties: {},
  examples: [
    {
      props: {},
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
              Open useContextState
            </Button>
          </div>
        )
      },
    },
  ],
}

export default example
