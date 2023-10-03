import React, { useState } from 'react'
import { Avatar, Badge, Table, Text } from '../../src'
import { faker } from '@faker-js/faker'
import props from '../props.json'
import { ComponentDef } from '../types'
import { useQuery, useClient } from '@based/react'

const example: ComponentDef = {
  name: 'Table',
  component: Table,
  description: 'Infinite scrollable virtualized table with rich content',
  properties: props.props.TableProps.props,
  examples: [
    {
      props: {},
      customRenderer: (props) => {
        const newPerson = () => {
          return {
            id: faker.string.nanoid(),
            stage: faker.helpers.arrayElement(['Published', 'Draft']),
            title: faker.animal.dog(),
            image: faker.image.url(),
            author: faker.person.fullName(),
            createdAt: faker.date.anytime(),
            updatedAt: faker.date.anytime(),
          }
        }

        function makeData(count: number) {
          return Array.from({ length: count }).map(() => {
            return newPerson()
          })
        }

        const [data, setData] = useState(() => makeData(50))
        const [isLoadingMoreData, setIsLoadingMoreData] = useState(false)

        async function fetchMoreData() {
          if (isLoadingMoreData) return

          setIsLoadingMoreData(true)
          await new Promise((resolve) => {
            setTimeout(resolve, 200)
          })
          setData((p) => [...p, ...makeData(50)])
          setIsLoadingMoreData(false)
        }

        return (
          <div
            style={{
              height: 500,
              width: '676px',
            }}
          >
            <Table
              data={data}
              headers={[
                {
                  label: 'ID',
                  key: 'id',
                  type: 'id',
                },
                {
                  label: 'Title',
                  key: 'title',
                },
                {
                  label: 'Img',
                  key: 'image',
                  type: 'img',
                },
              ]}
              // query={}
              // getQueryItems={data}
            />
          </div>
        )
      },
    },

    {
      props: {},
      customRenderer: (props) => {
        const client = useClient()

        return (
          <div
            style={{
              height: 500,
              width: '676px',
            }}
          >
            <Text>Query table</Text>
            <Table
              queryId={'bla'}
              query={(offset, limit) => {
                return client.query('db', {
                  $id: 'root',
                  files: {
                    $all: true,
                    $list: {
                      $offset: offset,
                      $limit: limit,
                      $find: {
                        $traverse: 'children',
                        $filter: {
                          $operator: '=',
                          $field: 'type',
                          $value: 'todo',
                        },
                      },
                    },
                  },
                })
              }}
              getQueryItems={(d) => {
                return d.files
              }}
              // also filter this amount...
              // itemCount={machineStatus.amount}
              // context={{ envAdminHub }}
              headers={[
                {
                  label: 'ID',
                  key: 'id',
                  type: 'id',
                },
                {
                  label: 'Name',
                  key: 'name',
                },
              ]}
              // query={}
              // getQueryItems={data}
            />
          </div>
        )
      },
    },
  ],
}

export default example
