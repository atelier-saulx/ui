import { Thumbnail } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

/*
    image: faker.image.url(),
    author: faker.person.fullName(),
*/

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
      name: 'Counter',
      props: {
        counter: 2,
        label: 'once',
        size: 'large',
      },
    },
    {
      name: 'Counter',
      props: {
        counter: 2,
        label: 'once',
        size: 'medium',
      },
    },
    {
      name: 'Counter',
      props: {
        counter: 2,
        label: 'once',
        size: 'small',
      },
    },
    {
      name: 'Counter',
      props: {
        size: 'large',
        src: faker.image.url(),
      },
    },
    {
      name: 'Counter',
      props: {
        label: faker.person.fullName(),
        size: 'large',
        src: faker.image.url(),
      },
    },
    {
      name: 'Counter',
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
  ],
}

export default example
