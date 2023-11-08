import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import { Text, ScrollArea } from '../../components'
import { styled, Style } from 'inlines'
import { Log, LogProps } from './Log'
import { useVirtualizer } from '@tanstack/react-virtual'

export type LogsTextProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  style?: Style
}

export const LogsText: FC<LogsTextProps> = ({ data, style }) => {
  const [isMouseOver, setIsMouseOver] = useState(false)

  const parentRef = useRef(null)
  const size = data.length

  const virtualizer = useVirtualizer({
    count: size,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
  })

  const items = virtualizer.getVirtualItems()
  const [autoScroll, setAutoScroll] = useState(true)
  const virtualTotalSize = virtualizer.getTotalSize()

  useEffect(() => {
    if (autoScroll && !isMouseOver) {
      setTimeout(() => {
        const element = parentRef.current
        const elementScrollHeight = parentRef.current.scrollHeight
        element.scrollTop = elementScrollHeight
      }, 700)
    }
  }, [virtualTotalSize, parentRef.current])

  return (
    <ScrollArea
      onScroll={(e) => {
        if (isMouseOver) {
          if (
            e.target.scrollTop >=
            parentRef.current.scrollHeight - parentRef.current.clientHeight - 10
          ) {
            setAutoScroll(false)
          } else if (
            e.target.scrollTop <
            parentRef.current.scrollHeight - parentRef.current.clientHeight - 10
          ) {
            setAutoScroll(true)
          }
        }
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
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
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
