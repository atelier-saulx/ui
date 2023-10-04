import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Button,
  Dropdown,
  IconDelete,
  IconEdit,
  IconMoreVertical,
  Input,
  Modal,
  NewTable,
} from '../../src'
import { ComponentDef } from '../types'
import { useClient } from '@based/react'
import { CloseObserve } from '@based/client/dist/types'

type UseInfiniteQueryProps = {
  queryFn: (offset: number) => any
  accessFn: (data: any) => any
}

function useInfiniteQuery({ queryFn, accessFn }: UseInfiniteQueryProps) {
  const client = useClient()
  const subscriptions = useRef<CloseObserve[]>([])
  const fetchingMore = useRef(false)
  const [data, setData] = useState<any[]>([])
  const flatData = useMemo(
    () => data.flatMap((e) => (e ? accessFn(e) : [])),
    [data, accessFn]
  )

  const fetchMore = useCallback(() => {
    if (!fetchingMore.current) {
      fetchingMore.current = true

      const index = subscriptions.current.length

      subscriptions.current[index] = client
        .query('db', queryFn(flatData.length))
        .subscribe((chunk) => {
          const newData = [...data]
          newData[index] = chunk

          setData(newData)

          fetchingMore.current = false
        })
    }
  }, [flatData.length])

  useEffect(() => {
    fetchMore()

    return () => {
      for (const unsubscribe of subscriptions.current) {
        unsubscribe()
      }
    }
  }, [])

  return { data: flatData, fetchMore }
}

const example: ComponentDef = {
  name: 'NewTable',
  component: NewTable,
  description: 'Infinite scrollable virtualized table with rich content',
  properties: {},
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [open, setOpen] = useState<string | null>(null)

        const { data, fetchMore } = useInfiniteQuery({
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
              height: 500,
            }}
          >
            <NewTable
              data={data}
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
                  id: 'extras',
                  header: '',
                  accessor: 'id',
                  cell: (value) => (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <Dropdown.Root>
                        <Dropdown.Trigger>
                          <Button ghost icon={<IconMoreVertical />} />
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
                    </div>
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
