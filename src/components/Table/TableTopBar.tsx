import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { IconFilter, IconPlus } from '../../icons'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <styled.div style={{ maxWidth: 246 }}>
      <Input
        type="search"
        placeholder="Search for an item"
        value={searchValue}
        onChange={(v) => setSearchValue(v)}
        style={{
          minHeight: '32px',
          height: '32px',
          '& input': {
            height: '32px',
          },
        }}
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
          prefix="Field"
        />
      </styled.div>
      {pillValue ? (
        <>
          <Pill
            options={[{ value: 'x', label: 'x' }]}
            type="select"
            value=""
            onChange={(v) => {
              console.log(v)
            }}
            prefix="Filter"
          />
          <Button
            onClick={() => console.log('beng beng')}
            size="small"
            ghost
            color="primary"
            icon={<IconFilter />}
          >
            Add filter
          </Button>
        </>
      ) : (
        ''
      )}
    </styled.div>
  )
}

const DisplayColumns = () => {
  return (
    <styled.div>
      <Button
        size="small"
        icon={<IconPlus />}
        color="system"
        light
        style={{ marginLeft: 8 }}
      />
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
        padding: '12px 6px ',
        justifyContent: 'space-between',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
      }}
    >
      <TableFilters
        pillOptions={pillOptions}
        setSelectedPillVal={setSelectedPillVal}
      />
      <Row>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <DisplayColumns />
      </Row>
    </styled.div>
  )
}
