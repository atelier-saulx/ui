import { useRoute } from 'kabouter'

export const useQuery = (queryOverwrite) => {
  if (queryOverwrite) {
    return queryOverwrite
  }

  return useRoute().query
}
