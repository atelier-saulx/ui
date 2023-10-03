import React, { useEffect, useState } from 'react'
import { ComponentDef } from '../types'
import {
  Button,
  IconMoreVertical,
  Dropdown,
  IconCopy,
  IconFullscreen,
  IconOpenInNew,
  IconDelete,
  IconSortDesc,
  IconApps,
  Tooltip,
  Modal,
  Input,
} from '../../src'

const example: ComponentDef = {
  name: 'Dropdown',
  properties: {},
  description: '',
  component: Dropdown.Root,
  examples: [
    {
      props: {},
      customRenderer: () => {
        const [sort, setSort] = useState('ascending')

        return (
          <Dropdown.Root>
            <Tooltip text="tooltip text">
              <Dropdown.Trigger>
                <Button color="system" icon={<IconMoreVertical />} />
              </Dropdown.Trigger>
            </Tooltip>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Sub>
                <Dropdown.SubTrigger icon={<IconSortDesc />}>
                  Sort
                </Dropdown.SubTrigger>
                <Dropdown.SubItems>
                  <Dropdown.RadioItems value={sort} onChange={setSort}>
                    <Dropdown.RadioItem value="none">
                      No sorting
                    </Dropdown.RadioItem>

                    <Dropdown.Separator />

                    <Dropdown.RadioItem value="ascending">
                      Alphabetical
                    </Dropdown.RadioItem>
                    <Dropdown.RadioItem value="descending">
                      Reverse alphabetical
                    </Dropdown.RadioItem>
                  </Dropdown.RadioItems>
                </Dropdown.SubItems>
              </Dropdown.Sub>
              <Dropdown.Sub>
                <Dropdown.SubTrigger icon={<IconOpenInNew />}>
                  Triple nest why not
                </Dropdown.SubTrigger>
                <Dropdown.SubItems>
                  <Dropdown.Sub>
                    <Dropdown.SubTrigger>Open me too</Dropdown.SubTrigger>
                    <Dropdown.SubItems>
                      <Dropdown.Item>Hello there</Dropdown.Item>
                    </Dropdown.SubItems>
                  </Dropdown.Sub>
                </Dropdown.SubItems>
              </Dropdown.Sub>
              <Dropdown.Separator />
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )
      },
    },
    {
      name: 'Opening a dialog from a dropdown',
      description: `We are using a controlled Modal in this case and updating the open prop via a dropdown item's onClick`,
      props: {},
      customRenderer: () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <Button color="system" icon={<IconMoreVertical />} />
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Open modal
                </Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>

            <Modal.Root open={open} onOpenChange={setOpen}>
              <Modal.Content>
                <Modal.Title>Title of modal</Modal.Title>
                <Modal.Description>Description of modal</Modal.Description>
                <Modal.Body>
                  <div style={{ display: 'grid', gap: 24 }}>
                    <Input
                      type="text"
                      label="Name of company"
                      defaultValue="Apex"
                    />
                    <Input
                      label="Type of company"
                      type="select"
                      defaultValue="value2"
                      options={[
                        { label: 'Item one', value: 'value1' },
                        { label: 'Item two', value: 'value2' },
                        { label: 'Item three', value: 'value3' },
                      ]}
                    />
                  </div>
                </Modal.Body>
                <Modal.Actions>
                  <Button
                    onClick={() => {
                      setOpen(false)
                    }}
                    color="system"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false)
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
      name: 'Async',
      props: {},
      customRenderer: () => {
        const MOCK_DB = {
          ab: {
            name: 'some one',
          },
          abc: {
            name: 'some two',
          },
          abcd: {
            name: 'some three',
          },
          abcde: {
            name: 'some four',
          },
        }
        const [userIds, setUserIds] = useState<null | string[]>(null)

        useEffect(() => {
          setTimeout(() => {
            setUserIds(Object.keys(MOCK_DB))
          }, 3000)
        }, [])

        function UserDropdownItem({ id }: any) {
          const [user, setUser] = useState<null | { name: string }>(null)

          useEffect(() => {
            setTimeout(() => {
              setUser(MOCK_DB[id])
            }, Math.random() * 2000)
          }, [])

          return (
            <Dropdown.Item disabled={!user}>
              {user ? user.name : '...'}
            </Dropdown.Item>
          )
        }

        return (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button color="system" icon={<IconMoreVertical />} />
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Sub>
                <Dropdown.SubTrigger icon={<IconApps />}>
                  Project
                </Dropdown.SubTrigger>
                <Dropdown.SubItems>
                  {userIds ? (
                    userIds.map((id) => <UserDropdownItem key={id} id={id} />)
                  ) : (
                    <Dropdown.Item disabled>Loading projects...</Dropdown.Item>
                  )}
                </Dropdown.SubItems>
              </Dropdown.Sub>
              <Dropdown.Separator />
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )
      },
    },
  ],
}

export default example
