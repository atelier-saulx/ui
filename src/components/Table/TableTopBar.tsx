import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { IconFilter } from '../../icons'

const SearchBar = () => {
  return (
    <styled.div style={{ maxWidth: 246 }}>
      <Input type="search" placeholder="Search for an item" />
    </styled.div>
  )
}

const TableFilters = ({ pillOptions }) => {
  const [pillValue, setPillValue] = useState<any>('')

  return (
    <styled.div style={{ display: 'flex', gap: 6 }}>
      <styled.div>
        <Pill
          options={pillOptions}
          type="select"
          value={pillValue}
          onChange={(v) => setPillValue(v)}
        />
      </styled.div>
      {pillValue ? (
        <Button
          onClick={() => console.log('beng beng')}
          size="small"
          ghost
          color="primary"
          icon={<IconFilter />}
        >
          Add filter
        </Button>
      ) : (
        ''
      )}
    </styled.div>
  )
}

export const TableTopBar = ({ tableHeaderGroups }) => {
  console.log(tableHeaderGroups)

  let pillOptions = []

  tableHeaderGroups?.map((item) =>
    pillOptions.push({ label: item.id, value: item.id })
  )

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 6px ',
        justifyContent: 'space-between',
      }}
    >
      <TableFilters pillOptions={pillOptions} />
      <SearchBar />
    </styled.div>
  )
}
