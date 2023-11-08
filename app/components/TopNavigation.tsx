import React from 'react'
import {
  TopNavigation,
  styled,
  Tabs,
  Tab,
  Avatar,
  Breadcrumbs,
} from '../../src'
import { BasedLogo } from '../../src/icons/BasedLogo'
import { BigBasedLogo } from '../../src/icons/BigBasedLogo'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Top Navigation',
  component: TopNavigation,
  description: 'just a teset',
  properties: {
    ...props.props.TopNavigationProps.props,
    breadcrumbs: { type: 'boolean' },
    tabs: { type: 'boolean' },
  },
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
              <BigBasedLogo />
              {props.breadcrumbs ? (
                <Breadcrumbs
                  style={{ marginLeft: '24px', marginTop: '6px' }}
                  data={{
                    flip: 'flip',
                    flap: 'flap',
                    flup: 'flup',
                    snip: 'snip',
                    snap: 'snap',
                    snurp: 'snurp',
                  }}
                  active="flip"
                />
              ) : props.tabs ? (
                <Tabs
                  active={1}
                  style={{ marginLeft: '24px', marginTop: '6px' }}
                >
                  <Tab label="Apple" children="🍎" />
                  <Tab label="Bear" children="🐻" />
                  <Tab label="Crescendo" children="🎵" />
                </Tabs>
              ) : null}
              <Avatar style={{ marginLeft: 'auto' }}>Kyle</Avatar>
            </TopNavigation>
          </styled.div>
        )
      },
    },
  ],
}

export default example
