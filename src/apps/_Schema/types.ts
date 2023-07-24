import { Color, Icon } from '~/types'
import { FC } from 'react'

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

export type MimeType = 'image' | 'video' | 'audio' | 'document'

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

export type FieldOptions = {
  field?: string
  meta?: FieldMeta
  items?: {
    type: string
  }
}

export type FieldSchema = {
  type: string
  meta?: FieldMeta
  items?: FieldSchema
  $delete?: boolean
  values?: FieldSchema
  properties?: {
    [key: string]: FieldSchema
  }
}

export type TypeSchema = {
  prefix?: string
  meta?: FieldMeta
  fields: {
    [key: string]: FieldSchema
  }
}

export type BasedSchema = {
  languages: string[]
  rootType: TypeSchema
  prefixToTypeMapping: { [key: string]: string }
  types: {
    [key: string]: TypeSchema
  }
}

export type FieldTemplates =
  | 'array'
  | 'boolean'
  | 'createdBy'
  | 'dateTime'
  | 'digest'
  | 'email'
  | 'file'
  | 'files'
  | 'float'
  | 'id'
  | 'int'
  | 'geo'
  | 'markdown'
  | 'number'
  | 'object'
  | 'record'
  | 'reference'
  | 'references'
  | 'string'
  | 'text'
  | 'timestamp'
  | 'type'
  | 'url'
  | 'set'
  | 'json'
  | 'bytes'
