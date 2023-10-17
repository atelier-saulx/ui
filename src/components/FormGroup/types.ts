import { ReactNode, FC } from 'react'
import { Style } from 'inlines'

type onChange = (changes: { [field: string]: any }) => void | Promise<void>

export type FormItemProps<T = any> = {
  label?: ReactNode
  props?: { [key: string]: string }
  value?: T
  type?:
    | 'number'
    | 'text'
    | 'range'
    | 'checkbox'
    | 'file'
    | 'color'
    | 'password'
    | 'textarea'
    | FC
    | 'string'
    | 'array'
    | 'object'
    | 'record'
    | 'set'
    | 'boolean'
    | 'number'
    | 'json'
    | 'integer'
    | 'timestamp'
    | 'reference'
    | 'references'
    | 'text'
    | 'cardinality'
  description?: ReactNode
  field: string
  options?: any[]
  default?: T
  // change validation to something else error or something
  validation?: (value: T) => boolean | string
  multiple?: boolean
  addMultipleLabel?: string
}

export type FormGroupValues = { [field: string]: any }

export type FormGroupProps = {
  confirmationLabel?: ReactNode
  confirmationVariant?: 'buttons' | 'icons'
  style?: Style
  fieldWidth?: number
  labelWidth?: number
  autoFocus?: boolean
  variant?: 'column' | 'grid'
  onChange: onChange
  values?: FormGroupValues
  config?:
    | FormItemProps[]
    | {
        [field: string]:
          | null
          | ReactNode
          | (Omit<FormItemProps, 'field'> & { field?: string })
      }
  alwaysAccept?: boolean
}

export type ValuesChanged = { [field: string]: any }

export type OnChangeField = (field: string, value: any) => void

export type FormGroupVariantProps = {
  confirmationLabel?: ReactNode
  confirmationVariant?: 'buttons' | 'icons'
  onChange: onChange
  parsedData: FormItemProps[]
  fieldWidth: number
  labelWidth: number
  onChangeField: OnChangeField
  style: Style
  hasChanges: boolean
  valuesChanged: ValuesChanged
  values: FormGroupValues
  alwaysAccept: boolean
  setChanges: (val: boolean) => any
  autoFocus: boolean
}

export type LabelProps = {
  label?: ReactNode
  description?: ReactNode
  children?: ReactNode
  labelWidth?: number
  style?: Style
}
