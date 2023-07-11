import { TextIcon, AddIcon, PenIcon, LockIcon } from '~/icons'
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
    color: 'lightpurple',
    icon: PenIcon,
    schema: { type: 'text' },
  },
}
