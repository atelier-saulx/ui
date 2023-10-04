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
  properties: {}, // props.props.TableProps.props,
  examples: [
    {
      props: { arrangeAble: true, selectable: true },
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
              height: 700,
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
                  width: 200,
                },
                {
                  label: 'Title',
                  key: 'title',
                  width: 200,
                },
                {
                  label: 'Img',
                  key: 'image',
                  type: 'img',
                  width: 80,
                },
                {
                  key: 'stage',
                  label: 'Status',
                  width: 200,
                },
                {
                  label: 'Author',
                  key: 'author',
                  width: 200,
                  type: 'author',
                },
              ]}
              {...props}

              // query={}
              // getQueryItems={data}
            />
          </div>
        )
      },
    },

    {
      name: 'Query',
      props: {},
      customRenderer: (props) => {
        const client = useClient()

        // { data, loading, error, checksum, next } = usePageQuery('db', )

        return (
          <div
            style={{
              height: 500,
              width: '500px',
            }}
          >
            <Table
              queryId={'bla'}
              query={(offset, limit) => {
                return client.query('db', {
                  $id: 'root',
                  todo: {
                    $all: true,
                    $list: {
                      $sort: { $field: 'createdAt', $order: 'desc' },
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
                console.log('', d)
                return d.todo
              }}
              // want to have inifity
              itemCount={50000}
              headers={[
                {
                  label: 'ID',
                  key: 'id',
                  type: 'id',
                  width: 242,
                },
                {
                  label: 'Name',
                  key: 'name',
                  width: 242,
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
            <Table
              queryId={'bla'}
              query={(offset, limit) => {
                return client.query('db', {
                  $id: 'root',
                  file: {
                    $all: true,
                    $list: {
                      $sort: { $field: 'updatedAt', $order: 'desc' },
                      $offset: offset,
                      $limit: limit,
                      $find: {
                        $traverse: 'children',
                        $filter: {
                          $operator: '=',
                          $field: 'type',
                          $value: 'file',
                        },
                      },
                    },
                  },
                })
              }}
              getQueryItems={(d) => {
                console.log('', d)
                return d.file
              }}
              // want to have inifity
              itemCount={100}
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
                {
                  label: 'SRC',
                  key: 'src',
                  type: 'image',
                },
                {
                  label: 'Good Size',
                  key: 'size',
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
