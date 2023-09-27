// import React, { FC, useState } from 'react'
// import {
//   ScrollArea,
//   Style,
//   styled,
//   Text,
//   color,
//   Button,
//   IconMoreHorizontal,
//   BpTablet,
// } from '../..'
// import { SingleLogItem, SingleLogItemProps } from './SingleLogItem'

// type LogsProps = {
//   data?: SingleLogItemProps[]
//   style?: Style
//   // top to bottom // reverse order
//   // autoscroll?
//   // infinite scroll ,
//   // behaviour to start at bottom
//   //  clear logs option
//   // group per time --> and type
// }

// export const Logs: FC<LogsProps> = ({ data, style }) => {
//   return (
//     <styled.div>
//       <styled.div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           gap: 12,
//           // border: '1px solid red',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         <Text size={24} weight="strong">
//           Logs
//         </Text>
//         <Button
//           color="neutral"
//           size="xsmall"
//           icon={<IconMoreHorizontal />}
//           style={{
//             '&:hover': {
//               backgroundColor: color('action', 'system', 'hover'),
//             },
//             [BpTablet]: {
//               '&:hover': null,
//             },
//             '&:active': {
//               backgroundColor: color('action', 'system', 'active'),
//             },
//           }}
//         />
//       </styled.div>
//       <ScrollArea
//         style={{
//           maxHeight: 500,
//           width: 600,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 24,
//           ...style,
//         }}
//       >
//         {/* Work in progress 🌲 */}
//         {data?.map((item, idx) => (
//           <SingleLogItem
//             msg={item.msg}
//             status={item.status}
//             ts={item.ts}
//             type={item.type}
//             style={item.style}
//             key={idx}
//           />
//         ))}
//       </ScrollArea>
//     </styled.div>
//   )
// }

import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import {
  ProgressCircle,
  color,
  IconDelete,
  Input,
  styled,
  Text,
  Style,
  ScrollArea,
} from '../../'
import { Log, LogProps } from './Log'
import { useVirtual } from '@tanstack/react-virtual'

export type LogsTextProps = {
  data: Exclude<LogProps, 'data' | 'index'>[]
  // autoScroll?: boolean
  style?: Style
}

export const LogsText: FC<LogsTextProps> = ({
  data,
  style,
  // autoScroll: autoScrollProp = true,
}) => {
  const parentRef = useRef(null)
  const size = data.length
  //why are there so many conflicting docs on the tanstack website lol

  const rowVirtualizer = useVirtual({
    parentRef: parentRef,
    size,
    estimateSize: useCallback(() => 15, []),
    overscan: 20,
  })
  const items = rowVirtualizer.virtualItems

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
      <Text size={40}>
        {items.length} / {data.length}
      </Text>
      <Text size={18}>totalSize:{rowVirtualizer.totalSize} </Text>
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
