import React, { FC } from 'react'
import { isMultiLineTextInput, isTextInput, InputProps } from './types'
import { MultiLineTextInput } from './MultilineTextInput'
import { TextInput } from './TextInput'

export const Input: FC<InputProps> = (props) => {
  if (isMultiLineTextInput(props)) {
    return <MultiLineTextInput {...props} />
  }

  if (isTextInput(props)) {
    return <TextInput {...props} />
  }

  return null
}
