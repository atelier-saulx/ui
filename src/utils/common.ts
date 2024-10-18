import { ReactNode } from 'react'
import { TableFieldRenderOptions } from '../components/Table/index.js'

type Select = string[]

type Sort = {
  key: string
  direction: 'asc' | 'desc'
}

type Field = {
  key: string
  title?: string | (() => ReactNode)
  render?: (item: any, opts?: TableFieldRenderOptions) => ReactNode
  type?: 'image' | 'badge' | 'number-bytes' | 'date-time-human'
  calendar?: 'start' | 'end'
}

export type { Select, Sort, Field }
