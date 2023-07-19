import React, {
  FC,
  createElement,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import {
  styled,
  border,
  Text,
  color,
  Badge,
  AttachmentIcon,
  ThumbnailFile,
  pathReader,
} from '~'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps, TableHeader, SortOptions } from './types'
import { useInfiniteQuery } from './useInfiniteQuery'
import { prettyNumber } from '@based/pretty-number'
import { VariableSizeGrid as Grid } from 'react-window'
import { prettyDate } from '@based/pretty-date'

export * from './types'

const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  setSortOptions: Dispatch<SetStateAction<SortOptions>>
  sortOptions: SortOptions
  outline: boolean
}> = ({ headers, width, headerWidth, outline }) => {
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
          height: 46,
          width: w,
        }}
      >
        {header.customLabelComponent ? (
          <header.customLabelComponent />
        ) : (
          <Text typography="body600" color={outline ? 'text2' : 'text'}>
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
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        height: 46,
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
      itemData = pathReader(rowData, k.split('.'))
      if (itemData) {
        break
      }
    }
  } else {
    itemData = pathReader(rowData, header.key.split('.'))
  }

  const onClick = header.onClick ?? props.data.onClick
  const type = header.type

  // Make this into a map /  a bit nicer
  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
      columnIndex,
      rowIndex,
    })
  ) : type === 'file' || type == 'reference' ? (
    <ThumbnailFile
      mimeType={
        header?.mimeType ?? header.mimeTypeKey
          ? pathReader(rowData, header.mimeTypeKey.split('.'))
          : undefined
      }
      src={itemData}
    />
  ) : type === 'id' ? (
    <Badge color="accent">{itemData}</Badge>
  ) : type === 'timestamp' ? (
    <Text selectable typography="body400">
      {prettyDate(itemData, 'date-time-human')}{' '}
    </Text>
  ) : type === 'references' ? (
    <Badge color="accent" icon={<AttachmentIcon />}>
      <Text typography="caption600" color="accent">
        {prettyNumber(itemData?.length || 0, 'number-short')}
      </Text>
    </Badge>
  ) : (
    <Text selectable typography={type === 'bytes' ? 'caption500' : 'body500'}>
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
                x.style.background = color('accent', true)
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                x.style.background = color('accent', true)
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
        padding: 16,
        borderBottom: border(1, 'border'),
        cursor: onClick ? 'pointer' : 'default',
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

const typeWidths = {
  file: 100,
  reference: 100,
  id: 130,
  references: 130,
  bytes: 130,
}

const SizedGrid: FC<TableProps> = (props) => {
  const {
    query,
    getQueryItems,
    headers = [],
    data = [],
    defaultSortOptions,
    calcRowHeight,
    rowHeight = 56,
    width,
    queryId,
    itemCount = data.length,
    height = itemCount < 20 ? data.length * rowHeight + rowHeight : 400,
    columnCount = headers?.length ??
      (data && data.length && Object.keys(data[0]).length),
  } = props

  const headerWrapper = useRef(null)

  let w = 0
  let defW = 0
  let nonAllocated = 0
  for (const h of headers) {
    if (h.width) {
      w += h.width
    } else {
      const typeWidth = typeWidths[h.type]

      if (typeWidth) {
        h.width = typeWidth
        w += h.width
      } else {
        nonAllocated++
      }
    }
  }

  const [sortOptions, setSortOpts] = useState<SortOptions>(
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

  const parsedData = query ? result.items : data

  defW = Math.max(Math.floor((width - w - 8) / nonAllocated), 100)

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
          borderBottom: border(1, 'border'),
          backgroundColor: props.outline ? color('background2') : '',
          borderTopRightRadius: props.outline ? 8 : 0,
          borderTopLeftRadius: props.outline ? 8 : 0,
        }}
        ref={headerWrapper}
      >
        <Header
          sortOptions={sortOptions}
          setSortOptions={setSortOpts}
          width={width}
          headers={headers}
          headerWidth={defW}
          outline={props.outline}
        />
      </styled.div>
      {/* TODO: wrap in styled and share froms scroll area */}
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
        height={height - 56}
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
    </>
  )
}

export const Table: FC<TableProps> = (props) => {
  const {
    data = [],
    width,
    itemCount = data.length,
    rowHeight = 56,
    height = itemCount < 20 ? data.length * rowHeight + rowHeight : 400,
  } = props

  return (
    <styled.div
      style={{
        minHeight: height,
        height: '100%',
        width: '100%',
        maxWidth: width,
        border: props.outline ? border(1, 'border') : 'none',
        borderRadius: props.outline ? 8 : 0,
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
