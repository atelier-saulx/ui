import React, { useRef, useState } from 'react'
import { Table, TableSelect, TableSort } from './index.js'
import { Badge } from '../Badge/index.js'
import { Menu } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'
import {
  randEmail,
  randFullName,
  randPastDate,
  randSeatNumber,
  randStatus,
  randText,
} from '@ngneat/falso'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'
import { useQuery } from '@based/react'
import { useVirtualizer } from '../../hooks/useVirtualizer.js'

export default {
  title: 'Table (WIP)',
  component: Table,
}

export const FullScreenAndSortableAndSelectableAndAction = () => {
  const [sort, setSort] = useState<TableSort>()
  const [select, setSelect] = useState<TableSelect>()

  const { data } = useQuery('db', {
    files: {
      $all: true,
      $list: {
        $find: {
          $traverse: 'children',
          $filter: {
            $field: 'type',
            $operator: '=',
            $value: 'file',
          },
        },
        ...(sort && { $sort: { $field: sort.key, $order: sort.direction } }),
      },
    },
  })

  return (
    <div style={{ height: '85svh' }}>
      <Table
        data={data?.files}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          {
            key: 'progress',
            header: 'Progress',
            cell: (row) => (
              <Badge color="green-subtle">{row.progress * 100}%</Badge>
            ),
          },
          {
            key: 'createdAt',
            header: 'Created At',
            cell: (row) => (
              <Text variant="display-medium" color="neutral80">
                {new Date(row.createdAt).toISOString()}
              </Text>
            ),
          },
          {
            key: 'action',
            header: '',
            cell: (row, table) => (
              <Menu
                onOpenChange={(open) => {
                  table.setForceHover(open ? row.id : undefined)
                }}
              >
                <Menu.Trigger>
                  <IconButton size="small" icon="more-vertical" />
                </Menu.Trigger>
                <Menu.Items>
                  <Menu.Item
                    leadIcon="external"
                    onClick={() => {
                      window.open(row.src, '_blank')
                    }}
                  >
                    Open in new tab
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ),
          },
        ]}
        sort={sort}
        onSortChange={setSort}
        select={select}
        onSelectChange={setSelect}
      />
    </div>
  )
}

export const Virtualizer = () => {
  const DATA = Array.from({ length: 10_000 }).map((_, index) => ({
    id: index,
    name: randFullName(),
    email: randEmail(),
  }))

  const ITEM_HEIGHT = 80

  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: DATA.length,
    itemHeight: ITEM_HEIGHT,
    scrollElementRef: scrollRef,
  })

  return (
    <div
      ref={scrollRef}
      style={{
        width: '100%',
        height: '85svh',
        overflowY: 'auto',
        border: '4px solid blue',
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          height: virtualizer.totalHeight,
        }}
      >
        {DATA.slice(
          virtualizer.firstVisibleItemIndex,
          virtualizer.lastVisibleItemIndex,
        ).map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: ITEM_HEIGHT,
              border: '1px solid red',
              transform: `translateY(${
                (virtualizer.firstVisibleItemIndex + index) *
                virtualizer.itemHeight
              }px)`,
            }}
          >
            {item.id}: {item.email}
          </div>
        ))}
      </div>
    </div>
  )
}
