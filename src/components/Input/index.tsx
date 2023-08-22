/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { SelectInput, SelectInputProps } from './SelectInput'
import { SearchInput, SearchInputProps } from './SearchInput'

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + value)
}

type InputProps =
  | ({ type: 'text' } & TextInputProps)
  | ({ type: 'search' } & SearchInputProps)
  | ({ type: 'select' } & SelectInputProps)

export function Input(props: InputProps) {
  switch (props.type) {
    case 'text': {
      const { type, ...narrowedProps } = props
      return <TextInput {...narrowedProps} />
    }
    case 'search': {
      const { type, ...narrowedProps } = props
      return <SearchInput {...narrowedProps} />
    }
    case 'select': {
      const { type, ...narrowedProps } = props
      return <SelectInput {...narrowedProps} />
    }
    default:
      expectNever(props)
  }
}
