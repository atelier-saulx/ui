import React from 'react'
import { Menu, IconHome, IconEmojiSmile } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Sidebar Navigation',
  component: Menu,
  description: '',
  properties: props.props.MenuProps.props,
  examples: [
    {
      props: {
        collapse: true,
        data: {
          Label: {
            flyp: {
              value: 'yow1',
              label: 'Menu Text',
              icon: () => <IconHome />,
            },
          },
          title: {
            flyp: {
              value: 'yow1',
              label: 'Menu Text',
              icon: () => <IconEmojiSmile />,
            },
            flip: {
              label: 'Menu Text',
              icon: () => <IconHome />,
            },
            flop: {
              value: 'yow3',
              label: 'Menu Text',
              icon: () => <IconHome />,
            },
            test: {
              value: 'x',
              label: 'more0',
              items: [{ value: 'yow4', label: 'flipe' }],
            },
            flap: 'Menu Text',
          },
        },
      },
    },
  ],
}

export default example
