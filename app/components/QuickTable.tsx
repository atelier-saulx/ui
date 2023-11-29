import React from 'react'
import { QuickTable } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'
import { useQuery, useClient } from '@based/react'

const someExampleData = [
  { createdAt: 43534543, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 32342342, id: '3287323', type: 'testie', updatedAt: 43434534 },
  { createdAt: 3453353, id: '5675675', type: 'testie', updatedAt: 43434534 },
  { createdAt: 4353453, id: '7575677', type: 'testie', updatedAt: 43434534 },
  {
    createdAt: 3353,
    id: '5675675',
    type: 'Snupr',
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
  name: 'QuickTable',
  properties: props.props.QuickTableProps.props,
  description: '',
  component: QuickTable,
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const { data, loading } = useQuery('db', {
          $id: 'root',
          children: {
            $all: true,
            $list: {
              $sort: { $field: 'updatedAt', $order: 'desc' },
              $offset: 0,
              $limit: 25,
              $find: {
                $filter: {
                  $operator: '=',
                  $value: 'file',
                  $field: 'type',
                },
              },
            },
          },
        })

        const client = useClient()

        return (
          <QuickTable
            query={(offset, limit) => {
              return client.query('db', {
                $id: 'root',
                children: {
                  $all: true,
                  $list: {
                    $sort: { $field: 'updatedAt', $order: 'desc' },
                    $offset: offset,
                    $limit: limit,
                    $find: {
                      $filter: {
                        $operator: '=',
                        $value: 'file',
                        $field: 'type',
                        // $and: {
                        //   $field: 'technicalData.runtime',
                        //   $operator: '>',
                        //   $value: 100,
                        // },
                      },
                    },
                  },
                },
              })
            }}
            // data={genTableData()}
            //  data={someExampleData}
            height={420}
            width={676}
            onRowClick={(r, rIdx) => console.log('clicked row', r, rIdx)}
            onCellClick={(c, rIdx, cIdx) =>
              console.log('clicked cell', c, rIdx, cIdx)
            }
            // queryId={filter + (statusFilter ?? '')}
            getQueryItems={(d) => {
              console.info(d, 'Nnaie?')
              return d.children
            }}
            style={{}}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: (props) => {
        return (
          <QuickTable
            // data={genTableData()}
            data={someExampleData}
            height={420}
            width={676}
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
