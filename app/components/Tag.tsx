import React from 'react'
import { Tag } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Tag',
  component: Tag,
  description: 'Tags',
  properties: props.props.TagProps.props,
  examples: [
    {
      props: {
        children: 'Tag',
        onClose: () => console.log('close??'),
      },
    },
  ],
}

export default example
