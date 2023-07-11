import { Field } from '../types'
import {
  SquareBracketsIcon,
  SetIcon,
  CurlyBracesIcon,
  DocIcon,
  JsonIcon,
} from '~/icons'

export const complexDataStructures: { [key: string]: Field } = {
  array: {
    label: 'Array',
    color: 'lightorange',
    description: 'A collection of similar types',
    icon: SquareBracketsIcon,
    schema: { type: 'array', items: {} },
  },
  set: {
    label: 'Set',
    color: 'lightorange',
    description: 'A collection of unique values',
    icon: SetIcon,
    schema: { type: 'set', items: {} },
  },
  object: {
    label: 'Object',
    color: 'lightorange',
    description: 'Multiple types',
    icon: CurlyBracesIcon,
    schema: { type: 'object', properties: {} },
  },
  record: {
    label: 'Record',
    color: 'lightorange',
    description: 'A fixed collection of fields',
    icon: DocIcon,
    schema: { type: 'record', values: {} },
  },
  json: {
    label: 'JSON',
    color: 'lightorange',
    description: 'A JSON object',
    icon: JsonIcon,
    schema: { type: 'json' },
  },
}
