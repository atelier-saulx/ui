import { RefObject, useLayoutEffect, useState } from 'react'

type UseVirtualizerProps = {
  itemCount: number
  itemHeight: number
  scrollElementRef: RefObject<HTMLElement>
  overScan?: number
}

function useVirtualizer({
  itemCount,
  itemHeight,
  scrollElementRef,
  overScan: overScanProp,
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

    let overScan = overScanProp ?? Math.ceil(numberOfItemsVisibleAtOnce / 2)

    setFirstVisibleItemIndex(Math.max(0, firstVisibleItemIndex - overScan))
    setLastVisibleItemIndex(
      Math.min(itemCount, lastVisibleItemIndex + overScan),
    )
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
  }, [scrollElementRef, itemCount])

  return {
    firstVisibleItemIndex,
    lastVisibleItemIndex,
  }
}

export { useVirtualizer }
export type { UseVirtualizerProps }
