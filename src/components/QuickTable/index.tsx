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
import { IconEye } from '../../icons'

type QuickTableProps = {
  data?: any
  width?: number
  height?: number
  queryId?: number | string
  query?: (start: number, limit: number) => BasedQuery
  getQueryItems?: (data: any) => any[]
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
  onRowClick,
  onCellClick,
  style,
}) => {
  const [filteredColumns, setFilteredColumns] = useState([])
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    $field: 'createdAt',
    $order: 'desc',
  })

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
  })

  const parsedData = query ? result.items : data

  const columnNames = [...new Set(parsedData?.flatMap(Object.keys))] as string[]
  const filteredColumnNames = columnNames.filter(
    (item) => !filteredColumns.includes(item.toLowerCase())
  )

  console.log(result, 'Result>?')
  console.log(parsedData, 'ParsedDAta?')

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
            parsedData[rowIndex][filteredColumnNames[columnIndex]],
            rowIndex,
            columnIndex
          )
        }}
      >
        {/* render cell based on column name type renderAs */}
        <RenderAs
          input={parsedData[rowIndex][filteredColumnNames[columnIndex]]}
          colName={filteredColumnNames[columnIndex]}
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
          {columnNames?.map((item) => (
            <Input
              title={item}
              type="checkbox"
              value={!filteredColumns.includes(item.toLowerCase())}
              onChange={(v) => {
                if (v) {
                  setFilteredColumns([
                    ...filteredColumns.filter((x) => x !== item.toLowerCase()),
                  ])
                } else {
                  setFilteredColumns([...filteredColumns, item.toLowerCase()])
                  console.log(v, 'falkse')
                }
              }}
            />
          ))}
        </Dropdown.Items>
      </Dropdown.Root>

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
              {filteredColumnNames.map((item, idx) => (
                <styled.div
                  key={idx}
                  style={{
                    minWidth: COLUMN_WIDTH,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Text weight="strong" transform="capitalize">
                    {item}
                  </Text>
                </styled.div>
              ))}
            </styled.div>
            <Grid
              className="grid-class"
              height={height}
              rowCount={parsedData?.length}
              columnCount={filteredColumnNames.length}
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
