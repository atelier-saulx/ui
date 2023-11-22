import React from 'react'
import { Tabs, Tab, BpTablet, styled } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Tabs',
  component: Tabs,
  description: '<Tabs> component with children <Tab /> components',
  properties: props.props.TabsProps.props,
  examples: [
    {
      props: {
        active: 1,
        borderColor: 'primary',
      },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              [BpTablet]: {
                width: 'unset',
              },
              marginBottom: 24,
            }}
          >
            <Tabs {...props}>
              <Tab label="Apple" style={{ background: 'yellow' }}>
                🥒
              </Tab>
              <Tab label="Bear" children="🐻" />
              <Tab label="Crescendo" children="🎵" />
            </Tabs>
          </styled.div>
        )
      },
    },
    {
      props: {
        active: 1,
        borderColor: 'neutral',
      },
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              width: 600,
              [BpTablet]: {
                width: 'unset',
              },
              marginBottom: 24,
            }}
          >
            <Tabs {...props}>
              <Tab label="Edgy Apple" children="🍎" />
              <Tab label="Edgy Bear" children="🐻" />
              <Tab label="Edgy Crescendo" children="🎵" />
            </Tabs>
          </styled.div>
        )
      },
    },
  ],
}

export default example
