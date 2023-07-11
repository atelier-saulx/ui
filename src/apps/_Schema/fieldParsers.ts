import { systemFields, alwaysIgnore } from './templates'
import { FieldSchema, TypeSchema } from './types'

export const sortFields = (fields: {
  [key: string]: FieldSchema
}): string[] => {
  return Object.keys(fields).sort((a, b) => {
    const indexA = fields[a].meta?.index
    const indexB = fields[b].meta?.index
    if (indexA === undefined) {
      if (indexB === undefined) {
        if (systemFields.has(a)) {
          if (!systemFields.has(b)) {
            return -1
          }
        } else if (systemFields.has(b)) {
          return 1
        }
        return a < b ? -1 : 1
      }
      return 1
    }
    return indexA < indexB ? -1 : 1
  })
}

export const sortAndFlatten = (fields: {
  [key: string]: FieldSchema
}): string[] => {
  const sortedFields = sortFields(fields)
  for (let i = sortedFields.length - 1; i >= 0; i--) {
    const key = sortedFields[i]
    if (fields[key].type === 'record') {
      const { properties } = fields[key].values
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.values.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'array') {
      const { properties } = fields[key].items
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.items.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'object') {
      const nested = sortAndFlatten(fields[key].properties)
      nested.forEach((nestedKey, index) => {
        nested[index] = `${key}.properties.${nestedKey}`
      })
      sortedFields.splice(i + 1, 0, ...nested)
    }
  }
  return sortedFields
}

export const expandFieldPath = (
  typeDef: TypeSchema,
  field: string[] = []
): string[] => {
  const schemaFields: { [key: string]: FieldSchema } = typeDef.fields
  if (field.length) {
    const newField = []
    let n: FieldSchema | { [key: string]: FieldSchema } = schemaFields
    for (const f of field) {
      if (n === undefined) {
        return []
        break
      }
      n = n[f]
      newField.push(f)
      if ('properties' in n) {
        newField.push('properties')
        n = n.properties
      } else if ('values' in n) {
        newField.push('values', 'properties')
        n = n.values?.properties
      } else if ('items' in n) {
        newField.push('items', 'properties')
        n = n.items?.properties
      }
    }
    return newField
  }

  return field
}

export const filteredFields = (
  typeDef: TypeSchema,
  includeSystemFields: boolean,
  excludeFieldPrefix?: string | number | boolean,
  excludeSet: Set<string> = new Set(),
  field: string[] = []
): {
  filtered: string[]
  objects: { [key: string]: { field: string } & FieldSchema }
  properties: { [key: string]: FieldSchema }
} => {
  const expandedField = expandFieldPath(typeDef, field)
  const sortedFields = sortAndFlatten(typeDef.fields)
  const fields = typeDef.fields

  const properties = {}
  const objects = {}
  const objectPath: any[] = []

  const filtered = sortedFields.filter((field) => {
    if (alwaysIgnore.has(field)) {
      return false
    }
    if (!includeSystemFields && systemFields.has(field)) {
      return false
    }
    if (excludeFieldPrefix && field.startsWith(`${excludeFieldPrefix}.`)) {
      return false
    }
    const path = field.split('.')

    if (expandedField.length) {
      for (let i = 0; i < expandedField.length; i++) {
        if (path[i] !== expandedField[i]) {
          return false
        }
      }
    }

    // @ts-ignore
    const fieldDef: FieldSchema = path.reduce(
      // @ts-ignore
      (fields, key) => fields[key],
      fields
    )

    if (fieldDef.$delete) {
      return false
    }

    while (objectPath.length) {
      const parent = objectPath[objectPath.length - 1]
      if (field.startsWith(parent.field)) {
        if (excludeSet.has(parent.field)) {
          return false
        } else {
          properties[field] = parent
        }
        break
      } else {
        objectPath.pop()
      }
    }

    if (
      fieldDef.type === 'object' ||
      fieldDef.items?.type === 'object' ||
      fieldDef.values?.type === 'object'
    ) {
      const obj = (objects[field] = { field, type: fieldDef.type })
      objectPath.push(obj)
    }

    return true
  })

  return {
    filtered,
    objects,
    properties,
  }
}
