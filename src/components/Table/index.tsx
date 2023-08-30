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
  IconSort,
  Button,
  IconDelete,
  Checkbox,
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

const sortBasedBasedOnHeaderItem = (keyName, data, order) => {
  if (!order) {
    return data.sort((a, b) => (a[keyName] > b[keyName] ? -1 : 1))
  } else {
    return data.sort((a, b) => (a[keyName] > b[keyName] ? 1 : -1))
  }
}

export type TableProps<T extends any = any> = {
  calcRowHeight?: (data: any, index: number) => number
  columnCount?: number
  columnWidth?: number
  context?: any
  data?: T[]
  defaultSortOptions?: SortOptions
  getQueryItems?: (data: any) => any[]
  headers?: TableHeader<T>[]
  height?: number
  itemCount?: number
  onClick?: (e: MouseEvent, data: any) => void
  outline?: boolean
  query?: (start: number, limit: number) => BasedQuery
  queryId?: number | string
  rowCount?: number
  rowHeight?: number
  selectable?: boolean
  setSortKey: any
  sortKey: any
  style?: Style
  width?: number
  renderCounter?: any
  setRenderCounter?: any
}

const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  // setSortOptions: Dispatch<SetStateAction<SortOptions>>
  // sortOptions: SortOptions
  outline: boolean
  // performance??
  sortKey: any
  setSortKey: (k) => void
  clearAllRows: any
  selectAllRows: any
  selectedRows?: any
  data?: any
}> = ({
  headers,
  width,
  headerWidth,
  outline,
  sortKey,
  setSortKey,
  clearAllRows,
  selectAllRows,
  selectedRows,
  data,
}) => {
  const children: ReactNode[] = []
  let total = 16

  // console.log('headers--> ❇️', headers)

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
        ) : header.key === 'selected' ? (
          <Checkbox
            value={selectedRows.length === data.length}
            onClick={() => {
              if (selectedRows.length === data.length) {
                clearAllRows()
              } else {
                selectAllRows()
              }
            }}
          />
        ) : (
          <styled.div
            style={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => {
              if (sortKey.key !== header.key) {
                setSortKey({
                  key: header.key,
                  counter: sortKey.counter + 1,
                  ascOrder: true,
                })
              } else {
                setSortKey({
                  key: header.key,
                  counter: sortKey.counter + 1,
                  ascOrder: !sortKey.ascOrder,
                })
              }
            }}
          >
            {header.key === sortKey.key && (
              <IconSort color="brand" style={{ marginRight: 8 }} />
            )}
            <Text
              weight={header.key === sortKey.key ? 'strong' : 'medium'}
              style={{
                color:
                  header.key === sortKey.key
                    ? color('content', 'brand', 'primary')
                    : color('content', 'default', 'secondary'),
              }}
            >
              {header.label ?? header.key}
            </Text>
          </styled.div>
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
      renderCounter={data.renderCounter}
      setRenderCounter={data.setRenderCounter}
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
    setSortKey,
    sortKey,
    renderCounter,
    setRenderCounter,
    selectAllRows,
    clearAllRows,
    selectedRows,
  } = props

  const headerWrapper = useRef(null)

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
        }}
        ref={headerWrapper}
      >
        <Header
          // setSortOptions={setSortOpts}
          width={width}
          headers={headers}
          headerWidth={defW}
          outline={props.outline}
          sortKey={sortKey}
          setSortKey={setSortKey}
          selectAllRows={selectAllRows}
          clearAllRows={clearAllRows}
          selectedRows={selectedRows}
          data={data}
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
        height={height - 40}
        rowCount={itemCount}
        rowHeight={rowH}
        width={width}
        itemData={{
          ...props,
          data: parsedData,
        }}
        renderCounter={renderCounter}
        setRenderCounter={setRenderCounter}
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
    rowHeight = 60,
    height = itemCount < 20 ? data.length * rowHeight + 40 : 200,
    selectable,
  } = props

  const [sortKey, setSortKey] = useState({
    counter: 1,
    key: '',
    ascOrder: true,
  })

  let newData =
    sortKey.key && sortKey.counter
      ? sortBasedBasedOnHeaderItem(sortKey.key, data, sortKey.ascOrder)
      : props.data

  // console.log('✅', props)
  // console.log('💚', newData)

  // if selectable is true, the first columns of data should be checkboxes
  const [renderCounter, setRenderCounter] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])

  // check all object if meta selected is true
  const testRow = newData.filter((item, idx) => item?.meta?.selected)
  useEffect(() => {
    if (selectable) {
      setSelectedRows(testRow)
      // console.log(testRow, '🛤')
    }
  }, [renderCounter])

  if (
    selectable &&
    props.headers &&
    !Object.values(props.headers[0]).includes('selected')
  ) {
    props?.headers?.unshift({
      key: 'selected',
      label: 'checkie?',
      type: 'checkbox',
      width: 42,
    })
    newData.map((item, idx) => (item.meta = { selected: false }))
  }

  const selectAllRows = () => {
    newData.map((item) => (item.meta.selected = true))
    setRenderCounter(renderCounter + 1)
  }

  const clearAllRows = () => {
    newData.map((item) => (item.meta.selected = false))
    setRenderCounter(renderCounter + 1)
  }

  return (
    <>
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
        {selectedRows.length > 0 && (
          <styled.div
            style={{
              maxHeight: 64,
              backgroundColor: color('background', 'default', 'strong'),
              borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
              padding: '12px 16px',
            }}
          >
            <styled.div
              style={{
                border: `1px solid ${color('border', 'default', 'strong')}`,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                width: 'fit-content',
              }}
            >
              <Text weight="strong" color="brand">
                {selectedRows.length + ' Selected'}
              </Text>
              <Button
                size="xsmall"
                ghost
                style={{ marginLeft: 18 }}
                onClick={() => {
                  clearAllRows()
                }}
              >
                Clear Selection
              </Button>
              <Button
                size="xsmall"
                ghost
                color="alert"
                icon={<IconDelete />}
                style={{ marginLeft: 18 }}
              >
                Delete
              </Button>
            </styled.div>
          </styled.div>
        )}
        <AutoSizer>
          {({ width, height }) => {
            return (
              <SizedGrid
                {...props}
                data={newData}
                height={height}
                width={width}
                sortKey={sortKey}
                setSortKey={setSortKey}
                renderCounter={renderCounter}
                setRenderCounter={setRenderCounter}
                selectAllRows={selectAllRows}
                clearAllRows={clearAllRows}
                selectedRows={selectedRows}
              />
            )
          }}
        </AutoSizer>
      </styled.div>
    </>
  )
}
