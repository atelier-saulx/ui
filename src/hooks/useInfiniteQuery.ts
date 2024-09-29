import { useClient, useQuery } from '@based/react'
import { useCallback, useMemo, useState } from 'react'

type UseInfiniteQueryOptions = {
  query: (opts: { limit: number; offset: number }) => any
  totalQuery: () => any
  transformQueryResult: (queryResult: any) => any
}

type Chunk = {
  offset: number
  limit: number
  data?: any[]
  unsubscribe?: () => void
}

function useInfiniteQuery({
  query,
  totalQuery,
  transformQueryResult,
}: UseInfiniteQueryOptions) {
  const client = useClient()
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [scroll, setScroll] = useState({
    first: 0,
    last: 0,
    realFirst: 0,
    realLast: 0,
  })
  const { data: totalData } = useQuery('db', totalQuery())

  const data = useMemo(() => {
    const { first, last } = scroll
    const res: any[] = []

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      if (!chunk?.data) continue
      const unwrappedData = transformQueryResult(chunk.data)

      for (let j = 0; j < unwrappedData.length; j++) {
        if (chunk.offset + j >= first && chunk.offset + j <= last) {
          res.push(unwrappedData[j])
        }
      }
    }

    return res
  }, [scroll, chunks])

  // TODO useEventCallback for the query fn or else the useCallback+[query] is useless?
  const fetchChunk = useCallback(
    (index: number, offset: number, limit: number) => {
      const unsubscribe = client
        .query('db', query({ limit, offset }))
        .subscribe((data) => {
          setChunks((p) => {
            const c = [...p]
            c[index] = { offset, limit, unsubscribe, data }
            return c
          })
        })
    },
    [query],
  )

  const handleScroll = useCallback(
    (
      firstVisibleIndex: number,
      lastVisibleIndex: number,
      realFirst: number,
      realLast: number,
    ) => {
      if (
        scroll.first !== firstVisibleIndex ||
        scroll.last !== lastVisibleIndex
      ) {
        setScroll({
          first: firstVisibleIndex,
          last: lastVisibleIndex,
          realFirst,
          realLast,
        })
      }

      const chunkSize = 128
      const firstChunk = Math.floor(firstVisibleIndex / chunkSize)
      const lastChunk = Math.ceil(lastVisibleIndex / chunkSize)

      for (let i = firstChunk; i < lastChunk; i++) {
        if (!chunks[i]) {
          setChunks((p) => {
            const c = [...p]
            c[i] = { offset: i * chunkSize, limit: chunkSize }
            return c
          })

          fetchChunk(i, i * chunkSize, chunkSize)
        }
      }

      for (let j = 0; j < chunks.length; j++) {
        if (firstChunk > j || lastChunk < j) {
          const chunk = chunks[j]

          if (chunk) {
            chunk.unsubscribe?.()

            setChunks((p) => {
              const c = [...p]
              delete c[j]
              return c
            })
          }
        }
      }
    },
    [scroll, chunks, fetchChunk],
  )

  const reset = useCallback(() => {
    setChunks([])
  }, [])

  return { data, total: totalData?.total, handleScroll, reset, scroll }
}

export { useInfiniteQuery }
export type { UseInfiniteQueryOptions }
