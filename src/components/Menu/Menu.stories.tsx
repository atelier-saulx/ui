import React, { useState } from 'react'
import { Menu } from './index.js'
import { Button } from '../Button/index.js'

export default {
  title: 'Menu',
  component: () => {},
}

export const Default = () => {
  const [rowHeight, setRowHeight] = useState('short')
  const [visibleFields, setVisibleFields] = useState(['name'])
  const [view, setView] = useState('table')

  return (
    <Menu>
      <Menu.Trigger>
        {({ open }) => (
          <Button
            variant="border"
            trailIcon={open ? 'chevron-up' : 'chevron-down'}
          >
            Sample menu
          </Button>
        )}
      </Menu.Trigger>
      <Menu.Items>
        <Menu.OptionCardGroup
          value={view}
          onChange={setView}
          options={[
            { label: 'Table', value: 'table', icon: 'sheet' },
            { label: 'Gallery', value: 'gallery', icon: 'gallery' },
          ]}
        />
        <Menu.Header>Row height</Menu.Header>
        <Menu.ToggleItem
          value={rowHeight === 'short'}
          onChange={() => {
            setRowHeight('short')
          }}
        >
          Short
        </Menu.ToggleItem>
        <Menu.ToggleItem
          value={rowHeight === 'tall'}
          onChange={() => {
            setRowHeight('tall')
          }}
        >
          Tall
        </Menu.ToggleItem>
        <Menu.Separator />
        <Menu>
          <Menu.TriggerItem leadIcon="columns">Visible fields</Menu.TriggerItem>
          <Menu.Items>
            <Menu.Header>Visible fields</Menu.Header>
            <Menu.ToggleItem value={true} disabled>
              ID
            </Menu.ToggleItem>
            <Menu.ToggleItem
              value={visibleFields.includes('name')}
              onChange={() => {
                setVisibleFields((p) =>
                  p.includes('name')
                    ? p.filter((e) => e !== 'name')
                    : [...p, 'name'],
                )
              }}
            >
              Name
            </Menu.ToggleItem>
            <Menu.ToggleItem
              value={visibleFields.includes('country')}
              onChange={() => {
                setVisibleFields((p) =>
                  p.includes('country')
                    ? p.filter((e) => e !== 'country')
                    : [...p, 'country'],
                )
              }}
            >
              Country
            </Menu.ToggleItem>
            <Menu.Separator />
            <Menu.Item
              leadIcon="show"
              onClick={() => {
                setVisibleFields(['name', 'country'])
              }}
            >
              Show all
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <Menu.Separator />
        <Menu.Item
          leadIcon="revert"
          onClick={() => {
            setRowHeight('short')
            setVisibleFields(['name'])
            setView('table')
          }}
        >
          Reset view
        </Menu.Item>
        <Menu.Item leadIcon="delete" color="red">
          Delete view
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
