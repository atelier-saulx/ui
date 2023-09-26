import React, { useState } from 'react'
import props from '../props.json'
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
        const [sort, setSort] = useState('ascending')

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
            </Dropdown.Items>
          </Dropdown.Root>
        )
      },
    },
  ],
}

export default example
