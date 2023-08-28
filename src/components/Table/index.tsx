import React, {
  FC,
  createElement,
  ReactNode,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import {
  styled,
  Style,
  Text,
  color,
  Badge,
  useCopyToClipboard,
  Toggle,
  IconCheckLarge,
  IconAttachment,
  Avatar,
} from '../..'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableHeader, SortOptions } from './types'
import { useInfiniteQuery } from './useInfiniteQuery'
import { prettyNumber } from '@based/pretty-number'
import { VariableSizeGrid as Grid } from 'react-window'

import { BasedQuery } from '@based/client'
import { getByPath } from '@saulx/utils'
import { TableHeaderTypes } from './TableHeaderTypes'

export * from './types'

const TYPE_WIDTHS = {
  file: 100,
  reference: 100,
  id: 140,
  references: 130,
  bytes: 130,
  boolean: 100,
}

const sortBasedBasedOnHeaderItem = (keyName, data) => {
  console.log(data.sort((a, b) => (a[keyName] > b[keyName] ? 1 : -1)))
}

export type TableProps<T extends any = any> = {
  headers?: TableHeader<T>[]
  query?: (start: number, limit: number) => BasedQuery
  getQueryItems?: (data: any) => any[]
  data?: T[]
  width?: number
  itemCount?: number
  height?: number
  context?: any
  queryId?: number | string
  rowCount?: number
  defaultSortOptions?: SortOptions
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  outline?: boolean
  onClick?: (e: MouseEvent, data: any) => void
  calcRowHeight?: (data: any, index: number) => number
  style?: Style
}

const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  // setSortOptions: Dispatch<SetStateAction<SortOptions>>
  // sortOptions: SortOptions
  outline: boolean
  // performance??
  data: any
  setSortKey: (k) => void
}> = ({ headers, width, headerWidth, outline, data, setSortKey }) => {
  const children: ReactNode[] = []
  let total = 16
  for (const header of headers) {
    const w = header.width ?? headerWidth
    children.push(
      <styled.div
        key={header.key}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          left: total,
          top: 0,
          height: 40,
          width: w,
        }}
      >
        {header.customLabelComponent ? (
          <header.customLabelComponent />
        ) : (
          <Text
            onClick={() => setSortKey(header.key)}
            weight="medium"
            style={{ color: color('content', 'default', 'secondary') }}
          >
            {header.label ?? header.key}
          </Text>
        )}
      </styled.div>
    )
    total += w
  }
  return (
    <styled.div
      style={{
        width,
        height: 40,
        position: 'relative',
      }}
    >
      {children}
    </styled.div>
  )
}

const Cell = (props) => {
  const { columnIndex, rowIndex, style, data } = props
  const header = data.headers[columnIndex]
  const colls = data.headers.length
  const rowData = data.data[rowIndex]
  if (!rowData) {
    return <div />
  }

  const key = header.key

  let itemData
  if (Array.isArray(key)) {
    for (const k of key) {
      itemData = getByPath(rowData, k.split('.'))
      if (itemData) {
        break
      }
    }
  } else {
    itemData = getByPath(rowData, header.key.split('.'))
  }

  const onClick = header.onClick ?? props.data.onClick
  const type = header.type

  // Array.isArray(itemData) && console.log('itemDATA??', itemData)

  // Make this into a map /  a bit nicer
  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
      columnIndex,
      rowIndex,
    })
  ) : type ? (
    <TableHeaderTypes
      type={type}
      rowData={rowData}
      itemData={itemData}
      key={key}
    />
  ) : (
    <Text weight="medium">
      {type === 'bytes'
        ? prettyNumber(itemData, 'number-bytes')
        : typeof itemData === 'object'
        ? 'isObj'
        : itemData}{' '}
    </Text>
  )

  return (
    <styled.div
      onMouseEnter={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                x.style.background = 'yellow'
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                x.style.background = 'orange'
                x = x.nextSibling
              }
            }
          : null
      }
      onMouseLeave={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.nextSibling
              }
            }
          : null
      }
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        cursor: onClick ? 'pointer' : 'default',
        borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
        boxSizing: 'border-box',
        ...style,
      }}
      onClick={
        onClick
          ? (e) => {
              onClick(e, rowData)
            }
          : null
      }
    >
      {body}
    </styled.div>
  )
}

const SizedGrid: FC<TableProps> = (props) => {
  const {
    query,
    getQueryItems,
    headers = [],
    data = [],
    defaultSortOptions,
    calcRowHeight,
    rowHeight = 60,
    width,
    queryId,
    itemCount = data.length,
    height = itemCount < 20 ? data.length * rowHeight + 60 : 200,
    columnCount = headers?.length ??
      (data && data.length && Object.keys(data[0]).length),
  } = props

  const headerWrapper = useRef(null)

  const [sortKey, setSortKey] = useState(null)
  const [renderCounter, setRenderCounter] = useState(1)

  let w = 0
  let defW = 0
  let nonAllocated = 0
  for (const h of headers) {
    if (h.width) {
      w += h.width
    } else {
      const typeWidth = TYPE_WIDTHS[h.type]

      if (typeWidth) {
        h.width = typeWidth
        w += h.width
      } else {
        nonAllocated++
      }
    }
  }

  const [sortOptions] = useState<SortOptions>(
    defaultSortOptions ?? {
      $field: 'createdAt',
      $order: 'desc',
    }
  )

  const rowH = useMemo(() => {
    if (calcRowHeight) {
      return (index: number) => calcRowHeight(data?.[index], index)
    }
    return () => rowHeight
  }, [calcRowHeight, rowHeight])

  const result = useInfiniteQuery({
    query,
    getQueryItems,
    rowHeight,
    queryId: queryId + sortOptions.$field + sortOptions.$order,
    sortOptions,
    itemCount,
    height: height - rowHeight,
  })

  let parsedData = query ? result.items : data

  useEffect(() => {
    if (sortKey) {
      parsedData = sortBasedBasedOnHeaderItem(sortKey, data)
      setRenderCounter(renderCounter + 1)
    }
  }, [sortKey])

  defW = Math.max(Math.floor((width - w) / nonAllocated), 100)

  const timer = useRef<ReturnType<typeof setTimeout>>()

  const [force, setForce] = useState(0)
  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setForce(0)
    }, 100)
    setForce(width)
    return () => {
      clearTimeout(timer.current)
    }
  }, [width])

  if (force !== 0) {
    return <div />
  }

  return (
    <>
      <styled.div
        style={{
          width: width,
          overflowX: 'hidden',
          borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
          //     backgroundColor: color('background', 'default', 'strong'),
          // borderTopRightRadius: props.outline ? 8 : 0,
          // borderTopLeftRadius: props.outline ? 8 : 0,
        }}
        ref={headerWrapper}
      >
        <Header
          // sortOptions={sortOptions}
          // setSortOptions={setSortOpts}
          width={width}
          headers={headers}
          headerWidth={defW}
          outline={props.outline}
          data={parsedData}
          setSortKey={setSortKey}
        />
      </styled.div>
      {/* TODO: wrap in styled and share froms scroll area */}
      {renderCounter && (
        <Grid
          className="go2015383901 go3565260572 go2201354693 go4127164290"
          onScroll={(e) => {
            result.onScrollY(e.scrollTop)
            headerWrapper.current.scrollLeft = e.scrollLeft
          }}
          columnCount={columnCount}
          columnWidth={(colIndex) => {
            return headers[colIndex].width ?? defW
          }}
          height={height - 40}
          rowCount={itemCount}
          rowHeight={rowH}
          width={width}
          itemData={{
            ...props,
            data: parsedData,
          }}
        >
          {Cell}
        </Grid>
      )}
    </>
  )
}

export const Table: FC<TableProps> = (props) => {
  const {
    data = [],
    width,
    itemCount = data.length,
    rowHeight = 60,
    height = itemCount < 20 ? data.length * rowHeight + 40 : 200,
  } = props

  console.log('🟪', data)

  return (
    <styled.div
      style={{
        backgroundColor: color('background', 'default', 'strong'),
        minHeight: height,
        height: '100%',
        width: '100%',
        minWidth: width,
        border: props.outline
          ? `1px solid ${color('border', 'default', 'strong')}`
          : 'none',
        borderBottom: 'none',
        // borderRadius: props.outline ? 8 : 0,
      }}
    >
      <AutoSizer>
        {({ width, height }) => {
          return <SizedGrid {...props} height={height} width={width} />
        }}
      </AutoSizer>
    </styled.div>
  )
}
