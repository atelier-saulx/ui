import React, { useState } from 'react'
import { Input } from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'SelectInput',
  component: Input,
  description: 'Select input',
  properties: {
    label: { type: 'string' },
    description: { type: 'string' },
    placeholder: { type: 'string' },
    clearbutton: { type: 'boolean' },
    searchable: { type: 'boolean' },
  },
  examples: [
    {
      props: {
        type: 'select',
        label: 'This is a label',
        autoFocus: true,
        options: Array.from({ length: 25 }).map((_, i) => ({
          label: faker.person.fullName(),
          value: `id${i}`,
        })),
        // defaultValue: 'id2',
        placeholder: 'select one',
        style: { minWidth: 256 },
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
    {
      props: {
        type: 'select',
        label: 'This one hugs initial width and truncates rest',
        searchable: true,
        options: Array.from({ length: 25 }).map((_, i) => ({
          label: faker.person.fullName(),
          value: `id${i}`,
        })),
        // defaultValue: 'id2',
        hugContent: true,
        placeholder:
          'This is a very long message that will probably be way too long',
      },
    },
  ],
}

export default example
