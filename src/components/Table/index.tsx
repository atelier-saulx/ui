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
      type: 'CheckboxSelectItem',
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

  console.log('newdata --->', newData)

  // on Shift Click you want the rowIndex and use that as a guide
  const [shiftKeyIsDown, setShiftKeyIsDown] = useState(false)
  const [shiftKeyIndex, setShiftKeyIndex] = useState()
  const [lastShifKeyIndex, setLastShiftKeyIndex] = useState()

  const ShiftKeySelectionRows = (firstIndex, lastIndex) => {
    let smallerIndex = firstIndex > lastIndex ? lastIndex : firstIndex
    let largerIndex = firstIndex < lastIndex ? lastIndex : firstIndex

    // set selected row indexes renew??
    newData.map(
      (item, idx) =>
        (item.meta = { selectedIndex: idx, selected: item.meta.selected })
    )

    console.log('smaller -->', smallerIndex, 'bigger --> ', largerIndex)
    newData
      .filter(
        (item) =>
          item.meta.selectedIndex >= smallerIndex &&
          item.meta.selectedIndex <= largerIndex
      )
      .map((item) => (item.meta.selected = true))

    // count the selected items ??
    setSelectedRows(newData?.filter((item, idx) => item?.meta?.selected))
  }

  useEffect(() => {
    console.log('add listener')
    window.addEventListener('keydown', (e) =>
      e.key === 'Shift' ? setShiftKeyIsDown(true) : null
    )
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        setShiftKeyIsDown(false)
        setShiftKeyIndex(undefined)
        setLastShiftKeyIndex(undefined)
      } else {
        return null
      }
    })
  }, [])

  useEffect(() => {
    if (lastShifKeyIndex) {
      ShiftKeySelectionRows(shiftKeyIndex, lastShifKeyIndex)
    }
  }, [lastShifKeyIndex])

  return (
    <>
      {'is shift key down: ' + shiftKeyIsDown}
      <br />
      {'shiftkey index' + shiftKeyIndex}
      <br />
      {'last shiftkey index' + lastShifKeyIndex}
      <br />
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
          userSelect: shiftKeyIsDown ? 'none' : 'default',
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
                shiftKeyIsDown={shiftKeyIsDown}
                setShiftKeyIndex={setShiftKeyIndex}
                shiftKeyIndex={shiftKeyIndex}
                setLastShiftKeyIndex={setLastShiftKeyIndex}
              />
            )
          }}
        </AutoSizer>
      </styled.div>
    </>
  )
}
