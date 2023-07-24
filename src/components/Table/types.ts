import { ReactNode, FC, MouseEvent } from 'react'
import { BasedQuery } from '@based/client'

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
}

export type SortOptions = {
  $field: string
  $order: 'asc' | 'desc'
}

export type TableProps<T extends any = any> = {
  headers?: TableHeader<T>[]
  query?: (start: number, limit: number) => BasedQuery
  getQueryItems?: (data: any) => any[]
  data?: T[]
  width?: number
  itemCount?: number
  height?: number
  context?: any
  queryId?: number | string
  rowCount?: number
  defaultSortOptions?: SortOptions
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  outline?: boolean
  onClick?: (e: MouseEvent, data: any) => void
  calcRowHeight?: (data: any, index: number) => number
}
