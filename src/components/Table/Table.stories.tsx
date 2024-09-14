import React, { useState } from 'react'
import { Table, TableSelect, TableSort } from './index.js'
import { Badge } from '../Badge/index.js'
import { Menu } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'

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
            key: 'statusText',
            header: 'Status',
            cell: (row) => (
              <Badge
                color={row.status === 3 ? 'green-subtle' : 'orange-subtle'}
                leadIcon={row.status === 3 ? 'checkmark' : 'error'}
              >
                {row.statusText.slice(0, 1).toUpperCase() +
                  row.statusText.slice(1)}
              </Badge>
            ),
          },
          {
            key: 'size',
            header: 'Size',
            cell: (row) => (
              <Text variant="display-medium" color="neutral80">
                {prettyNumber(row.size, 'number-bytes').toUpperCase()}
              </Text>
            ),
          },
          {
            key: 'createdAt',
            header: 'Created At',
            cell: (row) => (
              <Text variant="display-medium" color="neutral80">
                {prettyDate(row.createdAt, 'date-time-human')}
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
