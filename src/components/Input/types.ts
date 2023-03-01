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

export type InputProps = MultiLineTextInputProps | TextInputProps

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
  return props.type === 'text' && !props.multiline
}
