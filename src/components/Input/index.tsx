import React, { FC } from 'react'
import {
  isMultiLineTextInput,
  isTextInput,
  InputProps,
  isNumberInput,
  // isColorInput,
} from './types'
import { MultiLineTextInput } from './MultilineTextInput'
import { TextInput } from './TextInput'
import { NumberInput } from './NumberInput'
// import { ColorInput } from './ColorInput'

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
  // if (isColorInput(props)) {
  //   return <ColorInput {...props} />
  // }

  return null
}
