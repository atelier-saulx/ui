import React, { useState } from 'react'
import { List } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'
import props from '../props.json'

const example: ComponentDef = {
  name: 'List',
  component: List,
  description: 'List wrapper',
  properties: props.props.ListProps.props,
  examples: [
    {
      props: {
        label: 'Users',
      },
    },
  ],
}

export default example
