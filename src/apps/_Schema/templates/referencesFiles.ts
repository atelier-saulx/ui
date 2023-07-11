import { Field } from '../types'
import { ChildrenIcon, AttachmentIcon } from '~/icons'

export const referencesFiles: { [key: string]: Field } = {
  reference: {
    label: 'Reference',
    color: 'lightyellow',
    description: 'References you know it',
    icon: ChildrenIcon,
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    color: 'lightyellow',
    description: 'References ',
    icon: ChildrenIcon,
    schema: { type: 'references' },
  },
  file: {
    label: 'File',
    color: 'lightyellow',
    description: 'File or Files upload',
    icon: AttachmentIcon,
    schema: {
      type: 'reference',
      meta: {
        format: 'file',
        refTypes: ['file'],
      },
    },
  },
  files: {
    label: 'Files',
    color: 'lightyellow',
    description: 'Multiple files',
    icon: AttachmentIcon,
    schema: {
      type: 'references',
      meta: {
        format: 'files',
        refTypes: ['files'],
      },
    },
  },
}
