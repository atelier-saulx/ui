import React, { FC, useRef, useState, useEffect, useMemo } from 'react'
import { TableProps, SortOptions } from '.'
import { styled, color } from '../..'
import { VariableSizeGrid as Grid } from 'react-window'
import { useInfiniteQuery } from './useInfiniteQuery'
import { Header } from './Header'
import { Cell } from './Cell'

const TYPE_WIDTHS = {
  file: 100,
  reference: 100,
  id: 140,
  references: 130,
  bytes: 130,
  boolean: 100,
}

export const SizedGrid: FC<TableProps> = (props) => {
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
    filteredHeaders,
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
          filteredHeaders={filteredHeaders}
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
