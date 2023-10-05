import React, { useState, useEffect } from 'react'
import {
  Menu,
  IconHome,
  IconEmojiSmile,
  Badge,
  IconEdit,
  IconAlarmClock,
  IconAnchor,
  IconArchive,
  Text,
} from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Menu',
  component: Menu,
  description: '',
  properties: props.props.MenuProps.props,
  examples: [
    {
      props: {},
      customRenderer: ({}) => {
        const [smallMenuValue, setSmallMenuValue] = useState('flippie')
        const [value, setValue] = useState('yowza1')

        return (
          <div>
            <div style={{ display: 'flex', marginBottom: 12, gap: 16 }}>
              <Badge>{smallMenuValue}</Badge>
              <Badge>{value}</Badge>
            </div>
            <div style={{ display: 'flex' }}>
              <Menu
                shrunk
                onChange={(v) => {
                  setSmallMenuValue(v)
                }}
                active={smallMenuValue}
                config={{
                  items: {
                    // @ts-ignore
                    x: { value: 'x', label: 'XX', icon: <IconAlarmClock /> },
                    y: { value: 'y', label: 'YY', icon: <IconEmojiSmile /> },
                    z: { value: 'z', label: 'ZZ', icon: <IconAnchor /> },
                    a: { value: 'a', label: 'AA', icon: <IconArchive /> },
                  },
                }}
              />
              <Menu
                // shrunk
                header={
                  <div style={{ background: 'yellow', width: '100%' }}>
                    <Text>Header</Text>
                  </div>
                }
                footer={
                  <div style={{ background: 'orange', width: '100%' }}>
                    <Text>Footer</Text>
                  </div>
                }
                // collapse
                onChange={(v) => {
                  setValue(v)
                }}
                active={value}
                config={{
                  Label: {
                    flyp: {
                      //@ts-ignore
                      value: 'yowza1',
                      label: 'Home',
                      icon: <IconHome />,
                    },
                  },
                  Database: {
                    flyp: {
                      value: 'yow1',
                      label: 'Builder',
                      icon: <IconEmojiSmile />,
                    },
                    flip: {
                      value: 'yow2',
                      label: 'Content',
                      icon: <IconEdit />,
                      flappie: {
                        value: 'hellow',
                        label: 'hallow',
                      },
                      floepie: {
                        value: 'herrow',
                        label: 'halrwo',
                      },
                      flyexie: {
                        value: 'heraima',
                        label: 'heuanlae',
                        snrupie: {
                          value: 'snrupt',
                          label: 'niepow',
                        },
                      },
                    },
                    flop: {
                      value: 'yow3',
                      label: 'Assets',
                      icon: <IconAlarmClock />,
                    },
                  },
                }}
              />
            </div>
          </div>
        )
      },
    },
  ],
}

export default example
