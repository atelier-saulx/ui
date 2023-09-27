import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { IconSortAsc as IconSort, color, styled, Text, ScrollArea } from '~'
import React, { useCallback, useRef } from 'react'

export type TableProps = {
  columns: { header: string; accessor: string; cell?: (any) => JSX.Element }[]
  data: any
  onScrollToBottom?: () => void
  resizeMode?: 'snap' | 'smooth'
}

export function Table({
  columns,
  data,
  onScrollToBottom,
  resizeMode = 'smooth',
}: TableProps) {
  const table = useReactTable({
    data,
    columns: columns.map((c) => ({
      header: c.header,
      accessorKey: c.accessor,
      cell: ({ getValue, renderValue }) =>
        c.cell ? c.cell(getValue()) : renderValue(),
    })),
    columnResizeMode: resizeMode === 'smooth' ? 'onChange' : 'onEnd',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    estimateSize: useCallback(() => 61, []),
    overscan: 11,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  const handleScroll = React.useCallback(
    (containerRefElement: HTMLDivElement) => {
      if (onScrollToBottom) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        if (scrollHeight - scrollTop - clientHeight < 300) {
          onScrollToBottom()
        }
      }
    },
    [onScrollToBottom]
  )

  return (
    <ScrollArea
      ref={tableContainerRef}
      style={{
        overflow: 'auto',
        height: '100%',
        width: 'fit-content',
      }}
      onScroll={(e) => handleScroll(e.target as HTMLDivElement)}
    >
      <table
        style={{
          width: table.getCenterTotalSize(),
          // borderCollapse: 'separate',
          tableLayout: 'fixed',
          background: color('background', 'default', 'strong'),
          borderSpacing: 0,
          borderCollapse: 'collapse',
        }}
      >
        <thead
          style={{
            position: 'sticky',
            top: 0,
            margin: 0,
            textAlign: 'left',
            zIndex: 50,
            background: color('background', 'default', 'strong'),
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return (
                  <styled.th
                    // ref={(ref) => (headersRef.current[i] = ref)}
                    onMouseDown={(e) => {
                      // onMouseDownHandler(e, i)
                    }}
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      padding: '0 12px',
                      height: 42,
                      fontSize: 14,
                      position: 'relative',
                      overflow: 'hidden',
                      width: header.getSize(),
                      boxSizing: 'border-box',
                      borderLeft: '1px solid transparent',
                      borderRight: '1px solid transparent',
                      borderTop: `1px solid ${color(
                        'border',
                        'default',
                        'strong'
                      )}`,
                      borderBottom: `1px solid ${color(
                        'border',
                        'default',
                        'strong'
                      )}`,
                      color: header.column.getIsSorted()
                        ? color('content', 'brand', 'primary')
                        : color('content', 'default', 'secondary'),
                      '&:hover': {
                        color: header.column.getIsSorted()
                          ? color('content', 'brand', 'primary')
                          : color('content', 'default', 'primary'),
                        '& span': {
                          backgroundColor: color('inputBorder', 'neutralHover'),
                        },
                      },
                      '&:active': {
                        '& span': {
                          backgroundColor: color('inputBorder', 'active'),
                        },
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <Text
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          display: 'flex',
                          height: '100%',
                          alignItems: 'center',
                          userSelect: 'none',
                          cursor: 'pointer',
                          color: 'inherit',
                        }}
                      >
                        {{
                          asc: (
                            <IconSort
                              style={{
                                marginRight: 8,
                                transform: 'scaleY(-1)',
                              }}
                              color="inherit"
                            />
                          ),
                          desc: (
                            <IconSort
                              style={{ marginRight: 8 }}
                              color="inherit"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Text>
                    )}
                    <styled.span
                      // tabIndex={1}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        height: '100%',
                        width: '2px',
                        // background: 'rgba(0, 0, 0, 0.5)',
                        cursor: 'col-resize',
                        userSelect: 'none',
                        touchAction: 'none',
                        // '&:hover': {
                        //   // Input Border/Neutral Normal
                        //   backgroundColor: color('inputBorder', 'neutralHover'),
                        // },

                        transform:
                          resizeMode === 'snap' && header.column.getIsResizing()
                            ? `translateX(${
                                table.getState().columnSizingInfo.deltaOffset
                              }px)`
                            : '',
                      }}
                    />
                  </styled.th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      style={{
                        boxSizing: 'border-box',
                        height: 61,
                        padding: '0 12px',
                        borderBottom: `1px solid ${color(
                          'border',
                          'default',
                          'strong'
                        )}`,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        width: cell.column.getSize(),
                      }}
                      key={cell.id}
                    >
                      <Text>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Text>
                    </td>
                  )
                })}
              </tr>
            )
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </ScrollArea>
  )
}
