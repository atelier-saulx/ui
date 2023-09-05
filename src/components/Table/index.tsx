import React, { FC, useState, useEffect } from 'react'
import { styled, Style, color, useOverlay, Button, IconPlus } from '../..'
import { HeaderOverlay } from './HeaderOverlay'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps } from './types'
import { SizedGrid } from './SizedGrid'
import { SelectedRowOptions } from './SelectedRowOptions'

const sortBasedBasedOnHeaderItem = (keyName, data, order) => {
  if (!order) {
    return data.sort((a, b) => (a[keyName] > b[keyName] ? -1 : 1))
  } else {
    return data.sort((a, b) => (a[keyName] > b[keyName] ? 1 : -1))
  }
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

  const [renderCounter, setRenderCounter] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])
  const [headers, setHeaders] = useState(props.headers)
  const [sortKey, setSortKey] = useState({
    counter: 1,
    key: '',
    ascOrder: true,
  })

  let newData =
    sortKey.key && sortKey.counter
      ? sortBasedBasedOnHeaderItem(sortKey.key, data, sortKey.ascOrder)
      : props.data

  const selectedItems = newData?.filter((item, idx) => item?.meta?.selected)

  if (
    selectable &&
    props.headers &&
    !Object.values(props.headers[0]).includes('selected')
  ) {
    props?.headers?.unshift({
      key: 'selected',
      label: '',
      type: 'checkbox',
      width: 42,
    })
    newData.map(
      (item, idx) => (item.meta = { selected: false, selectedIndex: null })
    )
  }

  // headers selecting and ordering
  if (headers) {
    for (const header of headers) {
      if (!header?.meta?.hasOwnProperty('visible')) {
        header.meta = { visible: true }
      }
    }
  }

  const [filteredHeaders, setFilteredHeaders] = useState(
    headers?.filter((item) => item?.meta?.visible)
  )

  const selectAllRows = () => {
    newData.map((item) => (item.meta.selected = true))
    setRenderCounter(renderCounter + 1)
  }

  const clearAllRows = () => {
    newData.map((item) => (item.meta.selected = false))
    setRenderCounter(renderCounter + 1)
  }

  const openHeaderOverlay = useOverlay(
    HeaderOverlay,
    { headers, setFilteredHeaders, setHeaders },
    { width: '100%', position: 'bottom' },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto', border: 'none', boxShadow: 'none' } }
  )

  useEffect(() => {
    setRenderCounter(renderCounter + 1)
  }, [filteredHeaders])

  useEffect(() => {
    if (selectable) {
      setSelectedRows(selectedItems)
    }
  }, [renderCounter])

  return (
    <>
      <styled.div
        style={{
          backgroundColor: color('background', 'default', 'strong'),
          minHeight: height,
          height: '100%',
          width: '100%',
          position: 'relative',
          minWidth: width,
          border: props.outline
            ? `1px solid ${color('border', 'default', 'strong')}`
            : 'none',
          borderBottom: 'none',
        }}
      >
        <Button
          icon={<IconPlus />}
          size="small"
          color="neutral"
          ghost
          style={{
            position: 'absolute',
            right: 12,
            top: selectedRows?.length > 0 ? 74 : 6,
            padding: 3,
            zIndex: 1,
          }}
          // @ts-ignore
          onClick={openHeaderOverlay}
        />
        {selectedRows?.length > 0 && (
          <SelectedRowOptions
            clearAllRows={clearAllRows}
            selectedRowsLength={selectedRows?.length}
          />
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
                headers={filteredHeaders}
              />
            )
          }}
        </AutoSizer>
      </styled.div>
    </>
  )
}
