import { CloseObserve } from '@based/client/dist/types'
import { useClient } from '@based/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCallbackRef } from './useCallbackRef'

type UseInfiniteQueryProps = {
  queryFn: (offset: number) => any
  accessFn: (data: any) => any
}

export function useInfiniteQuery(props: UseInfiniteQueryProps) {
  const client = useClient()
  const subscriptions = useRef<(CloseObserve | null)[]>([])
  const dataChecksums = useRef<number[]>([])
  const fetchingMore = useRef(false)
  const queryFn = useCallbackRef(props.queryFn)
  const accessFn = useCallbackRef(props.accessFn)
  const [visibleElements, setVisibleElements] = useState<number[] | null>()

  const [data, setData] = useState<any[]>([])
  const chunkSize = useMemo(
    () => Math.max(...data.map((e) => (e ? accessFn(e) : []).length)),
    [data, accessFn]
  )
  const flatData = useMemo(
    () => data.flatMap((e) => (e ? accessFn(e) : [])),
    [data, accessFn]
  )

  const fetchMore = useCallback(() => {
    if (!fetchingMore.current) {
      fetchingMore.current = true

      const index = subscriptions.current.length

      subscriptions.current[index] = client
        .query('db', queryFn(flatData.length))
        .subscribe((chunk, checksum) => {
          dataChecksums.current[index] = checksum

          // TODO: can be greatly optmized by not copying stuff
          // just use checksum

          // test with 100 items at least and updating every 1ms youll see

          // checksum based

          setData((prevData) => {
            const newData = [...prevData]
            newData[index] = chunk
            return newData
          })
          fetchingMore.current = false
        })
    }
  }, [flatData.length])

  useEffect(() => {
    fetchMore()
    return () => {
      for (const unsubscribe of subscriptions.current) {
        unsubscribe?.()
      }
    }
  }, [])

  useEffect(() => {
    if (visibleElements?.length) {
      const firstVisibleChunkIndex = Math.floor(
        Math.min(...visibleElements) / chunkSize
      )
      const lastVisibleChunkIndex = Math.ceil(
        Math.max(...visibleElements) / chunkSize
      )

      for (let i = 0; i < subscriptions.current.length; i++) {
        if (i < firstVisibleChunkIndex || i > lastVisibleChunkIndex) {
          const unsubscribe = subscriptions.current[i]
          if (unsubscribe) {
            unsubscribe()
            subscriptions.current[i] = null
          }
        } else {
          if (subscriptions.current[i] === null) {
            const unsubscribe = client
              .query('db', queryFn(i * chunkSize))
              .subscribe((chunk, checksum) => {
                if (dataChecksums.current[i] !== checksum) {
                  dataChecksums.current[i] = checksum

                  // yes
                  setData((prevData) => {
                    const newData = [...prevData]
                    newData[i] = chunk

                    return newData
                  })
                }
              })

            subscriptions.current[i] = unsubscribe
          }
        }
      }
    }
  }, [visibleElements, chunkSize])

  return { data: flatData, fetchMore, setVisibleElements }
}
