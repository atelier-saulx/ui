import React, { useState } from 'react'
import { Input } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const SearchInputProps = (({ icon, afterIcon, ...o }) => o)(
  props.props.TextInputProps.props
)
const example: ComponentDef = {
  name: 'SearchInput',
  component: Input,
  description: 'Text Input',
  properties: SearchInputProps,
  examples: [
    {
      props: {
        placeholder: 'fun',
      },
      customRenderer: (props) => {
        return <Input type="search" {...props} />
      },
    },
    {
      props: {
        label: 'You can add a clear button',
        clearButton: true,
        placeholder: 'Search',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('')
        return (
          <Input
            type="search"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            {...props}
          />
        )
      },
    },
    {
      props: {
        label: 'You can add a label',
        error: 'and an error if you really want',
        placeholder: 'Search',
      },
      customRenderer: (props) => {
        const [value, setValue] = useState('')

        return (
          <Input
            type="search"
            value={value}
            onChange={(v) => {
              setValue(v)
            }}
            {...props}
          />
        )
      },
    },
  ],
}

export default example
