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
                collapse
                onChange={(v) => {
                  setValue(v)
                }}
                active={value}
                //@ts-ignore
                config={{
                  display: {
                    '0': {
                      label: 'Text',
                      value: 'Text',
                      icon: <IconAlarmClock />,
                    },
                    '1': {
                      label: 'SectionHeader',
                      value: 'SectionHeader',
                      icon: <IconAlarmClock />,
                    },
                    '2': {
                      label: 'Table',
                      value: 'Table',
                    },
                    '3': {
                      label: 'Counter',
                      value: 'Counter',
                    },
                    '4': {
                      label: 'Status',
                      value: 'Status',
                      icon: <IconAlarmClock />,
                    },
                    '5': {
                      label: 'Avatar',
                      value: 'Avatar',
                    },
                    '6': {
                      label: 'Thumbnail',
                      value: 'Thumbnail',
                    },
                    display2: [
                      {
                        label: 'Text2',
                        value: 'Text2',
                        icon: <IconAlarmClock />,
                      },
                      {
                        label: 'SectionHeader2',
                        value: 'SectionHeader2',
                      },
                      {
                        label: 'Table2',
                        value: 'Table2',
                      },
                      {
                        label: 'Counter2',
                        value: 'Counter2',
                      },
                      {
                        label: 'Status2',
                        value: 'Status2',
                      },
                      {
                        label: 'Avatar2',
                        value: 'Avatar2',
                      },
                      {
                        label: 'Thumbnail2',
                        value: 'Thumbnail2',
                      },
                    ],
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
