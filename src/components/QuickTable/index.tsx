import React, { FC, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import { styled } from 'inlines'
import { color } from 'src/varsUtilities'
import { Text } from '../Text'
import { SortOptions, useInfiniteQuery } from './useInfiniteQuery'

type QuickTableProps = {
  data?: any
  width?: number
  height?: number
}

export const QuickTable: FC<QuickTableProps> = ({
  data,
  width = 300,
  height = 300,
}) => {
  const [sortOptions, setSortOpts] = useState<SortOptions>({
    $field: 'createdAt',
    $order: 'desc',
  })

  let w = width
  let h = height

  const columnNames = Object.keys(data[0])
  const noOfColumns = Object.keys(data[0]).length

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
        onClick={() =>
          console.log(
            'clicked on row numbrer ',
            rowIndex,
            'column -> ',
            columnIndex
          )
        }
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
    <AutoSizer>
      {({ height, width }) => (
        <styled.div
          style={{
            minHeight: h,
            width: '100%',
            height: '100%',
            maxWidth: w,
          }}
        >
          <Grid
            height={h}
            rowCount={data?.length}
            columnCount={noOfColumns}
            width={w}
            rowHeight={(index) => 60}
            columnWidth={(index) => 124}
            onScroll={(e) => {
              result.onScrollY(e.scrollTop)
            }}
          >
            {Cell}
          </Grid>
        </styled.div>
      )}
    </AutoSizer>
  )
}
