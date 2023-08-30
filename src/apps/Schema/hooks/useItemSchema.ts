import { useSchema } from '~/apps/Schema/hooks/useSchema'
import { BasedSchema, BasedSchemaType } from '@based/schema'

export const useItemSchema = (
  id: string
):
  | {
      schema: BasedSchema
      loading: boolean
      type: string
    } & BasedSchemaType => {
  const { schema, loading } = useSchema()
  if (loading || !id) {
    return { loading, schema, fields: {}, type: '' }
  }
  if (id === 'root') {
    return { schema, loading: false, type: 'root', ...schema.types.root }
  } else {
    const type = schema.prefixToTypeMapping[id.substring(0, 2)]
    return { schema, loading: false, type, ...schema.types[type] }
  }
}
