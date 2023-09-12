import React from 'react'
import { Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Text',
  component: Text,
  description: 'Text including typeography',
  properties: props.props.TextProps.props,
  examples: [
    {
      props: {
        children: 'Some Text',
        weight: 'medium',
      },
    },
    {
      props: {
        children: 'Light text, for descriptions.',
        light: true,
      },
    },
  ],
}

export default example
