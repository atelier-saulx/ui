import React from 'react'
import { TopNavigation, styled, Tabs, Tab, Avatar } from '../../src'
import { BasedLogo } from '../../src/icons/BasedLogo'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Top Navigation',
  component: TopNavigation,
  description: 'just a teset',
  properties: props.props.ScrollAreaProps.props,
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        return (
          <styled.div
            style={{
              top: 0,
              position: 'relative',
              width: 700,
              height: 200,
              // [BpTablet]: {
              //   width: 'unset',
              // },
            }}
          >
            <TopNavigation>
              <BasedLogo />
              <Tabs
                activeTab={1}
                style={{ marginLeft: '24px', marginTop: '6px' }}
              >
                <Tab label="Apple" children="🍎" />
                <Tab label="Bear" children="🐻" />
                <Tab label="Crescendo" children="🎵" />
              </Tabs>
              <Avatar style={{ marginLeft: 'auto' }}>Kyle</Avatar>
            </TopNavigation>
          </styled.div>
        )
      },
    },
  ],
}

export default example
