import {
  TextIcon,
  SquareBracketsIcon,
  TagIcon,
  TwentyThreeIcon,
  ApertureIcon,
  IntegerIcon,
  TimeIcon,
  ToggleIcon,
  JsonIcon,
} from '~/icons'
import { BasedSchemaFieldPrimitive } from '@based/schema'
import { FieldDisplayOptions } from './index'

type PrimitiveDisplayOptions = {
  schema?: BasedSchemaFieldPrimitive
}

type NewPrimitive = FieldDisplayOptions & PrimitiveDisplayOptions

export const primitives: { [key: string]: NewPrimitive } = {
  string: {
    label: 'String',
    color: 'lightaccent',
    description: 'Non internationalized string',
    icon: TextIcon,
    schema: { type: 'string' },
  },
  enum: {
    label: 'Enum',
    color: 'lightaccent',
    description: 'Define a set of named constants',
    icon: SquareBracketsIcon,
    // TODO look into this
    schema: { type: 'enum' },
  },
  // const: {
  //   label: 'Const',
  //   color: 'lightaccent',
  //   description: 'Restrict a value',
  //   icon: TagIcon,
  //   schema: { type: 'const' },
  // },
  number: {
    label: 'Number',
    color: 'lightaccent',
    description: 'Numbers (float)',
    icon: TwentyThreeIcon,
    schema: { type: 'number' },
  },
  cardinality: {
    label: 'Cardinality',
    color: 'lightaccent',
    description: 'algorithm for the count-distinct problem',
    icon: ApertureIcon,
    schema: { type: 'cardinality' },
  },
  //  TODO change to integer
  int: {
    label: 'Integer',
    color: 'lightaccent',
    description: 'A whole number',
    icon: IntegerIcon,
    // TODO look into this
    schema: { type: 'int' },
  },
  timestamp: {
    label: 'Timestamp',
    color: 'lightaccent',
    description: 'A digital time record',
    icon: TimeIcon,
    schema: { type: 'timestamp' },
  },
  boolean: {
    label: 'Boolean',
    color: 'lightaccent',
    description: 'True or false',
    icon: ToggleIcon,
    schema: { type: 'boolean' },
  },
  json: {
    label: 'JSON',
    color: 'lightaccent',
    description: 'A JSON object',
    icon: JsonIcon,
    schema: { type: 'json' },
  },
}
