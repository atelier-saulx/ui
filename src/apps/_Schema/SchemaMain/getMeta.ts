import { FieldMeta, FieldSchema, TypeSchema } from '../types'

export const getMeta = (fields: string[], type: TypeSchema): FieldMeta => {
  return {}
  //   let obj: FieldSchema
  //   let isNested: boolean
  //   fields.reduce((fields, key) => {
  //     if (!fields) {
  //       return null
  //     }
  //     const { type, properties, items } = fields[key]
  //     if (type) {
  //       if (isNested) {
  //         isNested = false
  //       } else {
  //         obj = fields[key]
  //         if (properties || items) {
  //           isNested = true
  //         }
  //       }
  //     }
  //     return fields[key]
  //   }, fields)
  //   return obj.meta
}
