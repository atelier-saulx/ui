import { useClient, useQuery } from '@based/react'
import { useCallback, useMemo, useState } from 'react'
import { FinderView } from '../components/Finder/index.js'

type UseInfiniteQueryOptions = {
  view: FinderView
  query: (view: FinderView, offset: number, limit: number) => any
  totalQuery: () => any
  transformQueryResult: (queryResult: any) => any
}

type Chunk = {
  offset: number
  limit: number
  data?: any[]
  unsubscribe?: () => void
}

type CalendarChunk = {
  data?: any[]
  unsubscribe?: () => void
}

function useInfiniteQuery({
  view,
  query,
  totalQuery,
  transformQueryResult,
}: UseInfiniteQueryOptions) {
  const client = useClient()
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [calendarChunk, setCalendarChunk] = useState<CalendarChunk>()
  const [scroll, setScroll] = useState({
    first: 0,
    last: 0,
    realFirst: 0,
    realLast: 0,
  })
  const { data: totalData } = useQuery('db', totalQuery())

  const data = useMemo(() => {
    if (view !== 'calendar') {
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
    } else {
      if (calendarChunk?.data) {
        return transformQueryResult(calendarChunk.data)
      }

      return []
    }
  }, [scroll, chunks, calendarChunk, view])

  const handleScroll = useCallback(
    (
      firstVisibleIndex: number,
      lastVisibleIndex: number,
      realFirst: number,
      realLast: number,
    ) => {
      if (
        scroll.first === firstVisibleIndex &&
        scroll.last === lastVisibleIndex
      )
        return

      setScroll({
        first: firstVisibleIndex,
        last: lastVisibleIndex,
        realFirst,
        realLast,
      })

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

          const offset = i * chunkSize
          const limit = chunkSize

          const unsubscribe = client
            .query('db', query(view, offset, limit))
            .subscribe((data) => {
              setChunks((p) => {
                const c = [...p]
                c[i] = { offset, limit, unsubscribe, data }
                return c
              })
            })
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
    [scroll, chunks, query, view, client],
  )

  const handleCalendar = useCallback(
    (start: number, end: number) => {
      calendarChunk?.unsubscribe?.()

      const unsubscribe = client
        .query('db', query(view, start, end))
        .subscribe((data) => {
          setCalendarChunk((p) => ({ data, unsubscribe }))
        })
    },
    [query, client, view, calendarChunk],
  )

  const reset = useCallback(() => {
    setScroll({
      first: 0,
      last: 0,
      realFirst: 0,
      realLast: 0,
    })
    setChunks([])
  }, [])

  return {
    data,
    total: totalData?.total,
    handleScroll,
    handleCalendar,
    scroll,
    reset,
  }
}

export { useInfiniteQuery }
export type { UseInfiniteQueryOptions }
