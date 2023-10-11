import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import { Text, ScrollArea } from '../../components'
import { styled, Style } from 'inlines'
import { Log, LogProps } from './Log'
import { useVirtual } from '@tanstack/react-virtual'

export type LogsTextProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  style?: Style
}

export const LogsText: FC<LogsTextProps> = ({ data, style }) => {
  const parentRef = useRef(null)
  const size = data.length

  const rowVirtualizer = useVirtual({
    parentRef: parentRef,
    size,
    estimateSize: useCallback(() => 15, []),
    overscan: 20,
  })

  const ignoreNext = useRef(false)
  const [smoothScroll, setSmooth] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
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
    }
    return () => {
      clearTimeout(timer)
    }
  }, [data && data.length, parentRef.current, autoScroll])

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          ...style,
        }}
      >
        <styled.div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualItem) => (
            <styled.div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
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
      </ScrollArea>
    </styled.div>
  )
}
