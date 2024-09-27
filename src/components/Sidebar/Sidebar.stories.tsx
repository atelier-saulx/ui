import React, { useState } from 'react'
import { Sidebar } from './index.js'
import { Text } from '../Text/index.js'
import { Avatar } from '../Avatar/index.js'
import { styled } from 'inlines'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Menu } from '../Menu/index.js'

export default {
  title: 'Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ height: '100svh' }}>
      <Sidebar value={value} onChange={setValue}>
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
          <Sidebar.Group title="Content management">
            <Sidebar.Item value="articles" icon="columns">
              Articles
            </Sidebar.Item>
            <Sidebar.Item value="media" icon="image">
              Media library
            </Sidebar.Item>
          </Sidebar.Group>
          <Sidebar.Group title="Content management">
            <Sidebar.Item value="articles" icon="columns">
              Articles
            </Sidebar.Item>
            <Sidebar.Item value="media" icon="image">
              Media library
            </Sidebar.Item>
            <Sidebar.Item value="articles" icon="columns">
              Articles
            </Sidebar.Item>
            <Sidebar.Item value="media" icon="image">
              Media library
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
  )
}
