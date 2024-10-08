import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BasedTable, Table, VirtualizedTable } from './index.js'
import { Badge } from '../Badge/index.js'
import { Menu } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { Text } from '../Text/index.js'
import {
  randAirportCode,
  randEmail,
  randFullName,
  randImg,
} from '@ngneat/falso'
import { Select, Sort } from '../../utils/common.js'
import { useToast } from '../Toast/index.js'

export default {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
}

const TEST_DATA = Array.from({ length: 250 }).map((_, index) => ({
  id: index,
  name: randFullName(),
  email: randEmail(),
  airport: randAirportCode(),
  image: randImg(),
}))

export const Regular = () => {
  const [sort, setSort] = useState<Sort>()
  const [select, setSelect] = useState<Select>()
  const toast = useToast()

  return (
    <div style={{ height: '100svh' }}>
      <Table
        fields={[
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          {
            key: 'image',
            title: 'image',
            render: (row) => (
              <img style={{ height: 24, width: 24 }} src={row.image} />
            ),
          },
          {
            key: 'airport',
            title: 'Airport',
            render: (row) => (
              <Badge leadIcon="home" color="green-subtle">
                {row.airport}
              </Badge>
            ),
          },
          {
            key: 'action',
            title: () =>
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
            render: (row, opts) => (
              <Menu
                onOpenChange={(open) => {
                  opts?.setForceHover(open ? row.id : undefined)
                }}
              >
                <Menu.Trigger>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    style={{ display: 'flex', marginLeft: 'auto' }}
                  >
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
        data={TEST_DATA}
        sort={sort}
        onSortChange={setSort}
        select={select}
        onSelectChange={setSelect}
        onItemClick={(item) => {
          toast(`clicked item ${item.id}`)
        }}
      />
    </div>
  )
}

export const Virtualized = () => {
  return (
    <div style={{ height: '100svh' }}>
      <VirtualizedTable
        fields={[
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          {
            key: 'image',
            title: 'image',
            render: (row) => (
              <img style={{ height: 24, width: 24 }} src={row.image} />
            ),
          },
          {
            key: 'airport',
            title: 'Airport',
            render: (row) => (
              <Badge leadIcon="home" color="green-subtle">
                {row.airport}
              </Badge>
            ),
          },
          {
            key: 'action',
            title: () => null,
            render: (row, opts) => (
              <Menu
                onOpenChange={(open) => {
                  opts?.setForceHover(open ? row.id : undefined)
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
        data={TEST_DATA}
      />
    </div>
  )
}

export const Based = () => {
  const [sort, setSort] = useState<Sort>()
  const [select, setSelect] = useState<Select>()

  return (
    <div style={{ height: '100svh' }}>
      <BasedTable
        query={({ limit, offset }) => ({
          files: {
            $all: true,
            $list: {
              $limit: limit,
              $offset: offset,
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
        })}
        transformQueryResult={(data) => data?.files}
        totalQuery={() => ({
          total: {
            $aggregate: {
              $function: 'count',
              $traverse: 'children',
              $filter: [
                {
                  $field: 'type',
                  $operator: '=',
                  $value: 'file',
                },
              ],
            },
          },
        })}
        fields={[
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Name' },
          {
            key: 'image',
            title: 'Preview',
            render: (row) => (
              <img style={{ height: 24, width: 24 }} src={row.src} />
            ),
          },
          {
            key: 'statusText',
            title: 'Status',
            render: (row) => (
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
            title: 'Size',
            render: (row) => (
              <Text variant="display-medium" color="neutral80" singleLine>
                {prettyNumber(row?.size ?? 0, 'number-bytes').toUpperCase()}
              </Text>
            ),
          },
          {
            key: 'createdAt',
            title: 'Created At',
            render: (row) => (
              <Text variant="display-medium" color="neutral80" singleLine>
                {prettyDate(row.createdAt, 'date-time-human')}
              </Text>
            ),
          },
          {
            key: 'action',
            title: () =>
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
            render: (row, opts) => (
              <Menu
                onOpenChange={(open) => {
                  opts?.setForceHover(open ? row.id : undefined)
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
        onSortChange={setSort}
        select={select}
        onSelectChange={setSelect}
      />
    </div>
  )
}
