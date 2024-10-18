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

const MOST_LIKELY_TITLE_FIELD_KEYS = ['title', 'name']
function getTitleField(fields: Field[]) {
  return fields.find((e) => MOST_LIKELY_TITLE_FIELD_KEYS.includes(e.key))
}

export { getTitleField }
export type { Select, Sort, Field }
