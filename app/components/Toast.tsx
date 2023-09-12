import React from 'react'
import { Toast } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Toast',
  component: Toast,
  description: '',
  properties: props.props.ToastProps.props,
  examples: [
    {
      props: {
        label: 'Toast text',
        closeable: true,
        color: 'informative',
        description: 'Hellow',
        strong: true,
        action: { onClick: () => alert('snurp'), label: 'Action' },
      },
    },
    {
      props: {
        label: 'Toast text',
        color: 'warning',
        strong: true,
        description: 'Warning',
        action: { onClick: () => alert('snurp'), label: 'Action' },
        closeable: true,
      },
    },
    {
      props: {
        label: 'DESTROY',
        color: 'negative',
        strong: true,
        description: 'destructive',
        action: { onClick: () => alert('snurp'), label: 'Action' },
        closeable: true,
      },
    },
    // default'|'inverted'|'neutral'|'informative'|'positive'|'warning'|'negative'|'brand
    {
      props: {
        label: 'Toast text',
        color: 'positive',
        description: 'good job!',
        closeable: true,
      },
    },
    {
      props: {
        label: 'Based Af',
        color: 'brand',
        strong: true,
        description: 'good job!',
        closeable: true,
      },
    },
    {
      props: {
        label: 'Wow oppositez≈',
        color: 'inverted',
        strong: true,
        description: 'good job!',
        closeable: true,
      },
    },
  ],
}

export default example
