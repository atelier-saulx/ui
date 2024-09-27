import React, { useState } from 'react'
import {
  Button,
  Modal,
  Form,
  Avatar,
  Text,
  Sidebar,
  Menu,
  colors,
  radius,
  IconButton,
  BasedTable,
  Badge,
  TableSort,
  TableSelect,
  AppHeader,
  BasedGrid,
} from '../index.js'
import { styled } from 'inlines'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { useQuery } from '@based/react'

export default {
  title: 'Patterns',
  component: () => {},
  parameters: {
    layout: 'fullscreen',
  },
}

// TODO actually use based for the data, form submits  etc.
// TODO this could be a good candidate for a HoC: `FormModal` -> takes title, description, buttonLabels, fields, validation onsubmit but not much else i guess.
export function FormInModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        leadIcon="add"
        onClick={() => {
          setOpen(true)
        }}
      >
        Add article
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Title>Add task</Modal.Title>
        <Modal.Description>
          Add a beautiful little task here that someone will have to do
        </Modal.Description>
        <Form
          fields={{
            title: { type: 'text', label: 'Title' },
            description: { type: 'textarea', label: 'Description' },
            assignee: {
              type: 'select',
              label: 'Assignee',
              filterable: true,
              options: [
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/2bd65f8b-2f43-4b01-95fb-170bdd1a1280/368af3c7-dc76-4729-a5a6-3809399c312a"
                      />
                      <Text variant="display-medium" color="inherit">
                        Bence
                      </Text>
                    </div>
                  ),
                  value: 'bence',
                  labelFilterText: 'Bence',
                },
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/d14d4591-6cc5-4afc-8c47-c384475b5de2/16cd9278-4497-41fa-8ec2-5de1dfc2c5ad"
                      />
                      <Text variant="display-medium" color="inherit">
                        Sandor
                      </Text>
                    </div>
                  ),
                  value: 'sandor',
                  labelFilterText: 'Sandor',
                },
                {
                  label: (
                    <div
                      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                    >
                      <Avatar
                        size="small"
                        src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/41852f88-0893-4ae8-9226-8e408e509d72/fbab7a12-7958-4183-babe-bdfd4a70d56e"
                      />
                      <Text variant="display-medium" color="inherit">
                        Victor
                      </Text>
                    </div>
                  ),
                  value: 'victor',
                  labelFilterText: 'Victor',
                },
              ],
            },
            dueDate: {
              type: 'datetime',
              label: 'DateTime',
              variant: 'date-time',
            },
          }}
          validate={async (values) => {
            const errors = {}

            await new Promise((resolve) => {
              setTimeout(() => {
                resolve('foo')
              }, 2000)
            })

            if (!values['title']) {
              errors['title'] = 'title is required'
            }

            return errors
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve('foo')
              }, 2000)
            })

            console.log(
              'form submitted with',
              JSON.parse(JSON.stringify(values)),
            )

            setOpen(false)
          }}
        >
          {({ isSubmitting, isDirty, submitForm }) => (
            <>
              <Modal.Body>
                <Form.Fields />
              </Modal.Body>
              <Modal.Actions>
                {({ close }) => (
                  <>
                    <Button
                      onClick={close}
                      disabled={isSubmitting}
                      variant="border"
                      keyHint="Esc"
                    >
                      Close
                    </Button>
                    <Button
                      keyHint="Enter"
                      disabled={isSubmitting || !isDirty}
                      loading={isSubmitting}
                      onClick={submitForm}
                    >
                      Create Todo
                    </Button>
                  </>
                )}
              </Modal.Actions>
            </>
          )}
        </Form>
      </Modal>
    </>
  )
}

export function App() {
  const [page, setPage] = useState('media')
  const [sort, setSort] = useState<TableSort>()
  const [select, setSelect] = useState<TableSelect>()
  const [view, setView] = useState('table')
  const { data: totalData } = useQuery('db', {
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
  })

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '100svh' }}>
        <Sidebar value={page} onChange={setPage}>
          <Sidebar.Header>
            <svg fill="none" viewBox="0 0 80 80" width="40" height="40">
              <path
                d="m60.822 26.3984-19.0829 19.0829h-19.0829l19.0829-19.0829z"
                fill="#4b41ff"
              ></path>
              <path
                d="m65.3125 45.481-19.0829 19.0828h-23.5734l19.0829-19.0828z"
                fill="#ff1f85"
              ></path>
              <path
                d="m41.7391 8.4375-19.0829 19.0829v17.9606l19.0829-19.0829z"
                fill="#008cff"
              ></path>
            </svg>
          </Sidebar.Header>
          <Sidebar.Items>
            <Sidebar.Group title="Content management">
              <Sidebar.Item value="articles" icon="columns">
                Articles
              </Sidebar.Item>
              <Sidebar.Item value="media" icon="image">
                Media library
              </Sidebar.Item>
            </Sidebar.Group>
            <Sidebar.Group title="Workspace">
              <Sidebar.Item value="members" icon="user">
                Members
              </Sidebar.Item>
              <Sidebar.Item value="settings" icon="settings">
                Settings
              </Sidebar.Item>
            </Sidebar.Group>
          </Sidebar.Items>
          <Sidebar.Footer>
            <Menu>
              <Menu.Trigger>
                {({ open }) => (
                  <styled.div
                    data-open={open}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '4px 8px 4px 6px',
                      margin: '0 -8px 0 -6px',
                      borderRadius: radius[8],
                      cursor: 'pointer',
                      '&:hover,&[data-open=true]': {
                        background: colors.neutral10Adjusted,
                      },
                    }}
                  >
                    <Avatar src="https://public.linear.app/9fa6f7a2-5e7d-4fb8-af60-d35ba4592b2c/d14d4591-6cc5-4afc-8c47-c384475b5de2/16cd9278-4497-41fa-8ec2-5de1dfc2c5ad" />
                    <Text variant="display-medium">Sándor Zelenka</Text>
                  </styled.div>
                )}
              </Menu.Trigger>
              <Menu.Items>
                <Menu.Item leadIcon="user">Profile</Menu.Item>
                <Menu.Item leadIcon="log-out">Logout</Menu.Item>
              </Menu.Items>
            </Menu>
          </Sidebar.Footer>
        </Sidebar>
      </div>
      <div
        style={{
          height: '100svh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppHeader>
          <AppHeader.Title>Media library</AppHeader.Title>
          <AppHeader.Right>
            <Text variant="display-regular" color="neutral60">
              {totalData?.total} files
            </Text>
            <AppHeader.Separator />
            <Button variant="ghost" leadIcon="filter">
              Filter
            </Button>
            <Button variant="ghost" leadIcon="sort">
              Sort
            </Button>
            <AppHeader.Separator />
            <IconButton
              icon="sheet"
              onClick={() => {
                setView(view === 'table' ? 'grid' : 'table')
              }}
            />
            <Button leadIcon="add">New articles</Button>
          </AppHeader.Right>
        </AppHeader>
        {view === 'table' && (
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
            columns={[
              { key: 'id', header: 'ID' },
              { key: 'name', header: 'Name' },
              {
                key: 'image',
                header: 'Preview',
                cell: (row) => (
                  <img
                    key={row.src}
                    style={{ height: 24, width: 24 }}
                    src={row.src}
                  />
                ),
              },
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
            onSortChange={setSort}
            select={select}
            onSelectChange={setSelect}
          />
        )}
        {view === 'grid' && (
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
        )}
      </div>
    </div>
  )
}
