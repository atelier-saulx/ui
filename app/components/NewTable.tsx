import React, { useState } from 'react'
import {
  Badge,
  Button,
  Dropdown,
  IconDelete,
  IconEdit,
  IconMoreHorizontal,
  Input,
  Modal,
  NewTable,
  Text,
  Thumbnail,
  useInfiniteQuery,
} from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'

const example: ComponentDef = {
  name: 'NewTable',
  component: NewTable,
  description: '',
  properties: {},
  examples: [
    {
      name: 'Simple',
      description: 'Non-virtualized, non-scrollable',
      props: {},
      customRenderer: () => {
        const [data] = useState(() =>
          new Array(6).fill(null).map(() => ({
            logo: faker.image.avatar(),
            name: faker.person.fullName(),
            status: faker.lorem.words(1),
            avatar: faker.internet.emoji(),
            id: faker.datatype.uuid().slice(0, 8),
            createdAt: faker.date.anytime().getTime(),
            price: Math.random() * 1e4,
          }))
        )

        return (
          <div style={{ width: 900 }}>
            <NewTable
              columns={[
                {
                  key: 'id',
                  renderAs: 'badge',
                  header: 'ID',
                },
                {
                  key: 'logo',
                  renderAs: 'image',
                  header: 'Logo',
                },
                {
                  key: 'name',
                  renderAs: 'medium',
                  header: 'Name',
                },
                {
                  key: 'status',
                  renderAs: (row) => (
                    <Thumbnail size="small" label={row.status} />
                  ),
                  header: 'Status',
                },
                {
                  key: 'avatar',
                  renderAs: 'avatar',
                  header: 'Avatar',
                },
                {
                  key: 'price',
                  renderAs: 'number-euro',
                  header: 'Price',
                },
                {
                  key: 'createdAt',
                  renderAs: 'date-time-human',
                  header: 'Created At',
                },
              ]}
              data={data}
            />
          </div>
        )
      },
    },
    {
      name: 'Almost like a list',
      description: 'No header',
      props: {},
      customRenderer: () => {
        const [data] = useState(() =>
          new Array(6).fill(null).map(() => ({
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
            tag: faker.lorem.words(1),
            role: faker.lorem.words(1),
            createdAt: faker.date.anytime().getTime(),
          }))
        )

        return (
          <div style={{ width: 900 }}>
            <NewTable
              header={false}
              columns={[
                {
                  key: 'name',
                  renderAs: (row) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <Thumbnail
                        color="neutral"
                        size="small"
                        src={row.avatar}
                      />
                      <Text weight="medium">{row.name}</Text>
                    </div>
                  ),
                  header: 'Name',
                },
                {
                  key: 'tag',
                  renderAs: 'badge',
                  header: 'Tag',
                },
                {
                  key: 'createdAt',
                  renderAs: 'date-time-human',
                  header: 'Created at',
                },
                {
                  id: 'actions',
                  renderAs: (row) => (
                    <Dropdown.Root>
                      <Dropdown.Trigger>
                        <Button ghost icon={<IconMoreHorizontal />} />
                      </Dropdown.Trigger>
                      <Dropdown.Items>
                        <Dropdown.Item icon={<IconEdit />}>Edit</Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item icon={<IconDelete />}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Items>
                    </Dropdown.Root>
                  ),
                },
              ]}
              data={data}
            />
          </div>
        )
      },
    },
    {
      name: 'Virtualized',
      description: 'Virtualized, infinite scrollable',
      props: {},
      customRenderer: () => {
        const [open, setOpen] = useState<string | null>(null)

        const { data, fetchMore, setVisibleElements } = useInfiniteQuery({
          accessFn: (data) => data.files,
          queryFn: (offset) => ({
            $id: 'root',
            files: {
              $all: true,
              $list: {
                $sort: { $field: 'updatedAt', $order: 'desc' },
                $offset: offset,
                $limit: 25,
                $find: {
                  $traverse: 'children',
                  $filter: {
                    $operator: '=',
                    $field: 'type',
                    $value: 'todo',
                  },
                },
              },
            },
          }),
        })

        return (
          <div
            style={{
              width: 900,
              height: 500,
            }}
          >
            <NewTable
              virtualized
              data={data}
              onVisibleElementsChange={setVisibleElements}
              onScrollToBottom={() => {
                fetchMore()
              }}
              columns={[
                { header: 'ID', key: 'id' },
                { header: 'Name', key: 'name' },
                {
                  header: 'Type',
                  key: 'type',
                  renderAs: 'badge',
                },
                {
                  header: 'Created',
                  key: 'createdAt',
                  renderAs: 'date',
                },
                {
                  id: 'actions',
                  header: 'More',
                  renderAs: (row) => (
                    <Dropdown.Root>
                      <Dropdown.Trigger>
                        <Button ghost icon={<IconMoreHorizontal />} />
                      </Dropdown.Trigger>
                      <Dropdown.Items>
                        <Dropdown.Item
                          onClick={() => {
                            setOpen(row.id)
                          }}
                          icon={<IconEdit />}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item icon={<IconDelete />}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Items>
                    </Dropdown.Root>
                  ),
                },
              ]}
            />

            <Modal.Root
              open={!!open}
              onOpenChange={() => {
                setOpen(null)
              }}
            >
              <Modal.Content>
                <Modal.Title>{`Editing item with ID: ${open}`}</Modal.Title>
                <Modal.Description>Description of modal</Modal.Description>
                <Modal.Body>
                  <div style={{ display: 'grid', gap: 24 }}>
                    <Input
                      type="text"
                      defaultValue={data.find((e) => e.id === open)?.name}
                      label="Name"
                    />
                    <Input
                      type="select"
                      defaultValue={data.find((e) => e.id === open)?.type}
                      label="Status"
                      options={[
                        { label: 'To do', value: 'todo' },
                        { label: 'Done', value: 'done' },
                      ]}
                    />
                  </div>
                </Modal.Body>
                <Modal.Actions>
                  <Button
                    onClick={() => {
                      setOpen(null)
                    }}
                    color="system"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(null)
                    }}
                    color="primary"
                  >
                    Save
                  </Button>
                </Modal.Actions>
              </Modal.Content>
            </Modal.Root>
          </div>
        )
      },
    },
  ],
}

export default example
