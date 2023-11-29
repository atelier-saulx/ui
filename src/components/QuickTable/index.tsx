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
import { Dropdown } from '..'
import { Button } from '..'
import { IconEye, IconSortDesc, IconSortAsc } from '../../icons'
import { Filter } from './Filter'
import { Row } from '..'

type QuickTableProps = {
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
  filter?: {}
  onRowClick?: (v, rIdx) => void
  onCellClick?: (v, rIdx, cIdx) => void
  style?: CSSProperties | Style
}

export const QuickTable: FC<QuickTableProps> = ({
  data,
  width = 300,
  height = 300,
  queryId,
  query,
  getQueryItems,
  filter,
  onRowClick,
  onCellClick,
  style,
}) => {
  const [hiddenColumns, setFilteredColumns] = useState([])
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    $field: 'createdAt',
    $order: 'desc',
  })

  const [customFilter, setCustomFilter] = useState(filter)

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
    filter: customFilter,
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
          overflowY: 'overlay',
          overflowX: 'overlay',
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
      {/* <Button
        onClick={() => setSortOptions({ $field: 'size', $order: 'desc' })}
        style={{ marginBottom: 30 }}
      >
        Sort This
      </Button> */}

      <Row style={{ marginBottom: 8 }}>
        <Filter
          customFilter={customFilter}
          setCustomFilter={setCustomFilter}
          columnNames={columnNames}
        />
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
                    minWidth: COLUMN_WIDTH,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (sortOptions.$order === 'desc') {
                      setSortOptions({ $field: item, $order: 'asc' })
                    } else setSortOptions({ $field: item, $order: 'desc' })
                  }}
                >
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
              columnWidth={(index) => COLUMN_WIDTH}
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
