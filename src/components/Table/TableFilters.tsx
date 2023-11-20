import React, { useState } from 'react'
import { styled } from 'inlines'
import { Input } from '../Input'
import { Pill } from '../Pill'
import { Button } from '../Button'
import { DatePicker } from '../DatePicker'

export const TableFilters = ({
  allColumnNames,
  setSelectedPillVal,
  tableSearchFilterValue,
  setTableSearchFilterValue,
  operatorTableSearchValue,
  setOperatorTableSearchValue,
  selectedPillVal,
}) => {
  return (
    <styled.div style={{ display: 'flex', gap: 6 }}>
      <styled.div>
        <Pill
          options={allColumnNames}
          type="select"
          value={selectedPillVal}
          onChange={(v) => {
            setSelectedPillVal(v)
          }}
          prefix="Field"
        />
      </styled.div>
      {selectedPillVal ? (
        <>
          <Pill
            options={[
              { value: '=', label: '=' },
              { value: '!=', label: '!=' },
              { value: '<', label: '<' },
              { value: '>', label: '>' },
              //   { value: 'AND', label: 'AND' },
              //   { value: 'OR', label: 'OR' },
            ]}
            type="select"
            value={operatorTableSearchValue}
            onChange={(v) => {
              setOperatorTableSearchValue(v)
            }}
            prefix="Operator"
          />
          {(operatorTableSearchValue === '=' ||
            operatorTableSearchValue === '!=') && (
            <Input
              type="text"
              autoFocus
              value={tableSearchFilterValue}
              onChange={(v) => {
                setTableSearchFilterValue(v)
              }}
              style={{
                minHeight: '34px',
                height: '32px',
                '& input': {
                  height: '32px',
                },
              }}
            />
          )}

          {((operatorTableSearchValue === '<' ||
            operatorTableSearchValue === '>') &&
            // or date
            selectedPillVal === 'createdAt') ||
          selectedPillVal === 'updatedAt' ? (
            <DatePicker
              value={tableSearchFilterValue}
              onChange={(v) => setTableSearchFilterValue(v)}
              style={{
                marginTop: '-2px',
                '& div ': {
                  height: '34px !important',
                  lineHeight: '30px !important',
                  borderRadius: '4px !important',
                },
                '& svg': {
                  marginTop: '5px',
                },
              }}
            />
          ) : (
            (operatorTableSearchValue === '<' ||
              operatorTableSearchValue === '>') && (
              <Input
                autoFocus
                type="number"
                value={tableSearchFilterValue}
                onChange={(v) => {
                  setTableSearchFilterValue(v)
                }}
                style={{
                  minHeight: '34px',
                  height: '32px',
                  '& input': {
                    height: '32px',
                  },
                }}
              />
            )
          )}

          <Button
            color="neutral"
            size="xsmall"
            onClick={() => {
              setTableSearchFilterValue(undefined)
              setOperatorTableSearchValue(undefined)
              setSelectedPillVal(undefined)
            }}
          >
            Clear filters
          </Button>
        </>
      ) : (
        ''
      )}
    </styled.div>
  )
}
