import React, { useState } from 'react'
import { Menu, IconHome, IconEmojiSmile, Badge } from '../../src'
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
                    label: 'Label one',
                    // icon: () => <IconHome />,
                  },
                },
                title: {
                  flyp: {
                    value: 'yow1',
                    label: 'Menu Label1',
                    // icon: () => <IconEmojiSmile />,
                  },
                  flip: {
                    value: 'yow2',
                    label: 'Menu Label2',
                    // icon: () => <IconHome />,
                  },
                  flop: {
                    value: 'yow3',
                    label: 'Menu Label3',
                    // icon: () => <IconHome />,
                  },
                  test: {
                    value: 'x',
                    label: 'more 0',
                    items: [{ value: 'yow4', label: 'flipe' }],
                  },
                  flap: 'Menu Text',
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
