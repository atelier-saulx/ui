import React from 'react'
import {
  Avatar,
  Container,
  IconMoreHorizontal,
  Thumbnail,
  Text,
  styled,
} from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

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
        divider: true,
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
      name: 'Expandable',
      props: {
        style: {
          width: 700,
        },
        expandable: true,
        divider: true,
        afterIcon: () => <IconMoreHorizontal />,
        label: 'This is a container',
        description: 'This is a description',
        children: () => <Text>These are some children...</Text>,
      },
    },

    {
      description: 'No description',
      customRenderer: (props) => {
        return (
          <styled.div>
            <Container {...props} />
          </styled.div>
        )
      },
      props: {
        style: {
          width: 700,
        },
        expandable: true,
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },

    {
      name: 'Variations',
      description: 'No description / no divider',
      props: {
        style: {
          width: 700,
        },
        label: 'This is a container',
        children: () => <Text>These are some children...</Text>,
      },
    },
    {
      description: 'No divider',
      props: {
        style: {
          width: 700,
        },
        icon: () => <Thumbnail label="Jim" color="blue" size="medium" />,
        afterIcon: () => <IconMoreHorizontal />,
        label: 'This is a container',
        description: 'This is a description',
        children: () => {
          return <Text>{faker.lorem.sentences(20)}</Text>
        },
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
        divider: true,
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
