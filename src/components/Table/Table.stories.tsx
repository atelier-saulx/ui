import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Table, TableSelect, TableSort } from './index.js'
import { Badge } from '../Badge/index.js'
import { Menu } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { Text } from '../Text/index.js'
import { useClient } from '@based/react'

export default {
  title: 'Table (WIP)',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => {
  const [sort, setSort] = useState<TableSort>()
  const [select, setSelect] = useState<TableSelect>()

  const accessFn = (data) => data?.files ?? []
  const client = useClient()
  const [fetching, setFetching] = useState(false)
  const [chunks, setChunks] = useState<any[]>([])
  const data = chunks.flatMap((chunk) => accessFn(chunk))

  function fetchChunk() {
    if (fetching) return
    setFetching(true)

    const index = chunks.length

    client
      .query('db', {
        files: {
          $all: true,
          $list: {
            $limit: 24,
            $offset: data.length,
            $find: {
              $traverse: 'children',
              $filter: {
                $field: 'type',
                $operator: '=',
                $value: 'file',
              },
            },
            ...(sort && {
              $sort: { $field: sort.key, $order: sort.direction },
            }),
          },
        },
      })
      .subscribe((chunk) => {
        if (accessFn(chunk).length) {
          setChunks((prevChunks) => {
            const newArray = [...prevChunks]
            newArray[index] = chunk
            return newArray
          })
        }
        setFetching(false)
      })
  }

  useEffect(() => {
    fetchChunk()
  }, [sort])

  return (
    <div style={{ height: '100svh' }}>
      <Table
        data={data}
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
                {prettyNumber(row?.size ?? 0, 'number-bytes').toUpperCase()}
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
            header: () =>
              !!select?.length && (
                <Menu>
                  <Menu.Trigger>
                    <div style={{ display: 'flex', marginLeft: 'auto' }}>
                      <IconButton size="small" icon="more-vertical" />
                    </div>
                  </Menu.Trigger>
                  <Menu.Items>
                    <Menu.Item leadIcon="delete" color="red">
                      Delete {select?.length ?? 0} files
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ),
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
                  <Menu.Item leadIcon="delete" color="red">
                    Delete file
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ),
          },
        ]}
        sort={sort}
        onSortChange={(value) => {
          setSort(value)
          setFetching(false)
          setChunks([])
        }}
        select={select}
        onSelectChange={setSelect}
        onScrolledToBottom={fetchChunk}
      />
    </div>
  )
}
