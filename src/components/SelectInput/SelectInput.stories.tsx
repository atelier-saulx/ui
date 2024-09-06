import React, { useState } from 'react'
import { SelectInput } from './index.js'
import { Text } from '../Text/index.js'
import { Avatar } from '../Avatar/index.js'
import { Badge } from '../Badge/index.js'

export default {
  title: 'SelectInput',
  component: SelectInput,
}

export const String = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      options={[
        { label: 'Automatic', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ]}
      placeholder="Placeholder"
    />
  )
}

export const StringWithLeadIcon = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      leadIcon="sort"
      options={[
        { label: 'Automatic', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ]}
      placeholder="Placeholder"
    />
  )
}

export const CustomLabelBadge = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      options={[
        {
          label: (
            <Badge color="green-subtle" leadIcon="settings">
              Live
            </Badge>
          ),
          value: 'live',
          labelFilterText: 'Live',
        },
        {
          label: (
            <Badge color="blue-subtle" leadIcon="date">
              Scheduled
            </Badge>
          ),
          value: 'scheduled',
          labelFilterText: 'Scheduled',
        },
        {
          label: (
            <Badge color="red-subtle" leadIcon="close">
              Canceled
            </Badge>
          ),
          value: 'canceled',
          labelFilterText: 'Canceled',
        },
      ]}
      placeholder="Placeholder"
    />
  )
}

export const FilterableCustomLabelAvatar = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      filterable
      value={value}
      onChange={setValue}
      options={[
        {
          label: (
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
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
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
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
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
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
      ]}
      placeholder="Assignee"
    />
  )
}

export const Error = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      error
      value={value}
      onChange={setValue}
      options={[
        { label: 'Automatic', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ]}
      placeholder="Placeholder"
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState<string>()
  return (
    <SelectInput
      value={value}
      onChange={setValue}
      disabled
      options={[
        { label: 'Automatic', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ]}
      placeholder="Placeholder"
    />
  )
}
