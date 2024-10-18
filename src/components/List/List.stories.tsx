import React, { useState } from 'react'
import { List } from './index.js'
import {
  randAirportCode,
  randAvatar,
  randEmail,
  randFullName,
  randPastDate,
  randStatus,
  randUuid,
} from '@ngneat/falso'
import { Select } from '../../utils/common.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { useToast } from '../Toast/index.js'

// TODO add a date, a byte and an image field too
const TEST_DATA = Array.from({ length: 50 }).map((_, index) => ({
  id: randUuid(),
  name: randFullName(),
  email: randEmail(),
  status: randStatus(),
}))

export default {
  title: 'List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Regular = () => {
  const toast = useToast()
  const [select, setSelect] = useState<Select>()

  return (
    <div style={{ height: '100svh' }}>
      <ScrollArea style={{ padding: 32 }}>
        <List
          data={TEST_DATA}
          select={select}
          onSelectChange={setSelect}
          collapsible
          fields={[
            {
              key: 'name',
            },
            {
              key: 'email',
            },
            {
              key: 'status',
              type: 'badge',
            },
          ]}
          onItemClick={(item) => {
            toast(`clicked item ${item.id}`)
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
      </ScrollArea>
    </div>
  )
}

export const FixedHeight = () => {
  const toast = useToast()
  const [select, setSelect] = useState<Select>()

  return (
    <div style={{ padding: 32, height: 250 }}>
      <List
        data={TEST_DATA}
        select={select}
        onSelectChange={setSelect}
        fields={[
          {
            key: 'name',
          },
          {
            key: 'email',
          },
          {
            key: 'status',
            type: 'badge',
          },
        ]}
        onItemClick={(item) => {
          toast(`clicked item ${item.id}`)
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

export const WithTitle = () => {
  const toast = useToast()
  const [select, setSelect] = useState<Select>()

  return (
    <div style={{ height: '100svh' }}>
      <ScrollArea style={{ padding: 32 }}>
        <List
          title="Members"
          data={TEST_DATA}
          select={select}
          onSelectChange={setSelect}
          collapsible
          fields={[
            {
              key: 'name',
            },
            {
              key: 'email',
            },
            {
              key: 'status',
              type: 'badge',
            },
          ]}
          onItemClick={(item) => {
            toast(`clicked item ${item.id}`)
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
      </ScrollArea>
    </div>
  )
}
