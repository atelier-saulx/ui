import React, { useState } from 'react'
import { Table, TableSelect, TableSort } from './index.js'
import { Badge } from '../Badge/index.js'
import { Menu } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'

import { Text } from '../Text/index.js'
import { useQuery } from '@based/react'

export default {
  title: 'Table (WIP)',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
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
    <div style={{ height: '100svh' }}>
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
                  <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    <IconButton size="small" icon="more-vertical" />
                  </div>
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
