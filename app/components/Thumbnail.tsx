import React, { ReactNode } from 'react'
import { IconBulb, Thumbnail, Row } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'Thumbnail',
  properties: {
    ...props.props.ThumbnailProps.props,
  },
  component: Thumbnail,
  description: 'Thumbnail use images or show the first 2 letters of the label',
  examples: [
    {
      props: {
        label: 'beerdejim@gmail.com',
        color: 'raspberry',
      },
    },

    {
      customRenderer: (props) => {
        const thumbs: ReactNode[] = new Array(100).fill(null).map((_, i) => {
          return (
            <Thumbnail key={i} {...props} label={faker.person.fullName()} />
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
        label: '*',
        size: 'small',
        autoColor: true,
      },
    },
    {
      name: 'Counter',
      description: 'large',
      props: {
        counter: 2,
        label: 'once',
        size: 'large',
      },
    },
    {
      description: 'medium',
      props: {
        counter: 2,
        label: 'once',
        size: 'medium',
      },
    },
    {
      description: 'small',
      props: {
        counter: 2,
        label: 'once',
        size: 'small',
      },
    },
    {
      name: 'Image',
      props: {
        size: 'large',
        src: faker.image.url(),
      },
    },
    {
      description: 'Image + label',
      props: {
        label: faker.person.fullName(),
        size: 'large',
        src: faker.image.url(),
      },
    },
    {
      name: 'Event handler',
      props: {
        onClick: () => {
          console.log('hell')
        },
        light: true,
        outline: true,
        label: faker.person.fullName(),
        size: 'small',
      },
    },
    {
      name: 'Icon',
      props: {
        light: true,
        outline: true,
        color: 'raspberry',
        icon: () => <IconBulb />,
        size: 'small',
      },
    },
  ],
}

export default example
