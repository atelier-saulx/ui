import React from 'react'
import { Tabs, Tab, BpTablet, styled } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Tabs',
  component: Tabs,
  description: 'Tabs',
  properties: props.props.TabsProps.props,
  examples: [
    {
      props: {
        activeTab: 1,
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
            <Tabs activeTab={1}>
              <Tab label="Apple" children="🍎" />
              <Tab label="Bear" children="🐻" />
              <Tab label="Crescendo" children="🎵" />
            </Tabs>
          </styled.div>
        )
      },
    },
    {
      props: {
        activeTab: 1,
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
            <Tabs borderColor="neutral" activeTab={1}>
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
