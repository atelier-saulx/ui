import React, { useState } from 'react'
import { Table } from '../../src'
import { faker } from '@faker-js/faker'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Table',
  component: Table,
  description: 'Table',
  properties: props.props.TableProps.props,
  examples: [
    {
      props: {},
      customRenderer: () => {
        const newPerson = (index: number) => {
          return {
            id: index + 1,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number(40),
            visits: faker.datatype.number(1000),
            progress: faker.datatype.number(100),
            createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
            status: faker.helpers.shuffle([
              'relationship',
              'complicated',
              'single',
            ])[0]!,
          }
        }

        function makeData(...lens: number[]) {
          const makeDataLevel = (depth = 0) => {
            const len = lens[depth]!
            return Array.from({ length: len }).map((_, index) => {
              return {
                ...newPerson(index),
              }
            })
          }

          return makeDataLevel()
        }

        const [data] = useState(() => makeData(500))

        return (
          <div
            style={{
              height: 500,
            }}
          >
            <Table
              data={data}
              columns={[
                { header: 'ID', accessor: 'id' },
                { header: 'First name', accessor: 'firstName' },
                { header: 'Last name', accessor: 'lastName' },
                { header: 'Age', accessor: 'age' },
                { header: 'Visits', accessor: 'visits' },
                {
                  header: 'Status',
                  accessor: 'status',
                  cell: (value) => (
                    <button onClick={() => alert(value)}>{value}</button>
                  ),
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
