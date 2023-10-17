import React from 'react'
import { Code } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Code Editor',
  component: Code,
  description: '',
  properties: props.props.CodeProps.props,
  examples: [
    {
      props: {
        style: { width: 500 },
        language: 'markup',
        color: 'neutral',
        defaultValue: `<style>
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
        // onChange: (v) => {
        //   console.log(v)
        // },
      },
    },
  ],
}

export default example
