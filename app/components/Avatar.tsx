import { Avatar, Row } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import React, { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'Avatar',
  properties: {
    ...props.props.AvatarProps.props,
  },
  component: Avatar,
  description: 'Simple Avatar component',
  examples: [
    {
      props: {
        color: 'raspberry',
        children: 'sd',
        size: 'large',
        squared: true,
      },
    },
    {
      name: 'Solid Color Avatar',
      description: 'Rock solid',
      props: {
        color: 'aquamarine',
        children: 'F1',
        size: 'large',
        light: true,
        src: 'https://robohash.org/G2J.png?set=set1',
      },
    },
    {
      customRenderer: (props) => {
        const thumbs: ReactNode[] = new Array(100).fill(null).map((_, i) => {
          return (
            <Avatar key={i} {...props}>
              {faker.person.fullName()}
            </Avatar>
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
      description: 'Based on label',
      props: {
        autoColor: true,
        size: 'large',
      },
    },
  ],
}

export default example
