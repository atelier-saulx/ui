import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { IconSortAsc, IconSortDesc, Text, color } from '../..'
import React, { RefObject, useCallback, useEffect } from 'react'
import { useCallbackRef } from 'src/hooks/useCallbackRef'

type VirtualizedBodyProps = {
  rows: any[]
  parentRef: RefObject<HTMLDivElement>
  onVisibleElementsChange?: (visibleElements: number[]) => void
  header?: boolean
}

const VirtualizedBody = ({
  rows,
  parentRef,
  onVisibleElementsChange: onVisibleElementsChangeProp,
  header,
}: VirtualizedBodyProps) => {
  const onVisibleElementsChange = useCallbackRef(onVisibleElementsChangeProp)
  const rowVirtualizer = useVirtual({
    parentRef,
    size: rows.length,
    estimateSize: useCallback(() => 61, []),
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  useEffect(() => {
    if (onVisibleElementsChange) {
      onVisibleElementsChange(virtualRows.map((e) => e.index))
    }
  }, [onVisibleElementsChange, virtualRows])

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}

      {virtualRows
        .map((row) => rows[row.index])
        .map((row, index) => {
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
                      borderTop:
                        !header &&
                        index === 0 &&
                        `1px solid ${color('border', 'default', 'strong')}`,
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
    </>
  )
}

export type NewTableProps = {
  columns: {
    header: string
    accessor: string
    cell?: (any) => JSX.Element
    id?: string
  }[]
  data: any
  onScrollToBottom?: () => void
  onVisibleElementsChange?: (visibleElements: number[]) => void
  virtualized?: boolean
  header?: boolean
}

export function NewTable({
  columns,
  data,
  onScrollToBottom: onScrollToBottomProp,
  onVisibleElementsChange,
  virtualized,
  header = true,
}: NewTableProps) {
  const table = useReactTable({
    data,
    columns: columns.map((c) => ({
      header: c.header,
      accessorKey: c.accessor,
      cell: ({ getValue, renderValue }) =>
        c.cell ? c.cell(getValue()) : renderValue(),
      id: c.id,
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()

  const onScrollToBottom = useCallbackRef(onScrollToBottomProp)
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
    <div
      ref={tableContainerRef}
      style={{ overflow: 'auto', height: '100%', width: '100%' }}
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
        <tbody>
          {virtualized ? (
            <VirtualizedBody
              rows={rows}
              parentRef={tableContainerRef}
              onVisibleElementsChange={onVisibleElementsChange}
              header={header}
            />
          ) : (
            rows.map((row, index) => {
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
                          borderTop:
                            !header &&
                            index === 0 &&
                            `1px solid ${color('border', 'default', 'strong')}`,
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
            })
          )}
        </tbody>
        {header && (
          <thead
            style={{
              position: 'sticky',
              top: 0,
              margin: 0,
              textAlign: 'left',
              background: color('background', 'default', 'strong'),
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        padding: '0 12px',
                        height: 42,
                        boxSizing: 'border-box',
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
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          style={{
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
                              <IconSortAsc
                                style={{
                                  marginRight: 8,
                                }}
                              />
                            ),
                            desc: <IconSortDesc style={{ marginRight: 8 }} />,
                          }[header.column.getIsSorted() as string] ?? null}
                          <Text>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
        )}
      </table>
    </div>
  )
}
