import React, { useState } from 'react'
import {
  Menu,
  IconHome,
  IconEmojiSmile,
  Badge,
  IconEdit,
  IconAlarmClock,
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
        const [value, setValue] = useState('yowza1')

        return (
          <div style={{ display: 'flex', gap: 20 }}>
            <Badge>{value}</Badge>
            <Menu
              collapse
              onChange={(v) => {
                setValue(v)
              }}
              active={value}
              data={{
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
        )
      },
    },
  ],
}

export default example
