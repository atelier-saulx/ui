import React, { useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Button } from '../Button'

const OPERATORS = [
  { value: '=' },
  { value: '!=' },
  { value: '<' },
  { value: '>' },
]

export const Filter = ({ customFilter, setCustomFilter, columnNames }) => {
  const [inputVal, setInputVal] = useState(customFilter?.$value)
  const [type, setType] = useState(customFilter?.$type)
  const [operator, setOperator] = useState(customFilter?.$operator)

  let TYPES = []

  columnNames.map((name) =>
    TYPES.push({
      value: name,
    })
  )

  console.log(customFilter, '🐵')
  console.log(TYPES, 'types', columnNames)

  const applyFilter = () => {
    console.log(inputVal, type, operator)

    setCustomFilter({
      $operator: operator,
      $value: inputVal,
      $field: type,
    })
  }

  return (
    <styled.div
      style={{ display: 'flex', gap: 8, '& div': { width: 'auto !important' } }}
    >
      <Input
        type="select"
        options={TYPES}
        value={type}
        onChange={(v) => setType(v)}
        style={{ minWidth: 164 }}
      />
      <Input
        type="select"
        options={OPERATORS}
        value={operator}
        onChange={(v) => setOperator(v)}
        style={{ minWidth: 96 }}
      />
      <Input
        type="text"
        value={inputVal}
        onChange={(v) => setInputVal(v)}
        style={{ minWidth: 164 }}
      />
      <Button size="small" onClick={() => applyFilter()}>
        Apply
      </Button>
    </styled.div>
  )
}
