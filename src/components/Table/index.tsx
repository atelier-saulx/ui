import React, { FC, useState, useEffect } from 'react'
import { styled, Style, color, useOverlay, Button, IconPlus } from '../..'
import { HeaderOverlay } from './HeaderOverlay'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableHeader, SortOptions } from './types'
import { BasedQuery } from '@based/client'
import { SizedGrid } from './SizedGrid'
import { SelectedRowOptions } from './SelectedRowOptions'

export * from './types'

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
  setSortKey?: any
  sortKey?: any
  style?: Style
  width?: number
  renderCounter?: any
  setRenderCounter?: any
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

  // console.log('Table props --> ', props)

  const [sortKey, setSortKey] = useState({
    counter: 1,
    key: '',
    ascOrder: true,
  })

  let newData =
    sortKey.key && sortKey.counter
      ? sortBasedBasedOnHeaderItem(sortKey.key, data, sortKey.ascOrder)
      : props.data

  console.log('NewDATA --->', newData)
  // console.log('props header-->', props?.headers)

  // if selectable is true, the first columns of data should be checkboxes
  const [renderCounter, setRenderCounter] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])

  const [headers, setHeaders] = useState(props.headers)

  // check all object if meta selected is true

  const mappedAndFiltered = newData?.filter((item, idx) => item?.meta?.selected)

  useEffect(() => {
    if (selectable) {
      setSelectedRows(mappedAndFiltered)
      console.log('--> 🚨??', mappedAndFiltered)
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
    newData.map(
      (item, idx) => (item.meta = { selected: false, selectedIndex: null })
    )
  }

  const selectAllRows = () => {
    newData.map((item) => (item.meta.selected = true))
    setRenderCounter(renderCounter + 1)
  }

  const clearAllRows = () => {
    newData.map((item) => (item.meta.selected = false))
    setRenderCounter(renderCounter + 1)
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
    headers?.filter((item) => item.meta.visible)
  )

  const openHeaderOverlay = useOverlay(
    HeaderOverlay,
    { headers, setFilteredHeaders, setHeaders },
    { width: '100%', position: 'bottom' },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto', border: 'none', boxShadow: 'none' } }
  )

  useEffect(() => {
    //  console.log('Filtered HEADERS CHANGED?🐦?')
    setRenderCounter(renderCounter + 1)
  }, [filteredHeaders])

  // console.log('✅', props)
  // console.log('💚', newData)
  // console.log('filtered headers??? ', filteredHeaders)
  const [shiftKeyIsDown, setShiftKeyIsDown] = useState(false)

  useEffect(() => {
    console.log('🐄 cow')
    window.addEventListener('keydown', (e) => shiftKeyDown(e))
    window.addEventListener('keyup', (e) => shiftKeyUp(e))
  }, [])

  const shiftKeyDown = (e) => {
    if (e.key === 'Shift') {
      console.log('shift is down 🚁', e)
      setShiftKeyIsDown(true)
    }
  }

  const shiftKeyUp = (e) => {
    if (e.key === 'Shift') {
      console.log('shift is released', e)
      setShiftKeyIsDown(false)
    }
  }

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
                shiftKeyIsDown={shiftKeyIsDown}
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
