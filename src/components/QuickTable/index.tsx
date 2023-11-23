import React, { CSSProperties, FC, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import { Style, styled } from 'inlines'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { SortOptions, useInfiniteQuery } from './useInfiniteQuery'
import { BasedQuery } from '@based/client'

type QuickTableProps = {
  data?: any
  width?: number
  height?: number
  queryId?: number | string
  query?: (start: number, limit: number) => BasedQuery
  getQueryItems?: (data: any) => any[]
  onRowClick?: (v) => void
  onCellClick?: (rIdx, cIdx) => void
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
  const [sortOptions, setSortOpts] = useState<SortOptions>({
    $field: 'createdAt',
    $order: 'desc',
  })

  let w = width
  let h = height

  const columnNames = [...new Set(data.flatMap(Object.keys))] as string[]

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
          onRowClick(rowIndex)
          onCellClick(rowIndex, columnIndex)
        }}
      >
        {/* render cell based on column name type */}
        <Text>{data[rowIndex][columnNames[columnIndex]]}</Text>
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

  console.log(result, 'Result>?')

  return (
    <div style={{ width: w, height: h }}>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            height={h}
            rowCount={data?.length}
            columnCount={columnNames.length}
            width={w}
            rowHeight={(index) => 60}
            columnWidth={(index) => 124}
            onScroll={(e) => {
              //       result.onScrollY(e.scrollTop)
            }}
            style={{ ...style }}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  )
}
