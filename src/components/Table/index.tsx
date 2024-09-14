import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'
import { Icon } from '../Icon/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { styled } from 'inlines'
import { useVirtualizer } from '../../hooks/useVirtualizer.js'

// TODO add pagination/infinite loading logic
// TODO better API for rowActions
// TODO row onclick
// TODO better padding when not selectable on the left (contact design)

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

  const ITEM_HEIGHT = 44
  const ITEM_COUNT = data.length
  const scrollElementRef = useRef<HTMLDivElement>()
  const { firstVisibleItemIndex, lastVisibleItemIndex } = useVirtualizer({
    scrollElementRef,
    itemCount: data.length,
    itemHeight: ITEM_HEIGHT,
  })

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
      ref={scrollElementRef}
    >
      <table
        style={{
          width: '100%',
          height: '100%',
          borderSpacing: 0,
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr>
            {onSelectChange && (
              <th
                style={{
                  width: 44,
                  padding: '0 12px',
                  boxShadow: `inset 0 -1px 0 0 ${colors.neutral20Adjusted}`,
                  position: 'sticky',
                  top: 0,
                  background: colors.neutralInverted100,
                  zIndex: 3,
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
                key={column.key}
                style={{
                  padding: '10px 6px',
                  margin: 0,
                  boxShadow: `inset 0 -1px 0 0 ${colors.neutral20Adjusted}`,
                  position: 'sticky',
                  top: 0,
                  background: colors.neutralInverted100,
                  zIndex: 3,
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
                  <Text variant="display-bold">{column.header}</Text>
                  {onSortChange && sort?.key === column.key && (
                    <Icon
                      variant={
                        sort.direction === 'desc' ? 'arrow-down' : 'arrow-up'
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!!firstVisibleItemIndex && (
            <tr>
              <td
                style={{
                  padding: 0,
                  height: firstVisibleItemIndex * ITEM_HEIGHT,
                }}
              />
            </tr>
          )}
          {data
            .slice(firstVisibleItemIndex, lastVisibleItemIndex)
            .map((row) => (
              <tr
                key={row.id}
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
                    key={row.id + column.key}
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
                    <div style={{ display: 'flex' }}>
                      {column.cell ? (
                        column.cell(row, { forceHover, setForceHover })
                      ) : (
                        <Text variant="display-medium" color="neutral80">
                          {row[column.key]}
                        </Text>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          {lastVisibleItemIndex < ITEM_COUNT && (
            <tr>
              <td
                style={{
                  padding: 0,
                  height: (ITEM_COUNT - lastVisibleItemIndex) * ITEM_HEIGHT,
                }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </styled.div>
  )
}

export { Table }
export type { TableProps, TableSort, TableColumn, TableSelect }
