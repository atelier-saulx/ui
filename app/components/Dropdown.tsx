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
