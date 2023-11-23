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
            <QuickTable data={someExampleData} height={420} width={676} />
          </div>
        )
      },
    },
  ],
}

export default example
