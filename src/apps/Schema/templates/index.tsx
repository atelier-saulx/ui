import { text } from './text'
import { numbers } from './number'
import { complexDataStructures } from './complexDataStructures'
import { plainFormattedData } from './plainFormattedData'
import { richFormattedData } from './richFormattedData'
import { referencesFiles } from './referencesFiles'
import { system } from './system'
import { Color, Icon } from '~/types'
import { FC } from 'react'
import { primitives } from './Primitives'
import { enumerable } from './enumerable'

export type Field = {
  label: string
  description: string
  color: Color
  icon: FC<Icon>
  schema: {
    type: string
    properties?: object
    values?: object
    items?: object
    meta?: FieldMeta
  }
  hidden?: boolean
}

export type FieldMeta = {
  index?: number
  name?: string
  description?: string
  format?: Format
  refTypes?: string[]
  readOnly?: boolean
  mimeType?: MimeType[]
  progressMin?: number
  progressMax?: number
  mustFill?: boolean
  maxChar?: number
  regex?: string
}

export type Format =
  | 'url'
  | 'email'
  | 'geo'
  | 'file'
  | 'files'
  | 'markdown'
  | 'bytes'
  | 'progress'
  | 'src'

export const groups = {
  Primitives: primitives,
  Enumerables: enumerable,
  References: referencesFiles,
  // 'Text and String': text,
  // 'Plain Formatted Data': plainFormattedData,
  // Numbers: numbers,
  // 'Complex Data Structures': complexDataStructures,
  // 'Rich Formatted Data': richFormattedData,
  // 'References and Files': referencesFiles,
  // System: system,
}

export const templates: {
  [key: string]: Field
} = {}

for (const group in groups) {
  for (const template in groups[group]) {
    templates[template] = groups[group][template]
  }
}

export const systemFields = new Set([
  'id',
  'type',
  'children',
  'parents',
  'createdAt',
  'updatedAt',
])

export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])
