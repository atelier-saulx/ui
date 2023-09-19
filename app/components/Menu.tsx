import React from 'react'
import { Menu, IconHome, IconEmojiSmile } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Menu',
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
              label: 'Label one',
              // icon: () => <IconHome />,
            },
          },
          title: {
            flyp: {
              value: 'yow1',
              label: 'Menu Label',
              // icon: () => <IconEmojiSmile />,
            },
            flip: {
              label: 'Menu Label',
              // icon: () => <IconHome />,
            },
            flop: {
              value: 'yow3',
              label: 'Menu Label',
              // icon: () => <IconHome />,
            },
            test: {
              value: 'x',
              label: 'more 0',
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
