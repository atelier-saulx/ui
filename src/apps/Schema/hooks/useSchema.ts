import { useQuery } from '@based/react'
import { sortFields } from '../fieldParsers'
import {
  BasedSchema,
  BasedSchemaType,
  BasedSchemaField,
  BasedSchemaFieldShared,
} from '@based/schema'
import { transformOldToNew } from '../transformOldSchema'

const addTitle = (
  obj: BasedSchemaType | BasedSchemaFieldShared,
  key: string
) => {
  if (!('title' in obj)) {
    obj.title = key
  }
}

const walkField = (
  obj: BasedSchemaField | BasedSchemaFieldShared,
  key: string
) => {
  addTitle(obj as any, key)
  const target = 'items' in obj ? obj.items : 'values' in obj ? obj.values : obj

  // if (obj.type === 'int') {
  //   console.log('flap 🚢')
  // }

  if ('properties' in target) {
    target.properties = sortFields(target.properties).reduce(
      (properties, key) => {
        const property = target.properties[key]
        walkField(property, key)
        properties[key] = property
        return properties
      },
      {}
    )
  }
}

const walkType = (obj: BasedSchemaType, key: string) => {
  addTitle(obj, key)

  if (obj.fields) {
    obj.fields = sortFields(obj.fields).reduce((fields, key) => {
      const field = obj.fields[key]
      walkField(field, key)
      fields[key] = field
      return fields
    }, {})
  }
}

export const useSchema = (
  db = 'default'
): { schema: BasedSchema; loading: boolean } => {
  // incoming

  const { data, loading } = useQuery('db:schema', { db }, { persistent: true })

  if (!loading) {
    walkType(data.rootType, 'root')
    for (const key in data.types) {
      walkType(data.types[key], key)
    }
  }

  // const parsedSchema = data ? transformOldToNew(data) : undefined

  return { loading, schema: data || { types: {} } }
}
