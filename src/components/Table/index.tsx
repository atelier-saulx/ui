import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import {
  Avatar,
  Badge,
  IconSortAsc,
  IconSortDesc,
  Text,
  Thumbnail,
  Toggle,
  color,
} from '../..'
import React, { ReactNode, useCallback, useEffect } from 'react'
import { useCallbackRef } from 'src/hooks/useCallbackRef'
import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'

type RenderAs =
  | 'badge'
  | 'image'
  | 'avatar'
  | 'toggle'
  | NumberFormat
  | DateFormat
  | 'strong'
  | 'medium'
  | 'normal'
  | ((row: any) => ReactNode)

type TableColumn =
  | {
      key: string
      header: string
      renderAs?: RenderAs
    }
  | { id: string; header?: string; renderAs: (row: any) => ReactNode }

function renderCell(key: string, row: any, renderAs: RenderAs = 'normal') {
  if (typeof renderAs === 'function') return renderAs(row)
  if (renderAs === 'normal') return <Text>{row[key]}</Text>
  if (renderAs === 'medium') return <Text weight="medium">{row[key]}</Text>
  if (renderAs === 'strong') return <Text weight="strong">{row[key]}</Text>
  if (renderAs === 'image')
    return <Thumbnail color="neutral" size="small" src={row[key]} />
  if (renderAs === 'badge')
    return (
      <Badge copy copyValue={row[key]}>
        {row[key]}
      </Badge>
    )
  if (renderAs === 'avatar') return <Avatar>{row[key]}</Avatar>
  if (renderAs === 'toggle') return <Toggle value={row[key]} />

  let content = row[key]
  if (row[key] instanceof Date) {
    content = row[key].getTime()
  }
  if (typeof row[key] === 'object') {
    content = JSON.stringify(row[key])
  }

  return (
    <Text
      valueFormat={renderAs}
      light={renderAs?.includes?.('date') || renderAs?.includes?.('time')}
    >
      {content}
    </Text>
  )
}

export type TableProps = {
  columns: TableColumn[]
  data: any
  onScrollToBottom?: () => void
  onVisibleElementsChange?: (visibleElements: number[]) => void
  virtualized?: boolean
  header?: boolean
}

export function Table({
  columns,
  data,
  onScrollToBottom: onScrollToBottomProp,
  onVisibleElementsChange: onVisibleElementsChangeProp,
  virtualized,
  header = true,
}: TableProps) {
  const table = useReactTable({
    data,
    columns: columns.map((c) => {
      if ('id' in c) {
        return {
          id: c.id,
          header: c.header,
          cell: ({ row }) => c.renderAs(row.original),
        }
      }

      return {
        header: c.header,
        accessorKey: c.key,
        cell: ({ row }) => renderCell(c.key, row.original, c.renderAs),
      }
    }),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  const { rows } = table.getRowModel()

  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
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

  const onVisibleElementsChange = useCallbackRef(onVisibleElementsChangeProp)
  useEffect(() => {
    if (onVisibleElementsChange) {
      onVisibleElementsChange(virtualRows.map((e) => e.index))
    }
  }, [onVisibleElementsChange, virtualRows])

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
          borderSpacing: 0,
        }}
      >
        <tbody>
          {virtualized && paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {(virtualized ? virtualRows.map((row) => rows[row.index]) : rows).map(
            (row, index) => {
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            }
          )}
          {virtualized && paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
        {header && (
          <thead
            style={{
              position: 'sticky',
              top: 0,
              margin: 0,
              textAlign: 'left',
              background: virtualized
                ? color('background', 'default', 'strong')
                : 'none',
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
                            cursor: header.column.getCanSort()
                              ? 'pointer'
                              : 'default',
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
