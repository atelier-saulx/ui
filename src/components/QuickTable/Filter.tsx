import React from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'

const OPERATORS = [
  { value: '=' },
  { value: '!=' },
  { value: '<' },
  { value: '>' },
]

export const Filter = ({ setCustomFilter, columnNames }) => {
  const TYPES = columnNames.map((name) => {
    value: name
  })

  console.log(TYPES, 'types', columnNames)

  return (
    <styled.div style={{ display: 'flex' }}>
      {/* <Input type="select" /> */}
      <Input type="select" options={OPERATORS} />
      <Input type="text" />
    </styled.div>
  )
}
