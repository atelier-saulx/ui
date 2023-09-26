import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { IconSortAsc as IconSort, color, styled } from '~'
import React, { useCallback, useRef } from 'react'

export type TableProps = {
  columns: { header: string; accessor: string; cell?: (any) => JSX.Element }[]
  data: any
  onScrollToBottom?: () => void
}

export function Table({ columns, data, onScrollToBottom }: TableProps) {
  const table = useReactTable({
    data,
    columns: columns.map((c) => ({
      header: c.header,
      accessorKey: c.accessor,
      cell: ({ getValue, renderValue }) =>
        c.cell ? c.cell(getValue()) : renderValue(),
    })),
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

  const headersRef = useRef([])
  let doMove
  let x
  let width
  const mouseMoveHandler = (e, i) => {
    //left side
    const newX = x - e.clientX

    if (
      e.clientX - headersRef.current[i].getBoundingClientRect().left <=
      headersRef.current[i].clientWidth / 2
      // && e.clientX - headersRef.current[i].getBoundingClientRect().left > 0
    ) {
      headersRef.current[i].style.width = `${width + newX * 2}px`
      //right side
    } else if (
      e.clientX - headersRef.current[i].getBoundingClientRect().left >
      headersRef.current[i].clientWidth / 2
    ) {
      console.log(false)
    }
    // if (refRangeContainer.current !== null) {
    //   moveHandler(
    //     e.clientX - refRangeContainer.current.getBoundingClientRect().left
    //   )
    // }
  }

  const mouseUpHandler = (i) => {
    if (headersRef.current[i] !== null) {
      headersRef.current[i].style.cursor = 'pointer'
      window.removeEventListener('mousemove', doMove)
      window.removeEventListener('mouseup', () => mouseUpHandler(i))
      // setContainerWidth(
      //   headersRef.current[i]?.getBoundingClientRect().width || 0
      // )
    }
  }

  const onMouseDownHandler = (e, i) => {
    if (headersRef.current[i] !== null) {
      headersRef.current[i].style.cursor = 'grabbing'
      x = e.clientX
      width = headersRef.current[i].clientWidth
      window.addEventListener(
        'mousemove',
        (doMove = function (e) {
          mouseMoveHandler(e, i)
        })
      )
      window.addEventListener('mouseup', () => mouseUpHandler(i))
    }
  }

  return (
    <div
      ref={tableContainerRef}
      style={{
        overflow: 'auto',
        height: '100%',
        width: '100%',
      }}
      onScroll={(e) => handleScroll(e.target as HTMLDivElement)}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'separate',
          tableLayout: 'fixed',
          background: color('background', 'default', 'strong'),
          borderSpacing: 0,
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
                    ref={(ref) => (headersRef.current[i] = ref)}
                    onMouseDown={(e) => {
                      console.log('ligma')
                      // (headersRef.current[i].style.width = '400px')
                      onMouseDownHandler(e, i)
                    }}
                    key={header.id}
                    style={{
                      padding: '0 12px',
                      height: 42,
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
                      '&:hover': {
                        borderRight: `2px solid ${color(
                          'border',
                          'default',
                          'strong'
                        )}`,
                        borderLeft: `2px solid ${color(
                          'border',
                          'default',
                          'strong'
                        )}`,
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={(e) => {
                          header.column.getToggleSortingHandler()
                        }}
                        style={{
                          border: '1px solid red',
                          display: 'flex',
                          height: '100%',
                          alignItems: 'center',
                          userSelect: 'none',
                          cursor: 'pointer',
                          color: header.column.getIsSorted()
                            ? color('content', 'brand', 'primary')
                            : color('content', 'default', 'secondary'),
                        }}
                      >
                        {{
                          asc: (
                            <IconSort
                              style={{
                                marginRight: 8,
                                transform: 'scaleY(-1)',
                              }}
                            />
                          ),
                          desc: <IconSort style={{ marginRight: 8 }} />,
                        }[header.column.getIsSorted() as string] ?? null}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
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
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
    </div>
  )
}
