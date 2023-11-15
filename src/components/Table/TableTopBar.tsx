import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { Text } from '../Text'
import { IconDelete, IconFilter, IconPlus, IconEye } from '../../icons'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'
import { Dropdown } from '..'
import { ConfirmModal } from '..'
import { TableFilters } from './TableFilters'

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <styled.div style={{ maxWidth: 246 }}>
      <Input
        type="search"
        placeholder="Search for any item..."
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
            icon={<IconEye />}
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

const SelectedOptionButtons = ({
  onMultiSelectDelete,
  rowSelectionArr,
  setRowSelection,
}) => {
  return (
    <styled.div
      style={{
        border: `1px solid ${color('border', 'default', 'strong')}`,
        borderRadius: 4,
        boxShadow: '0px 1px 4px 0px rgba(27, 36, 44, 0.04)',
        display: 'flex',
        gap: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 12px',
      }}
    >
      <Text color="brand" weight="medium">
        {rowSelectionArr.length} selected
      </Text>
      <Button color="neutral" size="xsmall" onClick={() => setRowSelection({})}>
        Clear selection
      </Button>

      <ConfirmModal
        onCancel={() => {}}
        onConfirm={() => {
          onMultiSelectDelete()
          setRowSelection({})
        }}
      >
        <Button color="alert" size="xsmall" icon={<IconDelete />}>
          Delete
        </Button>
      </ConfirmModal>
    </styled.div>
  )
}

export const TableTopBar = ({
  onMultiSelectDelete,
  allColumnNames,
  selectedPillVal,
  setSelectedPillVal,
  searchValue,
  setSearchValue,
  filteredColumns,
  setFilteredColumns,
  rowSelection,
  setRowSelection,
  tableSearchFilterValue,
  setTableSearchFilterValue,
  operatorTableSearchValue,
  setOperatorTableSearchValue,
  style,
}) => {
  const rowSelectionArr = Object.keys(rowSelection)

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 6px ',
        justifyContent: 'space-between',
        borderTop: `1px solid ${color('border', 'default', 'strong')}`,
        ...style,
      }}
    >
      {rowSelectionArr.length > 0 ? (
        <SelectedOptionButtons
          onMultiSelectDelete={onMultiSelectDelete}
          rowSelectionArr={rowSelectionArr}
          setRowSelection={setRowSelection}
        />
      ) : (
        <TableFilters
          allColumnNames={allColumnNames}
          setSelectedPillVal={setSelectedPillVal}
          selectedPillVal={selectedPillVal}
          tableSearchFilterValue={tableSearchFilterValue}
          setTableSearchFilterValue={setTableSearchFilterValue}
          operatorTableSearchValue={operatorTableSearchValue}
          setOperatorTableSearchValue={setOperatorTableSearchValue}
        />
      )}
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
