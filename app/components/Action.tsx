import React from 'react'
import { Action, FormGroup, IconMoreHorizontal } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Action',
  properties: props.props.ButtonProps.props,
  component: Action,
  description: 'Action component',
  examples: [
    {
      props: {
        children: () => (
          <FormGroup
            config={{
              name: {
                description: 'Your full name',
              },
              email: {
                description: 'Valid email addres',
              },
            }}
            onChange={() => {}}
          />
        ),
        label: 'Add someting',
      },
    },
    {
      props: {
        children: () => (
          <FormGroup
            config={{
              name: {
                description: 'Your full name',
              },
              email: {
                description: 'Valid email addres',
              },
            }}
            onChange={() => {}}
          />
        ),
        icon: () => <IconMoreHorizontal />,
      },
    },
    {
      name: 'Small button',
      props: {
        size: 'xsmall',
        children: () => (
          <FormGroup
            config={{
              name: {
                description: 'Your full name',
              },
              email: {
                description: 'Valid email addres',
              },
            }}
            onChange={() => {}}
          />
        ),
        label: 'Add someting',
      },
    },
  ],
}

export default example
