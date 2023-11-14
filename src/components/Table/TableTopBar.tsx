import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { IconFilter, IconPlus } from '../../icons'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'
import { Dropdown } from '..'

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

const TableFilters = ({ allColumnNames, setSelectedPillVal }) => {
  const [pillValue, setPillValue] = useState<any>('')

  return (
    <styled.div style={{ display: 'flex', gap: 6 }}>
      <styled.div>
        <Pill
          options={allColumnNames}
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

const DisplayColumns = ({
  allColumnNames,
  filteredColumns,
  setFilteredColumns,
}) => {
  return (
    <styled.div>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button
            size="small"
            icon={<IconPlus />}
            color="system"
            light
            style={{ marginLeft: 12 }}
          />
        </Dropdown.Trigger>
        <Dropdown.Items>
          {allColumnNames.map((item, idx) => (
            <Input
              type="checkbox"
              value={!filteredColumns.includes(item.value)}
              key={idx}
              title={item.value}
              onChange={(v) => {
                if (!v) {
                  setFilteredColumns([...filteredColumns, item.value])
                } else {
                  setFilteredColumns([
                    ...filteredColumns.filter((snurp) => snurp !== item.value),
                  ])
                }
              }}
            />
          ))}
        </Dropdown.Items>
      </Dropdown.Root>
    </styled.div>
  )
}

export const TableTopBar = ({
  allColumnNames,
  setSelectedPillVal,
  searchValue,
  setSearchValue,
  filteredColumns,
  setFilteredColumns,
}) => {
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
        allColumnNames={allColumnNames}
        setSelectedPillVal={setSelectedPillVal}
      />
      <Row>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <DisplayColumns
          allColumnNames={allColumnNames}
          filteredColumns={filteredColumns}
          setFilteredColumns={setFilteredColumns}
        />
      </Row>
    </styled.div>
  )
}
