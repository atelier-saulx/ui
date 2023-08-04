import { useClient } from '@based/react'
import React from 'react'
import { Dialog } from '~/components/Dialog'
import { Toast, useToast } from '~/components/Toast'
import { useSchema } from '../hooks/useSchema'
import { useContextState } from '~/hooks/ContextState'
import { transformOldToNew, metaFieldRemover } from '../transformOldSchema'

export const Confirm = ({ disabled, options, type, children, path }) => {
  console.log('PROPS 📀 =-->', options, type, children, 'Path 🛣', path)

  const [db] = useContextState('db', 'default')

  const { schema } = useSchema(db)
  const { types, rootType } = schema
  const toast = useToast({ attached: true })
  const client = useClient()

  const arrayFromField = options?.field?.split('.')

  // filter the null and empty strings
  // if (arrayFromField.length > 1) {
  //   console.log('❎')
  //   path = arrayFromField
  //   field = arrayFromField[arrayFromField.length - 1]
  // }

  return (
    <Dialog.Confirm
      disabled={disabled}
      onConfirm={async () => {
        try {
          let { field, ...schema } = options

          console.log('old field 🛂--> ', field)

          if (arrayFromField?.length > 1) {
            field = arrayFromField.pop()
            console.log('test new fiedl? 💹---> field', field)

            path = arrayFromField
            // field = arrayFromField[0]
            console.log('new path --> ', path)
          }

          // if (options.field.split('.').length > 1) {
          //   field = field.split('.')[field.split('.').length - 1]
          // }

          if (!schema.title) {
            throw Error('Title is required')
          }

          if (!field) {
            throw Error('Field name is required')
          }
          const currentFields =
            type === 'root' ? rootType.fields : types[type].fields

          const fields = {}
          let from = currentFields
          let dest = fields
          let i = 0
          const l = path.length

          while (i < l) {
            const key = path[i++]
            dest[key] = { ...from[key] }
            dest = dest[key]
            // @ts-ignore TODO: fix
            from = from[key]
          }

          dest[field] = {
            ...from[field],
            ...schema,
          }

          // remove fields with null or empty strings
          Object.keys(dest[field]).forEach((k) =>
            dest[field][k] == null
              ? delete dest[field][k]
              : dest[field][k] === ''
              ? delete dest[field][k]
              : dest[field][k] === false
              ? delete dest[field][k]
              : null
          )

          // Transform the fields, meta
          console.log(fields, '☄️')
          // console.log('dest', dest)
          // console.log('currentFields', currentFields)
          // console.log(from)

          // console.log('⚠️types->', types)
          // console.log('🚸type->', type)
          // console.log('❎field->', field)
          // console.log('✅fields??', fields)

          /// remove meta from eiter object field or field
          // might need some beautifiying 🧚🏻

          console.log('path???', path)

          if (path?.length <= 1) {
            Object.assign(fields, transformOldToNew({ ...dest }))
          } else {
            metaFieldRemover({ ...dest })
          }

          if (type === 'root') {
            return client.call('db:set-schema', {
              mutate: true,
              db,
              schema: {
                rootType: {
                  fields,
                },
              },
            })
          } else {
            return client.call('db:set-schema', {
              mutate: true,
              db,
              schema: {
                types: {
                  [type]: {
                    fields,
                  },
                },
              },
            })
          }
        } catch (e) {
          toast(
            <Toast type="error" label={e.message}>
              Try updating your settings
            </Toast>
          )
          throw e
        }
      }}
    >
      {children}
    </Dialog.Confirm>
  )
}
