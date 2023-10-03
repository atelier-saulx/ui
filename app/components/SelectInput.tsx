import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'SelectInput',
  component: Input,
  description: 'Select input',
  properties: {},
  examples: [
    {
      props: {
        type: 'select',
        label: 'This is a label',
        options: Array.from({ length: 25 }).map((_, i) => ({
          label: faker.person.fullName(),
          value: `id${i}`,
        })),
        defaultValue: 'id2',
        placeholder: 'select one',
      },
    },
    {
      props: {
        type: 'select',
        label: 'This is searchable',
        searchable: true,
        options: Array.from({ length: 25 }).map((_, i) => ({
          label: faker.person.fullName(),
          value: `id${i}`,
        })),
        defaultValue: 'id2',
        placeholder: 'select one',
      },
    },
  ],
}

export default example
