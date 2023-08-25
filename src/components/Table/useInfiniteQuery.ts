import { BasedQuery } from '@based/client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { SortOptions } from './types'

type CurrentRef = {
  offset: number
  blocks: number
  scrollY: number
  items: any[]
  timer: ReturnType<typeof setTimeout>
  subs: { [subId: string]: () => void }
}

const stub = (y: number) => undefined

export const useInfiniteQuery = ({
  query,
  getQueryItems,
  rowHeight,
  itemCount,
  height,
  limit = Math.ceil(height / rowHeight),
  treshold = 0,
  queryId = '0',
  delay = 100,
  sortOptions,
}: {
  query?: (start: number, limit: number, sortOptions: SortOptions) => BasedQuery
  getQueryItems?: (data: any) => any[]
  rowHeight: number
  itemCount: number
  height: number
  limit?: number
  delay?: number
  treshold?: number
  queryId?: string
  sortOptions?: SortOptions
}): {
  loading: boolean
  itemCount: number
  items: any[]
  cache: CurrentRef
  onScrollY: (scrollY: number) => void
} => {
  const blockHeight = rowHeight * limit
  const [, setChecksum] = useState('')

  const [offset, setOffset] = useState(0)

  const [blocks, setBlocks] = useState(() => {
    let blocks = Math.ceil(height / blockHeight)
    if (treshold) {
      blocks += Math.ceil(
        (height / rowHeight + treshold - blocks * limit) / limit
      )
    }
    return blocks
  })

  const { current } = useRef<CurrentRef>({
    items: [],
    scrollY: 0,
    timer: null,
    subs: {},
    offset: 0,
    blocks: 0,
  })

  useEffect(() => {
    current.items = []
  }, [queryId])

  useEffect(() => {
    return () => {
      const { subs } = current
      for (const subId in subs) {
        subs[subId]()
      }
      current.subs = {}
    }
  }, [current])

  if (!query) {
    useEffect(() => {}, [])
    useEffect(() => {}, [])
    return {
      loading: false,
      itemCount: 0,
      items: [],
      onScrollY: stub,
      cache: current,
    }
  }

  useEffect(() => {
    const subs: { [subId: string]: () => void } = {}
    let i = blocks
    while (i--) {
      const start = offset + limit * i
      const q = query(start, limit, sortOptions)
      subs[q.id] =
        current.subs[q.id] ||
        q.subscribe((data, checksum) => {
          const items = getQueryItems(data) ?? data.items ?? []
          for (let i = 0; i < items.length; i++) {
            current.items[i + start] = items[i]
          }
          // make this more complex put more in (all ranges + checksums)
          setChecksum(`${offset}-${checksum}`)
        })
    }
    for (const subId in current.subs) {
      if (!(subId in subs)) {
        current.subs[subId]()
      }
    }
    current.subs = subs
  }, [offset, blocks, current, queryId])

  useEffect(update, [
    blockHeight,
    delay,
    height,
    rowHeight,
    current,
    limit,
    treshold,
  ])

  return {
    loading: !itemCount || !current.items.length,
    itemCount,
    items: current.items,
    cache: current,
    onScrollY: (scrollY) => {
      if (current.scrollY !== scrollY) {
        current.scrollY = scrollY
        update()
      }
    },
  }

  function update() {
    const start = Math.max(0, current.scrollY / rowHeight - treshold)
    const end = (current.scrollY + height) / rowHeight
    const newOffset = start - (start % limit)
    let newBlocks = Math.ceil(
      height / blockHeight + (current.scrollY % blockHeight) / blockHeight
    )

    if (treshold) {
      const newLength = newOffset + limit * newBlocks
      newBlocks += Math.max(0, Math.ceil((end + treshold - newLength) / limit))
    }

    if (newOffset !== current.offset || newBlocks !== current.blocks) {
      current.offset = newOffset
      current.blocks = newBlocks

      const set = () => {
        setOffset(current.offset)
        setBlocks(current.blocks)
      }

      if (current.timer) {
        clearTimeout(current.timer)
      } else {
        set()
      }

      current.timer = setTimeout(() => {
        current.timer = null
        set()
      }, delay)
    } else if (current.timer) {
      clearTimeout(current.timer)
      current.timer = setTimeout(() => {
        current.timer = null
        setOffset(current.offset)
        setBlocks(current.blocks)
      }, delay)
    }
  }
}
