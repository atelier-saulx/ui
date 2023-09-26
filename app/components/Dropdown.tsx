import React from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import {
  Button,
  IconMoreVertical,
  Dropdown,
  IconCopy,
  IconFullscreen,
  IconOpenInNew,
  IconSortAsc,
  IconDelete,
} from '../../src'

const example: ComponentDef = {
  name: 'Dropdown',
  properties: props.props.DropDownProps.props,
  description: '',
  component: Dropdown.Root,
  examples: [
    {
      props: {},
      customRenderer: () => {
        return (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button ghost icon={<IconMoreVertical />} />
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconFullscreen />}>
                Full screen
              </Dropdown.Item>
              <Dropdown.Sub>
                <Dropdown.SubTrigger icon={<IconSortAsc />}>
                  Sort
                </Dropdown.SubTrigger>
                <Dropdown.SubItems>
                  <Dropdown.Item>Alphabetical</Dropdown.Item>
                  <Dropdown.Item>Reverse alphabetical</Dropdown.Item>
                </Dropdown.SubItems>
              </Dropdown.Sub>
              <Dropdown.Item icon={<IconOpenInNew />}>
                Open in new tab
              </Dropdown.Item>
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
