import React from 'react'
import { QueryTable } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { useQuery, useClient } from '@based/react'

const someExampleData = [
  { createdAt: 43534543, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 32342342, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 3453353, id: '5675675', type: 'testie', updatedAt: 43434534 },
  {
    createdAt: 4353453,
    id: '7575677',
    type: 'testie',
    boolie: false,
    updatedAt: 43434534,
  },
  {
    createdAt: 3353,
    id: '5675675',
    type: 'Snupr',
    boolie: true,
    updatedAt: 43434534,
    flap: 'flip',
    click: 'boom',
  },
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
  name: 'QueryTable',
  properties: props.props.QueryTableProps.props,
  description: '',
  component: QueryTable,
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const client = useClient()
        const myFilter = {
          $operator: '=',
          $value: 'file',
          $field: 'type',
        }

        return (
          <QueryTable
            query={(offset, limit, sortOptions, filter) => {
              return client.query('db', {
                $id: 'root',
                children: {
                  $all: true,
                  $list: {
                    $sort: sortOptions,
                    $offset: offset,
                    $limit: limit,
                    $find: {
                      $filter: filter,
                    },
                  },
                },
              })
            }}
            filter={myFilter}
            // data={genTableData()}
            //  data={someExampleData}
            height={420}
            width={767}
            onRowClick={(r, rIdx) => console.log('clicked row', r, rIdx)}
            onCellClick={(c, rIdx, cIdx) =>
              console.log('clicked cell', c, rIdx, cIdx)
            }
            // queryId={filter + (statusFilter ?? '')}
            getQueryItems={(d) => {
              // console.info(d, 'Nnaie?')
              return d.children
            }}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: (props) => {
        return (
          <QueryTable
            // data={genTableData()}
            data={someExampleData}
            height={420}
            width={767}
            onRowClick={(r, rIdx) => console.log('clicked row', r, rIdx)}
            onCellClick={(c, rIdx, cIdx) =>
              console.log('clicked cell', c, rIdx, cIdx)
            }
            style={{}}
          />
        )
      },
    },
  ],
}

export default example
