import React from 'react'
import { Container } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Container',
  component: Container,
  description: '',
  properties: props.props.CodeProps.props,
  examples: [
    {
      props: {
        style: { width: 500 },
        codeLanguage: 'markup',
        color: 'neutral',
        value: `<style>
  .class{
      background-color:yellow;
      font-size:14px;
      padding:24px;
  }
</style>

<div class="snurp"><h2>hellow</h2>
  <p>paragraph</p>
  <button>press</button>
</div>`,
        onChange: (v) => {
          console.log(v)
        },
      },
    },
  ],
}

export default example
