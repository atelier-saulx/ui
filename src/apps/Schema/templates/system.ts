import { Field } from '../types'
import { IdIcon, ListIcon } from '~/icons'

export const system: { [key: string]: Field } = {
  id: {
    label: 'Identifier',
    color: 'lightgrey',
    description: 'IDs you know it',
    icon: IdIcon,
    schema: { type: 'id' },
  },
  type: {
    label: 'Type',
    color: 'lightgrey',
    description: 'Types you know it',
    icon: ListIcon,
    schema: { type: 'type' },
  },
}
