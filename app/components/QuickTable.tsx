import React from 'react'
import { QuickTable } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const someExampleData = [
  { createdAt: 43534543, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 32342342, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 3453353, id: '5675675', type: 'testie', updatedAt: 43434534 },
  { createdAt: 4353453, id: '7575677', type: 'testie', updatedAt: 43434534 },
  { createdAt: 67567657, id: '35345357', type: 'testie', updatedAt: 43434534 },
]
const genTableData = (): {
  title?: string
  subtitle?: string
  description?: string
  author?: string
  id?: string
}[] => {
  return Array.from(Array(1e4)).map((_, i) => ({
    title: `title ${i + 1}`,
    subtitle: `subtitle ${i + 1}`,
    description: Math.random() > 0.5 ? `lorem ipsum ${i + 1}` : undefined,
    author: `mar${i + 1}o`,
    id: `xxxx${i}`,
    height: Math.max(~~(Math.random() * 500), 56),
    options: 'BLah',
  }))
}

const example: ComponentDef = {
  name: 'QuickTable',
  properties: props.props.QuickTableProps.props,
  description: '',
  component: QuickTable,
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        return (
          <div style={{ height: 420, width: 676 }}>
            <QuickTable
              data={genTableData()}
              height={420}
              width={676}
              style={{ background: 'orange' }}
            />
          </div>
        )
      },
    },
  ],
}

export default example
