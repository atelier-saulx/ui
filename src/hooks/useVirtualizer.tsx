import { RefObject, useLayoutEffect, useState } from 'react'

type UseVirtualizerProps = {
  count: number
  itemHeight: number
  scrollElementRef: RefObject<HTMLElement>
}

function useVirtualizer({
  count,
  itemHeight,
  scrollElementRef,
}: UseVirtualizerProps) {
  const [firstVisibleItemIndex, setFirstVisibleItemIndex] = useState(0)
  const [lastVisibleItemIndex, setLastVisibleItemIndex] = useState(0)

  function handleScroll() {
    const scrollTop = scrollElementRef.current.scrollTop
    const height = scrollElementRef.current.getBoundingClientRect().height
    const numberOfItemsVisibleAtOnce = Math.ceil(height / itemHeight)

    const firstVisibleItemIndex = Math.floor(scrollTop / itemHeight)
    const lastVisibleItemIndex =
      firstVisibleItemIndex + numberOfItemsVisibleAtOnce

    // const overScan = 0
    // setFirstVisibleItemIndex(Math.max(0, firstVisibleItemIndex - overScan))
    // setLastVisibleItemIndex(Math.min(count, lastVisibleItemIndex + overScan))
    setFirstVisibleItemIndex(firstVisibleItemIndex)
    setLastVisibleItemIndex(lastVisibleItemIndex)
  }

  useLayoutEffect(() => {
    if (!scrollElementRef.current) return () => {}

    handleScroll()
    scrollElementRef.current.addEventListener('scroll', handleScroll)
    const resizeObserver = new ResizeObserver(handleScroll)
    resizeObserver.observe(scrollElementRef.current)

    return () => {
      scrollElementRef.current.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [scrollElementRef, count])

  return {
    firstVisibleItemIndex,
    lastVisibleItemIndex,
  }
}

export { useVirtualizer }
export type { UseVirtualizerProps }
