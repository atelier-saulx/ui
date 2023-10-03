import React, { FC, useState, useEffect } from 'react'
import { color } from '../../varsUtilities'
import { HeaderOverlay } from './HeaderOverlay'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps } from './types'
import { SizedGrid } from './SizedGrid'
import { styled, Style } from 'inlines'
import { SelectedRowOptions } from './SelectedRowOptions'
import { Button, Popover } from '../../components'
import { IconPlus } from '../../icons'

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

  useEffect(() => {
    setRenderCounter(renderCounter + 1)
  }, [filteredHeaders])

  useEffect(() => {
    if (selectable) {
      setSelectedRows(selectedItems)
    }
  }, [renderCounter])

  // console.log('newdata --->', newData)

  // ShiftClick to multiSelect Logic here
  const [shiftKeyIsDown, setShiftKeyIsDown] = useState<boolean>(false)
  const [shiftKeyIndex, setShiftKeyIndex] = useState<number | undefined>(
    undefined
  )
  const [lastShifKeyIndex, setLastShiftKeyIndex] = useState<number | undefined>(
    undefined
  )

  const ShiftKeySelectionRows = (firstIndex, lastIndex) => {
    let smallerIndex = firstIndex > lastIndex ? lastIndex : firstIndex
    let largerIndex = firstIndex < lastIndex ? lastIndex : firstIndex

    // set selected row indexes anew
    newData.map(
      (item, idx) =>
        (item.meta = { selectedIndex: idx, selected: item.meta.selected })
    )

    console.log('smaller -->', smallerIndex, 'bigger --> ', largerIndex)

    // check if they are allready selected , if thats the case they should unselect
    if (
      !newData[firstIndex].meta.selected &&
      !newData[lastIndex].meta.selected
    ) {
      const areAllInBetweenSelected = newData
        .filter(
          (item) =>
            item.meta.selectedIndex > smallerIndex &&
            item.meta.selectedIndex < largerIndex
        )
        .every((item) => item.meta.selected)

      if (areAllInBetweenSelected) {
        newData
          .filter(
            (item) =>
              item.meta.selectedIndex > smallerIndex &&
              item.meta.selectedIndex < largerIndex
          )
          .map((item) => (item.meta.selected = false))
      }

      // console.log('🦈🦀', areAllInBetweenSelected)
    } else {
      newData
        .filter(
          (item) =>
            item.meta.selectedIndex >= smallerIndex &&
            item.meta.selectedIndex <= largerIndex
        )
        .map((item) => (item.meta.selected = true))
    }
    // count selected row items
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
    if (typeof lastShifKeyIndex === 'number') {
      ShiftKeySelectionRows(shiftKeyIndex, lastShifKeyIndex)
    }
  }, [lastShifKeyIndex])

  return (
    <>
      {/* {'is shift key down: ' + shiftKeyIsDown}
      <br />
      {'shiftkey index' + shiftKeyIndex}
      <br />
      {'last shiftkey index' + lastShifKeyIndex}
      <br /> */}
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
        <Popover.Root>
          <Popover.Trigger>
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
              // onClick={openHeaderOverlay}
            />
          </Popover.Trigger>
          {selectedRows?.length > 0 && (
            <SelectedRowOptions
              clearAllRows={clearAllRows}
              selectedRowsLength={selectedRows?.length}
            />
          )}
          <Popover.Content
            style={{
              // border: '0px',
              padding: 0,
            }}
          >
            <HeaderOverlay
              headers={headers}
              setFilteredHeaders={setFilteredHeaders}
              setHeaders={setHeaders}
            />
          </Popover.Content>
        </Popover.Root>
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
