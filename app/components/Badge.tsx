import React, { ReactNode } from 'react'
import { Badge, IconHelpFill, IconSmallBolt, Row } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'Badge',
  properties: props.props.BadgeProps.props,
  component: Badge,
  description: 'Badge component',
  examples: [
    {
      props: {
        children: 'Hello badge',
        color: 'informative',
        light: false,
      },
    },
    {
      props: {
        icon: () => React.createElement(IconSmallBolt),
      },
    },
    {
      props: {
        children: 'Informer',
        color: 'negative',
        icon: () => React.createElement(IconHelpFill),
      },
    },
    {
      name: 'Copy badge',
      description:
        'Copy a specific value or use the contents of children on click',
      props: {
        copy: true,
        color: 'inverted',
        children: 'Copy me!',
      },
    },
    {
      customRenderer: (props) => {
        const thumbs: ReactNode[] = new Array(100).fill(null).map((_, i) => {
          return (
            <Badge key={i} {...props}>
              {faker.person.fullName()}
            </Badge>
          )
        })
        return (
          <Row
            style={{
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {thumbs}
          </Row>
        )
      },
      name: 'Auto generate color',
      description: 'Based on children',
      props: {
        autoColor: true,
        size: 'large',
      },
    },
  ],
}

export default example
