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
  useInfiniteQuery,
} from '../../src'
import { ComponentDef } from '../types'
import { useQuery } from '@based/react'

const example: ComponentDef = {
  name: 'NewTable',
  component: NewTable,
  description: 'Virtualized, infinite scrollable',
  properties: {},
  examples: [
    {
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
              width: '100%',
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
                { header: 'ID', accessor: 'id' },
                { header: 'Name', accessor: 'name' },
                {
                  header: 'Type',
                  accessor: 'type',
                  cell: (value) => <Badge light>{value}</Badge>,
                },
                {
                  header: 'Created',
                  accessor: 'createdAt',
                  cell: (value) => <div>{new Date(value).toISOString()}</div>,
                },
                {
                  header: 'More',
                  accessor: 'id',
                  cell: (value) => (
                    <Dropdown.Root>
                      <Dropdown.Trigger>
                        <Button ghost icon={<IconMoreHorizontal />} />
                      </Dropdown.Trigger>
                      <Dropdown.Items>
                        <Dropdown.Item
                          onClick={() => {
                            setOpen(value)
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
      name: 'NewTable',
      description: 'Simple (non-virtualized, non-scrollable)',
      props: {},
      customRenderer: () => {
        const { data } = useQuery('db', {
          $id: 'root',
          files: {
            $all: true,
            $list: {
              $sort: { $field: 'updatedAt', $order: 'desc' },
              $limit: 6,
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
        })

        return (
          <NewTable
            data={data?.files ?? []}
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Name', accessor: 'name' },
              {
                header: 'Type',
                accessor: 'type',
                cell: (value) => <Badge light>{value}</Badge>,
              },
              {
                header: 'Created',
                accessor: 'createdAt',
                cell: (value) => <div>{new Date(value).toISOString()}</div>,
              },
            ]}
          />
        )
      },
    },
    {
      name: 'NewTable',
      description: 'Simple, no header',
      props: {},
      customRenderer: () => {
        const { data } = useQuery('db', {
          $id: 'root',
          files: {
            $all: true,
            $list: {
              $sort: { $field: 'updatedAt', $order: 'desc' },
              $limit: 6,
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
        })

        return (
          <NewTable
            data={data?.files ?? []}
            header={false}
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Name', accessor: 'name' },
              {
                header: 'Type',
                accessor: 'type',
                cell: (value) => <Badge light>{value}</Badge>,
              },
              {
                header: 'Created',
                accessor: 'createdAt',
                cell: (value) => <div>{new Date(value).toISOString()}</div>,
              },
            ]}
          />
        )
      },
    },
  ],
}

export default example
