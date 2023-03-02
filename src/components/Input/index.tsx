import React, { FC } from 'react'
import {
  isMultiLineTextInput,
  isTextInput,
  InputProps,
  isNumberInput,
} from './types'
import { MultiLineTextInput } from './MultilineTextInput'
import { TextInput } from './TextInput'
import { NumberInput } from './NumberInput'

export const Input: FC<InputProps> = (props) => {
  if (isMultiLineTextInput(props)) {
    return <MultiLineTextInput {...props} />
  }
  if (isTextInput(props)) {
    return <TextInput {...props} />
  }
  if (isNumberInput(props)) {
    return <NumberInput {...props} />
  }

  return null
}
