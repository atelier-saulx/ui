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
  const [field, setField] = useState(customFilter?.$field)
  const [operator, setOperator] = useState(customFilter?.$operator)

  let FIELDS = []

  columnNames.map((name) =>
    FIELDS.push({
      value: name,
    })
  )

  console.log(customFilter, '🐵')
  console.log(FIELDS, 'types', columnNames)

  const applyFilter = () => {
    console.log(inputVal, field, operator)

    setCustomFilter({
      $operator: operator,
      $value: inputVal,
      $field: field,
    })
  }

  return (
    <styled.div style={{ display: 'flex', gap: 8, '& div': { width: 'auto' } }}>
      <Input
        type="select"
        placeholder={field}
        options={FIELDS}
        value={field}
        onChange={(v) => setField(v)}
        style={{ minWidth: 132 }}
      />
      <Input
        type="select"
        options={OPERATORS}
        value={operator}
        onChange={(v) => setOperator(v)}
        style={{ maxWidth: 96 }}
      />
      <Input
        type="text"
        value={inputVal}
        onChange={(v) => setInputVal(v)}
        style={{ minWidth: 132 }}
      />
      <Button size="small" onClick={() => applyFilter()}>
        Apply
      </Button>
    </styled.div>
  )
}
