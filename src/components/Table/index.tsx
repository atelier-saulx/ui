import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
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
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCallbackRef } from '../../hooks/useCallbackRef'
import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { styled } from 'inlines'
import { TableTopBar } from './TableTopBar'

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

type TableColumn = { align?: 'start' | 'center' | 'end' } & (
  | {
      key: string
      header: string
      renderAs?: RenderAs
    }
  | { id: string; header?: string; renderAs: (row: any) => ReactNode }
)
function renderCell(key: string, row: any, renderAs: RenderAs = 'normal') {
  if (typeof renderAs === 'function') return renderAs(row)
  if (renderAs === 'normal') return <Text>{row[key]}</Text>
  if (renderAs === 'medium') return <Text weight="medium">{row[key]}</Text>
  if (renderAs === 'strong') return <Text weight="strong">{row[key]}</Text>
  if (renderAs === 'image')
    return <Thumbnail color="neutral" size="small" src={row[key]} />
  if (renderAs === 'badge')
    return (
      <Badge autoColor light copy copyValue={row[key]}>
        {row[key]}
      </Badge>
    )
  if (renderAs === 'avatar')
    return (
      <Avatar light autoColor>
        {row[key]}
      </Avatar>
    )
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
  columns?: TableColumn[]
  data: any
  onScrollToBottom?: () => void
  onVisibleElementsChange?: (visibleElements: number[]) => void
  virtualized?: boolean
  header?: true | false | 'sticky'
  border?: boolean
  rowAction?: (row: any) => ReactNode
  onRowClick?: (row: any) => void
}

function generateColumDefinitionsFromData(element) {
  let columnDefinitions = Object.entries(element).map(([key, value]) => {
    const columnDefinition: TableColumn = {
      key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    }

    if (value instanceof Date) {
      columnDefinition.renderAs = 'date-time-human'
    }

    if (key === 'id') {
      columnDefinition.header = 'ID'
      columnDefinition.renderAs = 'badge'
    }

    if (key === 'price') {
      columnDefinition.renderAs = 'number-euro'
    }

    if (key === 'bytes' || key === 'size') {
      columnDefinition.renderAs = 'number-bytes'
    }

    if (key === 'avatar') {
      columnDefinition.renderAs = 'avatar'
    }

    if (key === 'image' || key === 'img' || key === 'logo') {
      columnDefinition.renderAs = 'image'
    }

    if (key === 'createdAt' || key === 'updatedAt') {
      columnDefinition.renderAs = 'date-time-human'
    }

    if (key === 'name' || key === 'title') {
      columnDefinition.renderAs = 'medium'
    }

    if (key === 'status') {
      columnDefinition.renderAs = 'badge'
    }

    return columnDefinition
  })

  const maybeNameIndex = columnDefinitions.findIndex(
    (e) => e.key === 'name' || e.key === 'title'
  )
  const maybeImageIndex = columnDefinitions.findIndex(
    (e, i) => e.renderAs === 'image' && Math.abs(maybeNameIndex - i) < 2
  )

  if (maybeNameIndex > -1 && maybeImageIndex > -1) {
    const nameColumn = columnDefinitions[maybeNameIndex]
    const imageColumn = columnDefinitions[maybeImageIndex]

    columnDefinitions = columnDefinitions.filter(
      (_, i) => i !== maybeImageIndex
    )

    columnDefinitions[
      columnDefinitions.findIndex((e) => e.key === 'name' || e.key === 'title')
    ].renderAs = (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Thumbnail color="neutral" size="small" src={row[imageColumn.key]} />
        <Text>{row[nameColumn.key]}</Text>
      </div>
    )
  }

  return columnDefinitions
}

export function Table({
  data = [],
  columns: columnsProp,
  onScrollToBottom: onScrollToBottomProp,
  onVisibleElementsChange: onVisibleElementsChangeProp,
  virtualized,
  header = true,
  border,
  rowAction,
  onRowClick: onRowClickProp,
}: TableProps) {
  const [selectedPillVal, setSelectedPillVal] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredColumns, setFilteredColumns] = useState([])
  const [allColumnNames, setAllColumnNames] = useState(
    generateColumDefinitionsFromData(data[0] ?? {})
  )

  if (searchValue) {
    const res = data.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(searchValue.toLowerCase())
    )

    data = res
  }

  const columns = useMemo(() => {
    return [
      ...(columnsProp ?? generateColumDefinitionsFromData(data[0] ?? {})),
      ...(rowAction
        ? [
            {
              align: 'end',
              id: 'internal_row_action',
              header: '',
              renderAs: rowAction,
            },
          ]
        : []),
    ]
  }, [columnsProp, data])

  const table = useReactTable({
    data,
    columns: columns
      .filter((item: any) => !filteredColumns.includes(item.key))
      .map((c) => {
        if ('id' in c) {
          return {
            align: c.align,
            id: c.id,
            header: c.header,
            cell: ({ row }) => c.renderAs(row.original),
          }
        }

        return {
          align: c.align,
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
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: useCallback(() => 61, []),
    overscan: 10,

    // parentRef: tableContainerRef,
    // size: rows.length,
    // estimateSize: useCallback(() => 61, []),
    // overscan: 10,
  })

  const totalSize = rowVirtualizer.getTotalSize()
  const virtualRows = rowVirtualizer.getVirtualItems()

  // const { virtualItems: virtualRows, totalSize } = rowVirtualizer
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

  const onRowClick = useCallbackRef(onRowClickProp)

  return (
    <>
      <TableTopBar
        allColumnNames={allColumnNames}
        setSelectedPillVal={setSelectedPillVal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filteredColumns={filteredColumns}
        setFilteredColumns={setFilteredColumns}
      />
      <styled.div
        ref={tableContainerRef}
        style={{
          overflow: 'auto',
          height: '100%',
          width: '100%',
          scrollbarColor: `${color('border', 'default', 'strong')} transparent`,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            visibility: 'hidden',
          },
          '&::-webkit-scrollbar:vertical': {
            width: '8px',
          },
          '&::-webkit-scrollbar:horizontal': {
            height: '8px',
          },
          '@media (hover: hover)': {
            '&:hover': {
              '&::-webkit-scrollbar': {
                visibility: 'visible',
              },

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: color('border', 'default', 'strong'),
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:vertical': {
                borderRight: `2px solid ${color(
                  'background',
                  'default',
                  'surface'
                )}`,
                minHeight: '32px',
              },
              '&::-webkit-scrollbar-thumb:horizontal': {
                borderBottom: `2px solid ${color(
                  'background',
                  'default',
                  'surface'
                )}`,
                minWidth: '32px',
              },
            },
          },
        }}
        onScroll={(e) => handleScroll(e.target as HTMLDivElement)}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            ...(border
              ? {
                  border: `1px solid ${color('border', 'default', 'strong')}`,
                  borderRadius: 16,
                }
              : {}),
          }}
        >
          <tbody>
            {virtualized && paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {(virtualized
              ? virtualRows.map((row) => rows[row.index])
              : rows
            ).map((row, index) => {
              return (
                <tr
                  onClick={(e) => {
                    if (onRowClick) {
                      onRowClick(row.original)
                    }
                  }}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        style={{
                          boxSizing: 'border-box',
                          height: 61,
                          padding: '0 12px',
                          borderBottom:
                            index !==
                              (virtualized
                                ? virtualRows.map((row) => rows[row.index])
                                : rows
                              ).length -
                                1 &&
                            `1px solid ${color('border', 'default', 'strong')}`,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                          borderTop:
                            !border &&
                            !header &&
                            index === 0 &&
                            `1px solid ${color('border', 'default', 'strong')}`,
                        }}
                        key={cell.id}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent:
                              (cell.column.columnDef as any).align ?? 'start',
                            alignItems: 'center',
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {virtualized && paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
          {header && (
            <thead
              style={{
                ...(header === 'sticky'
                  ? {
                      position: 'sticky',
                      top: 0,
                      margin: 0,
                      textAlign: 'left',
                      background: color('background', 'default', 'strong'),
                    }
                  : {}),
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
                          borderTop:
                            !border &&
                            `1px solid ${color('border', 'default', 'strong')}`,
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
                              justifyContent:
                                (header.column.columnDef as any).align ??
                                'start',
                              alignItems: 'center',
                              userSelect: 'none',
                              cursor: header.column.getCanSort()
                                ? 'pointer'
                                : 'default',
                            }}
                          >
                            {{
                              asc: (
                                <IconSortAsc
                                  color="brand"
                                  style={{
                                    marginRight: 8,
                                  }}
                                />
                              ),
                              desc: (
                                <IconSortDesc
                                  style={{ marginRight: 8 }}
                                  color="brand"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                            <Text
                              style={{
                                color:
                                  header.column.getIsSorted() ||
                                  selectedPillVal === header.id
                                    ? color('content', 'brand', 'primary')
                                    : color('content', 'default', 'secondary'),
                              }}
                              weight={
                                selectedPillVal === header.id
                                  ? 'medium'
                                  : 'normal'
                              }
                            >
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
      </styled.div>
    </>
  )
}
