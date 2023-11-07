import React from 'react'
import { Button, IconAlarmClock, IconClipboard } from '../../src'
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
        // light: false,
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
    {
      name: 'Ghost button',
      props: {
        children: 'Ghost Button',
        color: 'alert',
        ghost: true,
        onClick: async () => {
          await wait(1000)
        },
      },
    },
    {
      name: 'Keyboard shortcut',
      props: {
        children: 'Yes!',
        displayShortcut: true,
        keyboardShortcut: 'Enter',
        onClick: async () => {
          console.info('bla')
          // alert('hello!')
        },
      },
    },
    {
      name: 'Ghost icon button',
      props: {
        icon: () => <IconAlarmClock />,
        ghost: true,
        onClick: async () => {
          console.info('bla')
          // alert('hello!')
        },
      },
    },
    {
      name: 'Extra small button',
      props: {
        children: 'Extra small button',
        color: 'system',
        size: 'xsmall',
        onClick: async () => {
          console.info('bla')
          // alert('hello!')
        },
      },
    },
  ],
}

export default example
