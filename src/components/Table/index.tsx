import { ReactNode, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'
import { Icon } from '../Icon/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { styled } from 'inlines'
import { useVirtualizer } from '@tanstack/react-virtual'

// TODO virtualization
// TODO better API for rowActions
// TODO row onclick
// TODO better padding when not selectable

type TableInternal = {
  forceHover?: string
  setForceHover: (value?: string) => void
}
type TableSort = {
  key: string
  direction: 'asc' | 'desc'
}
type TableSelect = string[]
type TableColumn = {
  key: string
  header: string
  cell?: (row: any, table: TableInternal) => ReactNode
}

type TableProps = {
  data?: any[]
  columns: TableColumn[]
  sort?: TableSort
  onSortChange?: (sort?: TableSort) => void
  select?: TableSelect
  onSelectChange?: (select?: TableSelect) => void
}

function Table({
  data = [],
  columns,
  sort,
  onSortChange,
  select,
  onSelectChange,
}: TableProps) {
  const [hover, setHover] = useState<string>()
  const [forceHover, setForceHover] = useState<string>()

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <table
        style={{
          width: '100%',
          height: '100%',
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr>
            {onSelectChange && (
              <th
                style={{
                  width: 44,
                  padding: '0 12px',
                  borderBottom: `1px solid ${colors.neutral20Adjusted}`,
                  position: 'sticky',
                  top: 0,
                  background: colors.neutralInverted100,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CheckboxInput
                    value={
                      data.length && data.every((e) => select?.includes(e.id))
                    }
                    onChange={() => {
                      if (!select) {
                        onSelectChange(data.map((e) => e.id))
                        return
                      }

                      if (data.every((e) => select.includes(e.id))) {
                        onSelectChange([])
                        return
                      }

                      onSelectChange(data.map((e) => e.id))
                    }}
                  />
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th
                style={{
                  padding: '10px 6px',
                  margin: 0,
                  borderBottom: `1px solid ${colors.neutral20Adjusted}`,
                  position: 'sticky',
                  top: 0,
                  background: colors.neutralInverted100,
                  zIndex: 2,
                  ...(onSortChange && {
                    cursor: 'pointer',
                  }),
                }}
                onClick={() => {
                  if (!onSortChange) return

                  if (sort?.key !== column.key) {
                    onSortChange({ key: column.key, direction: 'desc' })
                  } else if (
                    sort?.key === column.key &&
                    sort.direction === 'desc'
                  ) {
                    onSortChange({ key: column.key, direction: 'asc' })
                  } else {
                    onSortChange()
                  }
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    minHeight: 24,
                    userSelect: 'none',
                  }}
                >
                  {onSortChange && sort?.key === column.key && (
                    <Icon
                      variant={
                        sort.direction === 'desc' ? 'arrow-down' : 'arrow-up'
                      }
                    />
                  )}
                  <Text variant="display-bold">{column.header}</Text>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              onMouseEnter={() => {
                setHover(row.id)
              }}
              onMouseLeave={() => {
                setHover(undefined)
              }}
            >
              {onSelectChange && (
                <td
                  style={{
                    padding: 0,
                    ...([hover, forceHover, ...(select ?? [])].includes(
                      row.id,
                    ) && {
                      background: colors.neutral10Adjusted,
                    }),
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CheckboxInput
                      value={select?.includes(row.id)}
                      onChange={() => {
                        if (!select) {
                          onSelectChange([row.id])
                          return
                        }

                        if (select.includes(row.id)) {
                          onSelectChange(select.filter((e) => e !== row.id))
                          return
                        }

                        onSelectChange([...select, row.id])
                      }}
                    />
                  </div>
                </td>
              )}
              {columns.map((column) => (
                <td
                  style={{
                    padding: '10px 6px',
                    margin: 0,
                    ...([hover, forceHover, ...(select ?? [])].includes(
                      row.id,
                    ) && {
                      background: colors.neutral10Adjusted,
                    }),
                  }}
                >
                  {column.cell ? (
                    column.cell(row, { forceHover, setForceHover })
                  ) : (
                    <Text variant="display-medium" color="neutral80">
                      {row[column.key]}
                    </Text>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </styled.div>
  )
}

export { Table }
export type { TableProps, TableSort, TableColumn, TableSelect }
