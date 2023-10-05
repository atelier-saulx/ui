import { ReactNode } from 'react'
import { Style } from 'inlines'

type onChange = (changes: { [field: string]: any }) => void | Promise<void>

export type SettingGroupItem = {
  label?: ReactNode
  props?: { [key: string]: string }
  value?: any
  type?: 'number' | 'text' | 'range' | 'boolean'
  description?: ReactNode
  field: string
  options?: any[]
  default?: any
}

export type FormGroupValues = { [field: string]: any }

export type FormGroupProps = {
  style?: Style
  fieldWidth?: number
  labelWidth?: number
  variant?: 'column' | 'grid'
  onChange: onChange
  values?: FormGroupValues
  config?:
    | SettingGroupItem[]
    | {
        [field: string]:
          | null
          | ReactNode
          | (Omit<SettingGroupItem, 'field'> & { field?: string })
      }
  alwaysAccept?: boolean
}

export type ValuesChanged = { [field: string]: any }

export type OnChangeField = (field: string, value: any) => void

export type FormGroupVariantProps = {
  onChange: onChange
  parsedData: SettingGroupItem[]
  fieldWidth: number
  labelWidth: number
  onChangeField: OnChangeField
  style: Style
  hasChanges: boolean
  valuesChanged: ValuesChanged
  values: FormGroupValues
  alwaysAccept: boolean
  setChanges: (val: boolean) => any
}
