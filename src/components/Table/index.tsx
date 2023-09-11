import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { color } from '../..'
import React, { useCallback } from 'react'

export type TableProps = {
  columns: { header: string; accessor: string; cell?: (any) => JSX.Element }[]
  data: any
}

export function Table({ columns, data }: TableProps) {
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

  return (
    <div
      ref={tableContainerRef}
      style={{ overflow: 'auto', height: '100%', width: '100%' }}
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
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
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
