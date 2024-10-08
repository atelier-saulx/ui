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
  render?: (item: any, opts?: TableFieldRenderOptions) => ReactNode // TODO add index here too, it can be useful sometimes
  type?: 'image' | 'badge' | 'number-bytes' | 'date-time-human'
}

export type { Select, Sort, Field }
