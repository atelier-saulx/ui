import React, { useEffect, useState } from 'react'
import { Finder } from './index.js'
import { useToast } from '../Toast/index.js'
import { Badge } from '../Badge/index.js'
import { Text } from '../Text/index.js'
import { prettyDate } from '@based/pretty-date'
import { prettyNumber } from '@based/pretty-number'

export default {
  title: 'Finder (WIP)',
  component: Finder,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => {
  const toast = useToast()

  return (
    <div style={{ height: '100svh' }}>
      <Finder
        defaultView="grid"
        title="Media library"
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
              //    TODO get sort here somehow
              //   ...(sort && {
              //     $sort: { $field: sort.key, $order: sort.direction },
              //   }),
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
          {
            key: 'src',
            title: 'Preview',
            type: 'image',
          },
          { key: 'name', title: 'Name' },
          {
            key: 'statusText',
            title: 'Status',
            type: 'badge',
          },
          {
            key: 'size',
            title: 'Size',
            type: 'number-bytes',
          },
          {
            key: 'createdAt',
            title: 'Created At',
            type: 'date-time-human',
          },
        ]}
        onItemClick={(item) => {
          toast(`clicked item: ${item.id}`)
        }}
        itemActions={[
          {
            label: 'Open in new tab',
            icon: 'external',
            onClick: (item) => toast(`open in new tab: ${item.id}`),
          },
          {
            label: 'Delete',
            color: 'red',
            icon: 'delete',
            onClick: (item) => toast(`delete: ${item.id}`),
          },
        ]}
      />
    </div>
  )
}
