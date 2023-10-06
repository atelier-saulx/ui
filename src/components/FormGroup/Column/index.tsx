import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row, Column, Button } from '../..'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { FormGroupVariantProps } from '../types'

export const FormGroupColumn: FC<FormGroupVariantProps> = ({
  onChange,
  parsedData,
  fieldWidth,
  onChangeField,
  labelWidth,
  hasChanges,
  valuesChanged,
  values,
  alwaysAccept,
  setChanges,
  autoFocus,
  style,
  acceptLabel,
  acceptVariant,
}) => {
  const fields: ReactNode[] = []
  let hasAutoFocus = false

  for (const d of parsedData) {
    fields.push(
      <FormItem
        autoFocus={!hasAutoFocus && autoFocus}
        fieldWidth={fieldWidth}
        width={labelWidth}
        key={d.field}
        item={d}
        onChange={onChangeField}
        value={
          hasChanges
            ? getValue(d.field, valuesChanged.current) ??
              d.value ??
              getValue(d.field, values)
            : d.value ?? getValue(d.field, values)
        }
      />
    )
    hasAutoFocus = true
  }

  return (
    <Column
      style={{
        width: '100%',
        ...style,
      }}
    >
      {fields}

      {alwaysAccept || !hasChanges ? null : acceptVariant === 'icons' ? (
        <RowEnd
          style={{
            borderTop: border(1),
            width: '100%',
            marginTop: 16,
            paddingTop: 16,
            marginRight: 8,
          }}
        >
          <Text light>{acceptLabel ?? 'Apply changes'}</Text>
          <Confirmation
            onCancel={() => {
              valuesChanged.current = {}
              setChanges(false)
            }}
            onAccept={async () => {
              await onChange(valuesChanged.current)
              valuesChanged.current = {}
              setChanges(false)
            }}
          />
        </RowEnd>
      ) : (
        <RowEnd>
          <Row>
            <Button
              style={{ marginRight: 24 }}
              color="system"
              displayShortcut
              keyboardShortcut="Esc"
            >
              Cancel
            </Button>
            <Button displayShortcut keyboardShortcut="Enter">
              {acceptLabel ?? 'Apply changes'}
            </Button>
          </Row>
        </RowEnd>
      )}
    </Column>
  )
}
