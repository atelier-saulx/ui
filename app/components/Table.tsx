import React, { useState } from 'react'
import {
  Button,
  ConfirmModal,
  Dropdown,
  IconDelete,
  IconEdit,
  IconMoreHorizontal,
  Input,
  Modal,
  Table,
  Text,
  Thumbnail,
  useInfiniteQuery,
} from '../../src'
import { ComponentDef } from '../types'
import { faker } from '@faker-js/faker'
import props from '../props.json'

// move to based/react

const example: ComponentDef = {
  name: 'Table',
  component: Table,
  description: '',
  properties: props.props.TableProps.props,
  examples: [
    {
      name: 'Header, no border, no virtualization',
      props: { header: true, virtualized: false },
      customRenderer: ({ header, virtualized }) => {
        const [data] = useState(() =>
          new Array(6).fill(null).map(() => ({
            id: faker.datatype.uuid().slice(0, 8),
            logo: faker.image.avatar(),
            name: faker.person.fullName(),
            status: faker.lorem.words(1),
            avatar: faker.internet.emoji(),
            createdAt: faker.date.anytime().getTime(),
            price: Math.random() * 1e4,
          }))
        )

        return (
          <div style={{ width: 900 }}>
            <Table
              header={header}
              virtualized={virtualized}
              data={data}
              rowAction={(row) => (
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <Button ghost icon={<IconMoreHorizontal />} />
                  </Dropdown.Trigger>
                  <Dropdown.Items>
                    <Dropdown.Item icon={<IconEdit />}>Edit</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
                  </Dropdown.Items>
                </Dropdown.Root>
              )}
            />
          </div>
        )
      },
    },
    {
      name: 'No header, no border, no virtualization',
      description: 'No header',
      props: { header: false, virtualized: false },
      customRenderer: ({ header, virtualized }) => {
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
            <Table
              header={header}
              virtualized={virtualized}
              data={data}
              rowAction={(row) => (
                <ConfirmModal onCancel={() => {}} onConfirm={() => {}}>
                  <Button ghost icon={<IconDelete />} />
                </ConfirmModal>
              )}
            />
          </div>
        )
      },
    },
    {
      name: 'Virtualized, sticky header, no border',
      props: { header: 'sticky', virtualized: true },
      customRenderer: ({ header, virtualized }) => {
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
            <Table
              header={header}
              virtualized={virtualized}
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
                  align: 'end',
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
    {
      name: 'Header, border, no virtualization',
      props: { header: true, virtualized: false, border: true },
      customRenderer: ({ header, virtualized, border }) => {
        const [data] = useState(() =>
          new Array(6).fill(null).map(() => ({
            id: faker.datatype.uuid().slice(0, 8),
            logo: faker.image.avatar(),
            name: faker.person.fullName(),
            status: faker.lorem.words(1),
            avatar: faker.internet.emoji(),
            createdAt: faker.date.anytime().getTime(),
            price: Math.random() * 1e4,
          }))
        )

        return (
          <div style={{ width: 900 }}>
            <Table
              header={header}
              virtualized={virtualized}
              border={border}
              data={data}
            />
          </div>
        )
      },
    },
  ],
}

export default example
