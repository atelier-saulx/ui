import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import { Text, ScrollArea } from '../../components'
import { styled, Style } from 'inlines'
import { Log, LogProps } from './Log'
import { useVirtualizer } from '@tanstack/react-virtual'

export type LogsTextProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  style?: Style
  autoScroll?: boolean
}

export const LogsText: FC<LogsTextProps> = ({
  data,
  style,
  autoScroll: autoscrl,
}) => {
  const parentRef = useRef(null)
  const size = data.length

  const virtualizer = useVirtualizer({
    count: size,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
  })

  const items = virtualizer.getVirtualItems()

  const ignoreNext = useRef(false)
  const [smoothScroll, setSmooth] = useState(false)
  const [autoScroll, setAutoScroll] = useState(autoscrl)
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    let timer
    if (autoScroll) {
      const element = parentRef.current
      timer = setTimeout(() => {
        ignoreNext.current = true
        element.scrollTop = element.scrollHeight
        timer = setTimeout(() => {
          setSmooth(true)
        }, 1000)
      }, 100)
      ignoreNext.current = true
      element.scrollTop = element.scrollHeight
      virtualizer.scrollToIndex(size - 1)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [data && data.length, parentRef.current, autoScroll])

  return (
    <ScrollArea
      onScroll={(e) => {
        if (e.target.scrollTop > maxScroll) {
          setMaxScroll(e.target.scrollTop)
        }
        if (e.target.scrollTop < scrollY) {
          setAutoScroll(false)
        }
        if (e.target.scrollTop >= maxScroll) {
          setAutoScroll(true)
        }
        setScrollY(e.target.scrollTop)
      }}
      ref={parentRef}
      style={{
        height: `400px`,
        overflowY: 'auto',
        overflowX: 'clip',
        scrollBehavior: 'smooth',
        width: '100%',
        // ...style,
      }}
    >
      <styled.div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <styled.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualItem) => (
            <styled.div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
            >
              <Log
                data={data}
                index={virtualItem.index}
                label={data[virtualItem.index].label}
                ts={data[virtualItem.index].ts}
                log={data[virtualItem.index].log}
                type={data[virtualItem.index].type}
              />
            </styled.div>
          ))}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
