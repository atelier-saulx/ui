import {
  CurlyBracesIcon,
  DocIcon,
  PenIcon,
  SquareBracketsIcon,
  SetIcon,
} from '~/icons'
import { FieldDisplayOptions } from './index'
import { BasedSchemaFieldEnumerable } from '@based/schema'

type EnumerableDisplayOptions = {
  schema?: BasedSchemaFieldEnumerable
}

type NewEnumerable = FieldDisplayOptions & EnumerableDisplayOptions

export const enumerable: { [key: string]: NewEnumerable } = {
  text: {
    label: 'Text',
    description: 'Editor with formatting',
    color: 'lightpink',
    icon: PenIcon,
    schema: { type: 'text' },
  },
  object: {
    label: 'Object',
    color: 'lightpink',
    description: 'Multiple types',
    icon: CurlyBracesIcon,
    // TODO: Properties
    schema: { type: 'object', properties: {} },
  },
  record: {
    label: 'Record',
    color: 'lightpink',
    description: 'A fixed collection of fields',
    icon: DocIcon,
    schema: { type: 'record', values: {} },
  },
  array: {
    label: 'Array',
    color: 'lightpink',
    description: 'A collection of similar types',
    icon: SquareBracketsIcon,
    schema: { type: 'array', items: {} },
  },
  set: {
    label: 'Set',
    color: 'lightpink',
    description: 'A collection of unique values',
    icon: SetIcon,
    schema: { type: 'set', items: {} },
  },
}
