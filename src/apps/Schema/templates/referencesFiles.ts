import { ChildrenIcon, AttachmentIcon } from '~/icons'
import {
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { FieldDisplayOptions } from './index'

type ReferenceDisplayOptions = {
  schema?: BasedSchemaFieldReference | BasedSchemaFieldReferences
}

type NewReference = FieldDisplayOptions & ReferenceDisplayOptions

export const referencesFiles: { [key: string]: NewReference } = {
  reference: {
    label: 'Reference',
    color: 'lightyellow',
    description: 'Single Reference',
    icon: ChildrenIcon,
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    color: 'lightyellow',
    description: 'Multiple References ',
    icon: ChildrenIcon,
    schema: { type: 'references' },
  },
  // file: {
  //   label: 'File',
  //   color: 'lightyellow',
  //   description: 'File or Files upload',
  //   icon: AttachmentIcon,
  //   schema: {
  //     type: 'reference',
  //     meta: {
  //       format: 'file',
  //       refTypes: ['file'],
  //     },
  //   },
  // },
  // files: {
  //   label: 'Files',
  //   color: 'lightyellow',
  //   description: 'Multiple files',
  //   icon: AttachmentIcon,
  //   schema: {
  //     type: 'references',
  //     meta: {
  //       format: 'files',
  //       refTypes: ['files'],
  //     },
  //   },
  // },
}
