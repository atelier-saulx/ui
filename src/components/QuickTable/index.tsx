import React, { CSSProperties, FC, useState, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import { Style, styled } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { SortOptions, useInfiniteQuery } from './useInfiniteQuery'
import { BasedQuery } from '@based/client'
import { RenderAs } from './RenderAs'
import { TableHeader } from './TableHeader'

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
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    $field: 'createdAt',
    $order: 'desc',
  })
  const [horizontalScrollOffset, setHorizontalScrollOffset] = useState(0)

  let w = width
  let h = height

  let COLUMN_WIDTH = 124
  let ROW_HEIGHT = 60

  const columnNames = [...new Set(data?.flatMap(Object.keys))] as string[]

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
          onRowClick(data[rowIndex], rowIndex)
          onCellClick(
            data[rowIndex][columnNames[columnIndex]],
            rowIndex,
            columnIndex
          )
        }}
      >
        {/* render cell based on column name type renderAs */}
        <RenderAs
          input={data[rowIndex][columnNames[columnIndex]]}
          colName={columnNames[columnIndex]}
        />
      </styled.div>
    )
  }

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

  console.log(result, 'Result>?')
  console.log(parsedData, 'ParsedDAta?')

  const scrollbarColor = color('border', 'default', 'strong')
  const transparentAreaColor = color('background', 'default', 'surface')

  return (
    <styled.div
      style={{
        width: w,
        height: h,
        '& .grid-class': {
          scrollbarGutter: 'stable',
          overflowY: 'overlay',
          overflowX: 'overlay',
          // minWidth: 'fit-content', // <=== this breaks it
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
      <AutoSizer>
        {({ height, width }) => (
          <>
            <TableHeader
              width={width}
              columnWidth={COLUMN_WIDTH}
              headerColumns={columnNames}
              scrollLeft={horizontalScrollOffset}
            />
            <Grid
              className="grid-class"
              height={h}
              rowCount={data?.length}
              columnCount={columnNames.length}
              width={w}
              rowHeight={(index) => ROW_HEIGHT}
              columnWidth={(index) => COLUMN_WIDTH}
              onScroll={(e) => {
                console.log('horizontal scroll??', e)
                setHorizontalScrollOffset(e.scrollLeft)
                result.onScrollY(e.scrollTop)
              }}
              style={{ ...style }}
              itemData={{
                data: parsedData,
              }}
            >
              {Cell}
            </Grid>
          </>
        )}
      </AutoSizer>
    </styled.div>
  )
}
