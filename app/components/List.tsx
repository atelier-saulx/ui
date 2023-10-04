import React, { useState } from 'react'
import { List, Thumbnail, styled } from '../../src'
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
        style: {
          width: 750,
        },
        data: new Array(10).fill(null).map(() => ({
          logo: faker.image.avatar(),
          name: faker.person.fullName(),
          status: faker.lorem.words(1),
          avatar: faker.internet.emoji(),
          id: faker.datatype.uuid().slice(0, 8),
          createdAt: faker.date.anytime().getTime(),
          price: Math.random() * 1e4,
        })),
        fields: [
          {
            key: 'logo',
            type: 'image',
          },
          {
            key: 'name',
            type: 'medium',
          },
          {
            key: 'status',
            type:
              () =>
              ({ row }) =>
                <Thumbnail size="small" label={row.status} />,
          },
          {
            key: 'avatar',
            type: 'avatar',
          },
          {
            key: 'price',
            type: 'number-euro',
          },
          {
            key: 'createdAt',
            type: 'date-time-human',
          },
          {
            key: 'id',
            type: 'badge',
          },
        ],
      },
    },
    {
      name: 'Automatic types',
      description: 'auto generated types from data',
      props: {
        label: 'Users',
        style: {
          width: 750,
        },
        data: new Array(10).fill(null).map(() => ({
          logo: faker.image.avatar(),
          name: faker.person.fullName(),
          createdAt: faker.date.anytime().getTime(),
          price: Math.random() * 1e4,
        })),
      },
    },
  ],
}

export default example
