import React, { FC, ReactNode } from 'react'
import { Confirmation, Column } from '../../../components'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { FormGroupVariantProps } from '../types'
import { color } from '../../../varsUtilities'
import { styled } from 'inlines'

import { ObjectItem } from '../ObjectItem'

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
  confirmationLabel,
  confirmationVariant,
  field,
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
        onChangeObj={onChange}
        objValues={values}
        hasChanges={hasChanges}
        valuesChanged={valuesChanged}
        setChanges={setChanges}
        alwaysAccept={alwaysAccept}
      />
    )

    hasAutoFocus = true
  }

  if (confirmationVariant === 'modal') {
    return (
      <>
        <Column
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            ...style,
          }}
        >
          {fields}
        </Column>
        <styled.div
          style={{
            // position: 'sticky',
            // bottom: 0,
            left: 0,
            right: 0,
            position: 'sticky',
            top: 'auto',
            bottom: 0,
            overflow: 'hidden',
            background: color('standalone', 'modal', 'default'),
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            '& > * + *': {
              marginLeft: '24px',
            },
            minHeight: 98,
            padding: '24px 32px 32px',
            // margin: '0 -32px',
            borderTop: `1px solid ${color('border', 'default', 'strong')}`,
          }}
        >
          {alwaysAccept || !hasChanges ? null : (
            <Confirmation
              label={confirmationLabel}
              variant="buttons"
              onCancel={() => {
                valuesChanged.current = {}
                setChanges(false)
              }}
              onConfirm={async () => {
                await onChange(valuesChanged.current)
                valuesChanged.current = {}
                setChanges(false)
              }}
            />
          )}
        </styled.div>
      </>
    )
  }

  return (
    <Column
      style={{
        width: '100%',
        ...style,
      }}
    >
      {fields}
      {alwaysAccept || !hasChanges
        ? null
        : confirmationVariant !== 'none' && (
            <Confirmation
              label={confirmationLabel}
              variant={confirmationVariant}
              onCancel={() => {
                valuesChanged.current = {}
                setChanges(false)
              }}
              onConfirm={async () => {
                await onChange(valuesChanged.current)
                valuesChanged.current = {}
                setChanges(false)
              }}
            />
          )}
    </Column>
  )
}
