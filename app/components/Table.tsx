import React, { useState } from 'react'
import { Avatar, Badge, Table } from '../../src'
import { faker } from '@faker-js/faker'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Table',
  component: Table,
  description: 'Infinite scrollable virtualized table with rich content',
  properties: props.props.TableProps.props,
  examples: [
    {
      props: { resizeMode: 'smooth' },
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
              // width: '10000px',
            }}
          >
            <Table
              data={data}
              resizeMode={props.resizeMode}
              // onSize={() => {
              //   // setSize // loadsTheData
              // }}
              //  Add arg pageSize
              onScrollToBottom={() => {
                // page size
                fetchMoreData()
              }}
              columns={[
                { header: 'ID', accessor: 'id' },
                {
                  header: 'Stage',
                  accessor: 'stage',
                  cell: (value) => (
                    <Badge
                      light
                      color={value === 'Published' ? 'green' : 'purple'}
                    >
                      {value}
                    </Badge>
                  ),
                },
                { header: 'Title', accessor: 'title' },
                {
                  header: 'Cover Image',
                  accessor: 'image',
                  cell: (value) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={value}
                        style={{ height: 48, width: 48, borderRadius: 4 }}
                      />
                    </div>
                  ),
                },
                {
                  header: 'Author',
                  accessor: 'author',
                  cell: (value) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar size="small">{value}</Avatar>
                      <span
                        style={{
                          marginLeft: 8,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ),
                },
                {
                  header: 'Created',
                  accessor: 'createdAt',
                  cell: (value) => value.toISOString(),
                },
              ]}
            />
          </div>
        )
      },
    },
  ],
}

export default example
