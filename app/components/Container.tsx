import React from 'react'
import {
  Avatar,
  Container,
  IconMenu,
  IconMoreHorizontal,
  Text,
} from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Container',
  component: Container,
  description: '',
  properties: props.props.ContainerProps.props,
  examples: [
    {
      props: {
        style: {
          width: 700,
        },
        afterIcon: () => <IconMoreHorizontal />,
        icon: () => <Avatar />,
        label: 'This is a container',
        description: 'This is a description',
        children: () => <Text>These are some children...</Text>,
        onClick: (v) => {
          console.log(v)
        },
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        color: 'positive',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        color: 'neutral',
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        color: 'brand',
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        color: 'warning',
        afterIcon: () => <IconMoreHorizontal />,
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      props: {
        style: {
          width: 700,
        },
        color: 'neutral',
        afterIcon: () => <IconMoreHorizontal />,
        children: () => <Text>These are some children...</Text>,
      },
    },
  ],
}

export default example
