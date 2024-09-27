import React, { useState } from 'react'
import { BasedGrid, Grid, GridSelect, VirtualizedGrid } from './index.js'
import {
  randAirportCode,
  randEmail,
  randFullName,
  randImg,
} from '@ngneat/falso'

export default {
  title: 'Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
}

const TEST_DATA = Array.from({ length: 250 }).map((_, index) => ({
  id: index,
  name: randFullName(),
  email: randEmail(),
  airport: randAirportCode(),
  image:
    'https://files-production-saulx-based-ui-prod-en-dlsv-p8x0.based.dev/fi4da0cfae/a8e819ce-abe0-4e8e-8a62-63251cbfc614-0a5ddc09-3542-4d07-958f-44806cdba1ae-3c23619d-e3f6-4f15-8b75-6134065360b1.png',
}))

export const Regular = () => {
  const [select, setSelect] = useState<GridSelect>()
  return (
    <div style={{ height: '100svh' }}>
      <Grid
        data={TEST_DATA}
        fields={[
          {
            key: 'image',
            type: 'image',
          },
          {
            key: 'name',
            type: 'title',
          },
          {
            key: 'email',
            type: 'description',
          },
          {
            key: 'airport',
            type: 'description',
          },
        ]}
      />
    </div>
  )
}

export const Virtualized = () => {
  const [select, setSelect] = useState<GridSelect>()

  return (
    <div style={{ height: '100svh' }}>
      <VirtualizedGrid
        data={TEST_DATA}
        fields={[
          {
            key: 'image',
            type: 'image',
          },
          {
            key: 'name',
            type: 'title',
          },
          {
            key: 'email',
            type: 'description',
          },
          {
            key: 'airport',
            type: 'description',
          },
        ]}
      />
    </div>
  )
}

export const Based = () => {
  const [select, setSelect] = useState<GridSelect>()

  return (
    <div style={{ height: '100svh' }}>
      <BasedGrid
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
          {
            key: 'src',
            type: 'image',
          },
          {
            key: 'name',
            type: 'title',
          },
          {
            key: 'size',
            type: 'description',
          },
          {
            key: 'statusText',
            type: 'description',
          },
        ]}
      />
    </div>
  )
}
