import React, { CSSProperties, FC, useState, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import { Style, styled } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { SortOptions, useInfiniteQuery } from './useInfiniteQuery'
import { BasedQuery } from '@based/client'
import { RenderAs } from './RenderAs'
import { Input } from '../Input'
import { Dropdown, Pill } from '..'
import { Button } from '..'
import {
  IconEye,
  IconSortDesc,
  IconSortAsc,
  IconDelete,
  IconFilter,
} from '../../icons'
import { Row } from '..'
import { Modal } from '..'

type QueryTableProps = {
  data?: any
  width?: number
  height?: number
  queryId?: number | string
  query?: (
    start: number,
    limit: number,
    sortOptions?: SortOptions,
    filter?: {}
  ) => BasedQuery
  getQueryItems?: (data: any) => any[]
  filter?: {
    $field?: string
    $operator?: string
    $value?: string | number | boolean
  }
  onRowClick?: (v, rIdx) => void
  onCellClick?: (v, rIdx, cIdx) => void
  onDelete?: () => void
  style?: CSSProperties | Style
}

export const QueryTable: FC<QueryTableProps> = ({
  data,
  width = 300,
  height = 300,
  queryId,
  query,
  getQueryItems,
  filter,
  onRowClick,
  onCellClick,
  onDelete,
  style,
}) => {
  const [hiddenColumns, setFilteredColumns] = useState([])
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    $field: 'updatedAt',
    $order: 'desc',
  })
  // const [customFilter, setCustomFilter] = useState(filter)
  const [selectedRowIndexes, setSelectedRowIndexes] = useState([])

  let w = width
  let h = height

  let COLUMN_WIDTH = 124
  let ROW_HEIGHT = 60

  const result = useInfiniteQuery({
    query,
    getQueryItems,
    rowHeight: 60,
    queryId: queryId + sortOptions.$field + sortOptions.$order,
    sortOptions: sortOptions,
    itemCount: data?.length,
    height: h,
    filter: filter,
  })

  const parsedData = query ? result.items : data

  const columnNames = [...new Set(parsedData?.flatMap(Object.keys))] as string[]
  const hiddenColumnNames = columnNames.filter(
    (item) => !hiddenColumns.includes(item.toLowerCase())
  )

  // console.log(result, 'Result>?')
  // console.log(parsedData, 'ParsedDAta?')

  const tableHeaderRef = useRef<HTMLDivElement>()

  const Cell = ({ columnIndex, rowIndex, style }) => {
    return (
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          ...style,
        }}
        onClick={() => {
          onRowClick(parsedData[rowIndex], rowIndex)
          onCellClick(
            parsedData[rowIndex][hiddenColumnNames[columnIndex]],
            rowIndex,
            columnIndex
          )
        }}
      >
        {columnIndex === 0 && (
          <styled.div
            style={{
              marginRight: '8px',
              marginLeft: '3px',
              '& div': { width: '24px' },
            }}
          >
            <Input
              type="checkbox"
              style={{ maxWidth: 24 }}
              value={selectedRowIndexes.includes(rowIndex)}
              onChange={() => {
                console.log('selected rowindex', rowIndex)
                if (!selectedRowIndexes.includes(rowIndex)) {
                  setSelectedRowIndexes([...selectedRowIndexes, rowIndex])
                } else {
                  let tempArr = selectedRowIndexes.filter(
                    (item) => item !== rowIndex
                  )
                  setSelectedRowIndexes([...tempArr])
                }
              }}
            />
          </styled.div>
        )}
        {/* render cell based on column name type renderAs */}
        <RenderAs
          input={parsedData[rowIndex][hiddenColumnNames[columnIndex]]}
          colName={hiddenColumnNames[columnIndex]}
        />
      </styled.div>
    )
  }

  const scrollbarColor = color('border', 'default', 'strong')
  const transparentAreaColor = color('background', 'default', 'surface')
  const borderColor = color('inputBorder', 'neutralNormal', 'default')

  return (
    <styled.div
      style={{
        width: w,
        height: h,
        '& .grid-class': {
          scrollbarGutter: 'stable',
          // overflowY: 'overlay',
          // overflowX: 'overlay',
          overflow: 'scroll !important',
          // firefox
          scrollbarColor: `${scrollbarColor} transparent`,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            visibility: 'hidden',
          },
          // the rest
          '&::-webkit-scrollbar:vertical': {
            width: '8px',
          },
          '&::-webkit-scrollbar:horizontal': {
            height: '8px',
          },
          '@media (hover: hover)': {
            '&:hover': {
              // the rest
              '&::-webkit-scrollbar': {
                visibility: 'visible',
              },

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: scrollbarColor,
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:vertical': {
                borderRight: `2px solid ${transparentAreaColor}`,
                minHeight: '32px',
              },
              '&::-webkit-scrollbar-thumb:horizontal': {
                borderBottom: `2px solid ${transparentAreaColor}`,
                minWidth: '32px',
              },
            },
          },
        },
      }}
    >
      {/* selected rows options */}

      {selectedRowIndexes.length > 0 && (
        <Row style={{ marginBottom: 12 }}>
          <Row
            style={{
              gap: 12,
              padding: '6px 12px',
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              boxShadow: `0px 1px 4px 0px rgba(27, 36, 44, 0.04)`,
            }}
          >
            <Text weight="strong" color="brand">
              {selectedRowIndexes.length} selected rows
            </Text>
            <Button size="xsmall" onClick={() => setSelectedRowIndexes([])}>
              Clear selection
            </Button>
            <Button
              size="xsmall"
              color="alert"
              icon={<IconDelete />}
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          </Row>
        </Row>
      )}
      {/* filter and show button */}
      <Row style={{ marginBottom: 12 }}>
        <styled.div
          style={{
            height: '32px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 4,
            border: `1px solid ${borderColor}`,
            marginRight: 8,
          }}
        >
          <Text light size={14}>
            {filter?.$field} {filter?.$operator} {filter?.$value}
          </Text>
        </styled.div>
        <Modal.Root>
          <Modal.Trigger>
            <Button color="primary" size="xsmall" icon={<IconFilter />}>
              Add Filter
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            {({ close }) => {
              return (
                <>
                  <Modal.Title>Define your filter.</Modal.Title>
                  <Modal.Body>
                    <Input
                      label={'$and or $or?'}
                      value={'$and'}
                      type="select"
                      options={[
                        { value: '$and', label: 'AND' },
                        { value: '$or', label: 'OR' },
                      ]}
                    />
                    <Input
                      label="$field"
                      value=""
                      type="select"
                      options={[
                        { value: '$and', label: 'AND' },
                        { value: '$or', label: 'OR' },
                      ]}
                    />
                    <Input
                      label="$operator"
                      value="="
                      type="select"
                      options={[
                        { value: '=' },
                        { value: '!=' },
                        { value: '<' },
                        { value: '>' },
                      ]}
                    />
                    <Input label="$value" value="" type="text" />
                  </Modal.Body>
                  <Modal.Actions>
                    <Button onClick={close} color="system">
                      Cancel
                    </Button>
                    <Button onClick={() => close} color="primary">
                      Add
                    </Button>
                  </Modal.Actions>
                </>
              )
            }}
          </Modal.Content>
        </Modal.Root>

        <Dropdown.Root>
          <Dropdown.Trigger>
            <Button
              color="system"
              icon={<IconEye />}
              size="xsmall"
              style={{ marginLeft: 'auto' }}
            />
          </Dropdown.Trigger>

          <Dropdown.Items>
            {columnNames?.map((item, idx) => (
              <Input
                key={idx}
                title={item}
                type="checkbox"
                value={!hiddenColumns.includes(item.toLowerCase())}
                onChange={(v) => {
                  if (v) {
                    setFilteredColumns([
                      ...hiddenColumns.filter((x) => x !== item.toLowerCase()),
                    ])
                  } else {
                    setFilteredColumns([...hiddenColumns, item.toLowerCase()])
                  }
                }}
              />
            ))}
          </Dropdown.Items>
        </Dropdown.Root>
      </Row>
      <AutoSizer>
        {({ height, width }) => (
          <>
            {/* Table header */}
            <styled.div
              ref={tableHeaderRef}
              style={{
                borderTop: `1px solid ${borderColor}`,
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                width: width,
                overflowX: 'hidden',
                scrollBehavior: 'auto',
                // right scrollbar offset here
                paddingRight: 8,
              }}
            >
              {hiddenColumnNames.map((item, idx) => (
                <styled.div
                  key={idx}
                  style={{
                    minWidth: idx === 0 ? COLUMN_WIDTH + 32 : COLUMN_WIDTH,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {idx === 0 && (
                    <styled.div
                      style={{
                        marginRight: '8px',
                        marginLeft: '3px',
                        '& div': { width: '24px' },
                      }}
                    >
                      <Input
                        type="checkbox"
                        style={{ maxWidth: 24 }}
                        value={selectedRowIndexes.length === parsedData.length}
                        onChange={() => {
                          if (selectedRowIndexes.length !== parsedData.length) {
                            let arr = Array.from(
                              Array(parsedData.length).keys()
                            )
                            setSelectedRowIndexes([...arr])
                          } else {
                            setSelectedRowIndexes([])
                          }
                        }}
                      />
                    </styled.div>
                  )}
                  {sortOptions.$field === item &&
                    sortOptions.$order === 'desc' && (
                      <IconSortDesc color="brand" style={{ marginRight: 6 }} />
                    )}
                  {sortOptions.$field === item &&
                    sortOptions.$order === 'asc' && (
                      <IconSortAsc color="brand" style={{ marginRight: 6 }} />
                    )}
                  <Text
                    weight="strong"
                    transform="capitalize"
                    color={sortOptions.$field === item ? 'brand' : 'default'}
                    onClick={() => {
                      if (sortOptions.$order === 'desc') {
                        setSortOptions({ $field: item, $order: 'asc' })
                      } else {
                        setSortOptions({ $field: item, $order: 'desc' })
                      }
                      setSelectedRowIndexes([])
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {item}
                  </Text>
                </styled.div>
              ))}
            </styled.div>
            <Grid
              className="grid-class"
              height={height}
              rowCount={parsedData?.length}
              columnCount={hiddenColumnNames.length}
              width={w}
              rowHeight={(index) => ROW_HEIGHT}
              columnWidth={(index) =>
                index === 0 ? COLUMN_WIDTH + 32 : COLUMN_WIDTH
              }
              onScroll={(e) => {
                if (tableHeaderRef?.current) {
                  tableHeaderRef.current.scrollLeft = e.scrollLeft
                }
                result.onScrollY(e.scrollTop)
              }}
              style={{ ...style }}
            >
              {Cell}
            </Grid>
          </>
        )}
      </AutoSizer>
    </styled.div>
  )
}
