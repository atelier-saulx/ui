import { TextIcon, AddIcon, PenIcon, LockIcon } from '~/icons'
import { Field } from '../types'

export const text: { [key: string]: Field } = {
  string: {
    label: 'String',
    color: 'lightpurple',
    description: 'Non internationalized string',
    icon: TextIcon,
    schema: { type: 'string' },
  },
  markdown: {
    label: 'Markdown',
    color: 'lightpurple',
    description: 'Markdown editor',
    icon: AddIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'markdown',
      },
    },
  },
  text: {
    label: 'Text',
    description: 'Editor with formatting',
    color: 'lightpurple',
    icon: PenIcon,
    schema: { type: 'text' },
  },
  digest: {
    label: 'Digest',
    color: 'lightpurple',
    description: 'Digests for secrets',
    icon: LockIcon,
    schema: { type: 'digest' },
  },
}
