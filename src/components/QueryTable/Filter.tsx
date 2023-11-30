import React, { useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Button } from '../Button'
import { Pill } from '../Pill'

const OPERATORS = [
  { value: '=' },
  { value: '!=' },
  { value: '<' },
  { value: '>' },
  // { value: 'includes' },
]

export const Filter = ({ customFilter, setCustomFilter, columnNames }) => {
  const [inputVal, setInputVal] = useState('')
  const [field, setField] = useState('')
  const [operator, setOperator] = useState('')

  let FIELDS = []

  columnNames.map((name) =>
    FIELDS.push({
      value: name,
    })
  )

  // console.log(customFilter, '🐵')
  // console.log(FIELDS, 'types', columnNames)

  const applyFilter = () => {
    console.log(inputVal, field, operator)

    setCustomFilter({
      $operator: operator || customFilter?.$operator,
      $value: inputVal,
      $field: field || customFilter?.$field,
    })
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        gap: 8,
        '& div': {
          width: 'auto',
        },
      }}
    >
      <Pill
        placeholder={customFilter?.$field}
        prefix="Field"
        type="select"
        options={FIELDS}
        value={field}
        onChange={(v) => setField(v)}
        style={{ minWidth: 132 }}
      />

      <Pill
        placeholder={customFilter?.$operator}
        prefix="Operator"
        type="select"
        options={OPERATORS}
        value={operator}
        onChange={(v) => setOperator(v)}
        style={{ maxWidth: 96 }}
      />

      <styled.span
        style={{
          height: '33px',
          '& div': {
            minHeight: '33px !important',
            maxHeight: '33px',
          },
        }}
      >
        <Input
          type="text"
          placeholder={customFilter?.$value}
          value={inputVal}
          onChange={(v) => setInputVal(v)}
          style={{ maxWidth: 124, height: '32px !important', borderRadius: 4 }}
        />
      </styled.span>

      {inputVal && (
        <Button size="xsmall" onClick={() => applyFilter()} color="primary">
          Apply
        </Button>
      )}
    </styled.div>
  )
}
