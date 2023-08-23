/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { SelectInput, SelectInputProps } from './SelectInput'
import { SearchInput, SearchInputProps } from './SearchInput'
import { FileInput, FileInputProps } from './FileInput'

type InputProps =
  | ({ type: 'text' } & TextInputProps)
  | ({ type: 'search' } & SearchInputProps)
  | ({ type: 'select' } & SelectInputProps)
  | ({ type: 'file' } & FileInputProps)

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
    case 'file': {
      const { type, ...narrowedProps } = props
      return <FileInput {...narrowedProps} />
    }
    default:
      expectNever(props)
  }
}

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + value)
}
