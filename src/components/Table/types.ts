import { ReactNode, FC, MouseEvent } from 'react'
import { TableProps } from '.'

export type TableCustomComponent<T> = FC<{
  data: T
  header: TableHeader<T>
  context: TableProps<T>
  rowIndex: number
  columnIndex: number
}>

export type TableHeader<T> = {
  customComponent?: TableCustomComponent<T>
  customLabelComponent?: FC
  editable?: boolean
  key: string
  label?: ReactNode
  meta?: any
  mimeTypeKey?: string
  showColumnCheckbox?: boolean
  type?: string
  width?: number
}

export type SortOptions = {
  $field: string
  $order: 'asc' | 'desc'
}
