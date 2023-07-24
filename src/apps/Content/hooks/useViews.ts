import { useQuery } from '@based/react'
// import { useSchema } from '~'
import { View } from '../types'

export const useViews = (): {
  views: View[]
  loading: boolean
} => {
  const { data, loading } = useQuery<{
    views: View[]
  }>('based:observe-views')

  // const { schema, loading: loadingSchema } = useSchema() // TODO: add multi schema option (using origns)

  if (!loading) {
    return {
      views: data.views ?? [],
      loading: false,
    }
  }
  return {
    views: [],
    loading: true,
  }
}
