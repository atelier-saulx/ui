import React from 'react'
import { Button, Input, Modal, SidePanel } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'FileInput',
  component: Input,
  description: 'Single file input',
  properties: {},
  examples: [
    {
      props: {
        type: 'file',
        label: 'Avatar',
        onChange: (value) => {
          // console.log(value)
        },
      },
    },
    // {
    //   props: {
    //     type: 'file',
    //     label: 'Avatar',
    //     onChange: (value) => {
    //       console.log(value)
    //     },
    //   },
    //   customRenderer: (props) => {
    //     return (
    //       <SidePanel.Root>
    //         <SidePanel.Trigger>
    //           <Button>open</Button>
    //         </SidePanel.Trigger>
    //         <SidePanel.Content>
    //           <SidePanel.Body>
    //             <Input {...props} />
    //           </SidePanel.Body>
    //           <SidePanel.Actions />
    //         </SidePanel.Content>
    //       </SidePanel.Root>
    //     )
    //   },
    // },
  ],
}

export default example
