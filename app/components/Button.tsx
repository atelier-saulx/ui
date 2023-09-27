import React from 'react'
import { Button, IconClipboard } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { wait } from '@saulx/utils'

const example: ComponentDef = {
  name: 'Button',
  properties: props.props.ButtonProps.props,
  component: Button,
  description: 'Simple button component',
  examples: [
    {
      props: {
        children: 'Click me',
        onClick: () => {
          console.log('bla')
        },
      },
    },
    {
      name: 'Async action indicators',
      description: 'Visual indication of errors and loading state',
      props: {
        onClick: async () => {
          await wait(5000)
        },
        color: 'primary',
        children: 'Do something async',
        light: true,
      },
    },
    {
      props: {
        color: 'alert',
        onClick: async () => {
          throw new Error('Flap!')
        },
        children: 'Throw an error!',
        size: 'small',
        light: false,
      },
    },
    {
      name: 'Colors',
      props: {
        children: 'Neutral color',
        icon: () => <IconClipboard />,
        color: 'alert',
        size: 'small',
      },
    },
    {
      name: 'Icon Button',
      props: {
        // children: 'Neutral color',
        icon: () => <IconClipboard />,
        color: 'neutral',
        size: 'large',
      },
    },
    {
      props: {
        children: 'Bare Button',
        color: 'alert',
        size: 'xsmall',
        underline: true,
        onClick: async () => {
          await wait(1000)
        },
      },
    },
  ],
}

export default example
