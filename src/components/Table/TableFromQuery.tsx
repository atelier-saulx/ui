// @ts-nocheck
import React, { useRef, useState, useEffect, FC } from 'react'
import { color } from '~/utils'
import { scrollAreaStyle } from '../ScrollArea'
import { useInfiniteScroll } from '../InfiniteList'
import { ITEM_HEIGHT, ACTIONS_WIDTH, ITEM_WIDTH } from './constants'
import { useRoute } from 'kabouter'
import { useSchema } from '~/hooks/useSchema'
import { DataEventHandler } from '~/types'
import { OnAction } from './types'
import { useDialog } from '~/components/Dialog'
import { Toast, useToast } from '../Toast'
import { useClient } from '@based/react'
import { Header } from './Header'
import { InnerTable } from './InnerTable'
import { SelectedOptionsSubMenu } from './SelectedOptionsSubMenu'
import { systemFields } from '../Schema/templates'

export type TableFromQueryProps = {
  fields: string[]
  query: { [key]: any }
  width: number
  height: number
  target?: string
  language?: string
  onClick: DataEventHandler
  onAction?: OnAction
  setSelectedRowCheckboxes?: (selectedRowCheckboxes: any) => void
  selectedRowCheckboxes?: Array<number>
  setTableIsEmpty?: (tableIsEmpty: boolean) => void
  isMultiref?: boolean
}

export const TableFromQuery: FC<TableFromQueryProps> = ({
  query,
  fields,
  width,
  height,
  target = 'root',
  language = 'en',
  onClick,
  setTableIsEmpty,
  onAction,
  setSelectedRowCheckboxes,
  selectedRowCheckboxes,
  isMultiref,
}) => {
  const colWidth = ITEM_WIDTH
  const { schema } = useSchema()
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'updatedAt',
    'desc',
  ])
  const [activeSortField, setActiveSortField] = useState<string>('updatedAt')
  const [, setRelevantFields] = useState(fields)
  const [location, setLocation] = useLocation()

  const [prevStateSelectedRowCheckboxes, setPrevStateSelectedRowCheckboxes] =
    useState(selectedRowCheckboxes)

  const [shownItems, setShownItems] = useState([])

  const systemFieldsArr = Array.from(systemFields)

  // for file drop upload
  const client = useClient()
  const [draggingOver, setDraggingOver] = useState(false)
  const toast = useToast()

  // before you delete modal to confirm
  const { confirm } = useDialog()

  // lijst determines order and wich fields are shown
  const [lijst, setLijst] = useState<{ label: string; checkbox: boolean }[]>([])

  const getLijstFromQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const checked = urlParams.get('checked')

    // als er params zijn
    if (checked) {
      const checkedItems = JSON.parse(decodeURIComponent(checked))

      // sort so it matches the parameters order
      fields.sort((a, b) => checkedItems.indexOf(a) - checkedItems.indexOf(b))

      const checkedArrObj = []

      for (const field of fields) {
        if (checkedItems.includes(field)) {
          checkedArrObj.push({
            label: field,
            checkbox: true,
          })
        }
      }

      const unCheckedArrObj = []

      for (const field of fields) {
        if (!checkedItems.includes(field)) {
          unCheckedArrObj.push({
            label: field,
            checkbox: false,
          })
        }
      }

      return checkedArrObj.concat(unCheckedArrObj)
    } else {
      // dont return to much by default
      let sillyCounter = 0
      return fields
        .map((field) => {
          if (!systemFieldsArr.includes(field)) {
            sillyCounter++
          }
          return {
            label: field,
            checkbox: sillyCounter < 6 && !systemFieldsArr.includes(field),
          }
        })
        .reverse()
    }
  }

  useEffect(() => {
    setLijst(getLijstFromQueryParams())
  }, [])

  useEffect(() => {
    setLocation(
      `?checked=${encodeURIComponent(
        JSON.stringify(
          lijst.filter((item) => item?.checkbox).map((item) => item.label)
        )
      )}`
    )
  }, [lijst])

  useEffect(() => {
    return () => {
      history.replaceState(
        null,
        '',
        '?' +
          window.location.search
            .split('&')
            .filter(
              (str) =>
                !str.startsWith('?checked=') && !str.startsWith('checked=')
            )
            .join('&')
      )
    }
  }, [])

  const locationIsFile = location.split('/').pop() === 'file'

  const tableRef = useRef()
  const { itemCount, items, onScrollY, loading } = useInfiniteScroll({
    query: (offset, limit) => query(offset, limit, sortField, sortOrder),
    height,
    target,
    language,
    itemSize: ITEM_HEIGHT,
  })

  const [colWidths, setColWidths] = useState([])

  useEffect(() => {
    if (itemCount < 1) {
      setTableIsEmpty(true)
    } else {
      setTableIsEmpty(false)
    }
  }, [itemCount])

  useEffect(() => {
    if (tableRef.current) {
      const prevColWidths = tableRef.current.colWidths || []
      const columnIndex = Math.max(
        0,
        colWidths.findIndex((val, index) => {
          return val !== prevColWidths[index]
        })
      )

      tableRef.current.resetAfterIndices({
        columnIndex,
      })

      tableRef.current.colWidths = colWidths
    }
  }, [colWidths])

  if (loading) {
    return null
  }

  const types = {
    root: schema.types.root,
    ...schema.types,
  }

  const columnCount = fields.length + 1 // one extra for actions
  const columnWidth = (index) => {
    if (index === 0) {
      return ACTIONS_WIDTH
    }
    index = index - 1
    if (colWidths[index] !== undefined) {
      return colWidths[index]
    }
    const field = fields[index]
    if (field === 'id') {
      return 116
    }
    return colWidth
  }

  const DeleteItems = async (items) => {
    const ok = await confirm(`Are you sure you want to delete this item?`)
    if (ok) {
      const newItemArr = []
      for (let i = 0; i < items.length; i++) {
        if (selectedRowCheckboxes.includes(i)) {
          newItemArr.push(items[i])
        }
      }
      onAction(newItemArr, 'delete')
      setSelectedRowCheckboxes([])

      setShownItems([])
    }
  }

  const ShowSelectedItemsOnly = () => {
    // selectedRowCheckboxes.forEach((rowIdx) => {
    //   shownItems.push(rowIdx)
    // })

    setPrevStateSelectedRowCheckboxes([...selectedRowCheckboxes])

    // console.log('TEMP obj', shownItems)

    const showTheseIndexes = []
    selectedRowCheckboxes.forEach((rowIdx) => {
      showTheseIndexes.push(items[rowIdx])
    })

    setShownItems(showTheseIndexes)

    const newSelectedRowsIndexes = []
    for (let i = 0; i < showTheseIndexes.length; i++) {
      newSelectedRowsIndexes.push(i)
    }
    // setSelectedRowCheckboxes([])
    setSelectedRowCheckboxes([...newSelectedRowsIndexes])
  }

  const ShowAllItemsAgain = () => {
    setSelectedRowCheckboxes(prevStateSelectedRowCheckboxes)
    setShownItems([])
  }

  // file drop
  const HandleFileDrop = async (e) => {
    if (locationIsFile && draggingOver) {
      setDraggingOver(false)
      e.preventDefault()
      e.stopPropagation()

      const files = Array.from(e.dataTransfer.files)

      await Promise.all(
        files?.map((file) => {
          // make a toast pop for each file
          // TODO check if successfull upload i guess
          const notify = () => {
            toast.add(
              <Toast
                label="File uploaded"
                type="success"
                description={file.name}
              />
            )
          }
          notify()
          return client.file(file)
        })
      )
    } else {
      return null
    }
  }

  // console.log('--> times ', items)
  // console.log('--> fields', fields)

  return (
    <>
      <div
        style={{ minHeight: 200 }}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDraggingOver(true)
        }}
        onDrop={HandleFileDrop}
        onDragLeave={() => {
          setDraggingOver(false)
        }}
      >
        {selectedRowCheckboxes.length > 0 && (
          <SelectedOptionsSubMenu
            selectedRowCheckboxes={selectedRowCheckboxes}
            setSelectedRowCheckboxes={setSelectedRowCheckboxes}
            items={shownItems.length > 0 ? shownItems : items}
            deleteItems={DeleteItems}
            showSelectedItemsOnly={ShowSelectedItemsOnly}
            showAllItemsAgain={ShowAllItemsAgain}
            setShownItems={setShownItems}
            shownItems={shownItems}
          />
        )}
        <InnerTable
          tableRef={tableRef}
          style={{
            background:
              locationIsFile && draggingOver
                ? color('lightaccent')
                : color('background'),
            border:
              locationIsFile && draggingOver
                ? `1px dashed ${color('accent')}`
                : locationIsFile
                ? `1px dashed ${color('border')}`
                : 'none',
            scrollAreaStyle,
            minHeight: 200,
          }}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height}
          types={types}
          items={shownItems.length > 0 ? shownItems : items}
          fields={lijst}
          onClick={onClick}
          setRelevantFields={setRelevantFields}
          selectedRowCheckboxes={selectedRowCheckboxes}
          setSelectedRowCheckboxes={setSelectedRowCheckboxes}
          isMultiref={isMultiref}
          itemKey={({ columnIndex, data: { items }, rowIndex }) =>
            `${items[rowIndex]?.id || rowIndex}-${fields[columnIndex]}`
          }
          innerElementType={({ children, style }) => {
            return (
              <div
                style={{
                  ...style,
                  width: style.width + ACTIONS_WIDTH,
                }}
              >
                <div>{children}</div>
                <Header
                  width={width}
                  colWidths={colWidths}
                  columnWidth={columnWidth}
                  setColWidths={setColWidths}
                  lijst={lijst}
                  setLijst={setLijst}
                  setSort={setSort}
                  sortOrder={sortOrder}
                  activeSortField={activeSortField}
                  setActiveSortField={setActiveSortField}
                  scrollLeft={tableRef.current?.state?.scrollLeft}
                  setSelectedRowCheckboxes={setSelectedRowCheckboxes}
                  selectedRowCheckboxes={selectedRowCheckboxes}
                  items={shownItems.length > 0 ? shownItems : items}
                />
              </div>
            )
          }}
          rowCount={itemCount}
          estimatedColumnWidth={colWidth}
          estimatedRowHeight={ITEM_HEIGHT}
          rowHeight={() => ITEM_HEIGHT}
          width={width}
          onScroll={({ scrollTop }) => {
            onScrollY(scrollTop)
          }}
        />
      </div>
    </>
  )
}
