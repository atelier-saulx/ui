import { TextIcon, AddIcon, PenIcon, LockIcon } from '~/icons'
import { Field } from '../types'

export const enumerable: { [key: string]: Field } = {
  text: {
    label: 'Text',
    description: 'Editor with formatting',
    color: 'lightpurple',
    icon: PenIcon,
    schema: { type: 'text' },
  },
}
