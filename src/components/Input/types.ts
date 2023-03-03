import { FC, ReactNode, RefObject, KeyboardEvent } from 'react'
import { Space, Icon } from '~/types'
import { Style } from 'inlines'

export type SharedInputProps = {
  icon?: FC<Icon> | ReactNode
  iconRight?: FC<Icon> | ReactNode
  label?: ReactNode
  description?: string
  descriptionBottom?: string
  indent?: boolean
  placeholder?: string
  ghost?: boolean
  autoFocus?: boolean
  style?: Style
  pattern?: string
  disabled?: boolean
  inputRef?: RefObject<HTMLDivElement>
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
  /** 
    Do not use external state while focused
  */
  noInterrupt?: boolean
  space?: Space
  transform?: (str: string) => string // transform string
  bg?: any
}

export type TextInputProps = SharedInputProps & {
  type: 'text' | 'email' | 'password' | 'phone'
  defaultValue?: string
  value?: string
  onChange: (value: string) => void
  maxChars?: number
  multiline?: false
  error?: (str: string, patternMatches?: boolean) => string
}

export type MultiLineTextInputProps = SharedInputProps & {
  defaultValue?: string
  value?: string
  onChange: (value: string) => void
  maxChars?: number
  error?: (str: string) => string
} & (
    | {
        type: 'text'
        multiline: true
      }
    | {
        type: 'markdown' | 'json'
        multiline?: true
      }
  )
export type NumberInputProps = SharedInputProps & {
  type: 'number' | 'date'
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  defaultValue?: number
  multiline?: false
}
export type ColorInputProps = SharedInputProps & {
  type: 'color'
  multiline?: false
  defaultValue: string
  value: string
  inputRef?: RefObject<HTMLInputElement>
  onChange: (value: any) => void
}

export type InputProps =
  | MultiLineTextInputProps
  | TextInputProps
  | NumberInputProps
  | ColorInputProps

export const isMultiLineTextInput = (
  props: InputProps
): props is MultiLineTextInputProps => {
  return (
    props.type === 'markdown' ||
    props.type === 'json' ||
    props.multiline === true
  )
}

export const isTextInput = (props: InputProps): props is TextInputProps => {
  return (
    (props.type === 'text' && !props.multiline) ||
    props.type === 'password' ||
    props.type === 'email' ||
    props.type === 'phone'
  )
}
export const isNumberInput = (props: InputProps): props is NumberInputProps => {
  return props.type === 'number' || props.type === 'date'
}
export const isColorInput = (props: InputProps): props is ColorInputProps => {
  return props.type === 'color'
}
