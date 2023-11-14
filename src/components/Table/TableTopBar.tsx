import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { IconFilter } from '../../icons'
import { color } from '../../varsUtilities'

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <styled.div style={{ maxWidth: 246 }}>
      <Input
        type="search"
        placeholder="Search for an item"
        value={searchValue}
        onChange={(v) => setSearchValue(v)}
      />
    </styled.div>
  )
}

const TableFilters = ({ pillOptions, setSelectedPillVal }) => {
  const [pillValue, setPillValue] = useState<any>('')

  return (
    <styled.div style={{ display: 'flex', gap: 6 }}>
      <styled.div>
        <Pill
          options={pillOptions}
          type="select"
          value={pillValue}
          onChange={(v) => {
            setPillValue(v)
            setSelectedPillVal(v)
          }}
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

export const TableTopBar = ({
  tableHeaderGroups,
  setSelectedPillVal,
  searchValue,
  setSearchValue,
}) => {
  //   console.log(tableHeaderGroups)

  let pillOptions = []

  tableHeaderGroups?.map((item) =>
    pillOptions.push({ label: item.id, value: item.id })
  )

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 6px ',
        justifyContent: 'space-between',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
      }}
    >
      <TableFilters
        pillOptions={pillOptions}
        setSelectedPillVal={setSelectedPillVal}
      />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
    </styled.div>
  )
}
