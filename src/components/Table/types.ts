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
  key: string
  width?: number
  label?: ReactNode
  mimeTypeKey?: string
  type?: string
  showColumnCheckbox?: boolean
  customComponent?: TableCustomComponent<T>
  customLabelComponent?: FC
  meta?: any
}

export type SortOptions = {
  $field: string
  $order: 'asc' | 'desc'
}
