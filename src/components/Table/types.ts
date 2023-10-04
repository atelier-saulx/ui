import { ReactNode, FC, MouseEvent } from 'react'
import { BasedQuery } from '@based/client'
import { Style } from '../..'

export type TableProps<T extends any = any> = {
  calcRowHeight?: (data: any, index: number) => number
  columnCount?: number
  columnWidth?: number
  context?: any
  data?: T[]
  defaultSortOptions?: SortOptions
  getQueryItems?: (data: any) => any[]
  headers?: TableHeader<T>[]
  height?: number
  itemCount?: number
  onClick?: (e: MouseEvent, data: any) => void
  outline?: boolean
  query?: (start: number, limit: number) => BasedQuery
  queryId?: number | string
  rowCount?: number
  rowHeight?: number
  selectable?: boolean
  arrangeAble?: boolean
  setSortKey?: any
  sortKey?: any
  style?: Style
  width?: number
  renderCounter?: any
  setRenderCounter?: any
}

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
