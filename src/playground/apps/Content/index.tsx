import React, { useEffect } from 'react'
import ComponentViewer from '../../ComponentViewer'
import { itemTable, button, contentEditModal } from './views'
import { client } from '../../based'
// vi

export const Content = () => {
  // useEffect(() => {
  //   // client.call('db:set', {
  //   //   $db: 'config',
  //   //   type: 'view',
  //   //   $id: 'vitable',
  //   //   config: table,
  //   //   name: 'Files',
  //   //   category: 'data',
  //   //   hidden: false,
  //   // })
  //   client.call('db:set', {
  //     $db: 'config',
  //     type: 'view',
  //     $id: 'viitems',
  //     config: itemTable,
  //     name: 'Items',
  //     category: 'data',
  //     hidden: false,
  //   })
  //   client.call('db:set', {
  //     $db: 'config',
  //     type: 'view',
  //     $id: 'vibutton',
  //     config: button,
  //     name: 'BUTTON',
  //     category: 'dashboard',
  //     hidden: false,
  //   })
  //   client.call('db:set', {
  //     $db: 'config',
  //     type: 'view',
  //     $id: 'vimodal',
  //     config: contentEditModal,
  //     name: 'EDIT-MODAL',
  //     category: 'hidden',
  //     hidden: true,
  //   })
  //   client.call('db:set-schema', {
  //     schema: {
  //       types: {
  //         item: {
  //           fields: {
  //             name: { type: 'string' },
  //             title: { type: 'text' },
  //             picture: {
  //               type: 'reference',
  //               meta: { type: 'file', mime: 'image' },
  //             },
  //             startingPrice: { type: 'number' },
  //             currentBid: { type: 'number' },
  //             bids: {
  //               type: 'references',
  //               bidirectional: { fromField: 'item' },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   })
  // }, [])

  return (
    <div>
      <ComponentViewer
        title="Content"
        examples={[
          {
            code: `import { Content, useRoute, color } from '@based/ui'

const route = useRoute('[view]');

<Content 
  onChange={(key, v) => {
    if (key === 'view') {
      route.setQuery(null)

      route.setPath({ view: v || null })
    } else {
      if (key !== 'overlay-state') {
        route.setQuery({ [key]: v })
      }
    }
  }}
  style={{ 
    height: 'calc(100vh - 200px)', 
    border: \`1px solid \${color('lightborder')}\`,
    borderRadius: '10px'
  }}
  values={{ ...route.path, ...route.query }} />`,
          },
        ]}
      />
    </div>
  )
}
