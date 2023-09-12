import React from 'react'
import { Dropdown, IconEmojiSmile } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Dropdown',
  properties: props.props.DropDownProps.props,
  description: '',
  component: Dropdown,
  examples: [
    {
      props: {
        data: [
          { label: 'Option uno', icon: () => <IconEmojiSmile /> },
          { label: 'Option dos', icon: () => <IconEmojiSmile /> },
          { label: 'Option trois', type: 'checkbox', value: true },
          // { label: 'Option trois', type: 'radio', value: false },
          {
            label: 'Option more',
            icon: () => <IconEmojiSmile />,
            caption: 'More',
            data: [
              { label: 'SubOption 1' },
              { label: 'SubOption 2', type: 'checkbox' },
              {
                label: 'SubOption 3',
                caption: 'Caption',
                data: [{ label: 'SupperdeSup 1' }, { label: 'SupperdeSup 2' }],
              },
            ],
          },
        ],
      },
    },
  ],
}

export default example
