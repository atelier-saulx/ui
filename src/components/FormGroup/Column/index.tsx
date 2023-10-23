import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row, Column, Button, Modal } from '../..'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { FormGroupVariantProps } from '../types'
import { FormGroup } from '../..'
import { styled } from 'inlines'
import { IconClose } from 'src/icons'

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
}) => {
  const fields: ReactNode[] = []
  let hasAutoFocus = false

  const objectArray = [
    ...new Set(
      parsedData
        .map((item) => item.field.split('.')[0])
        .filter((e, i, a) => a.indexOf(e) !== i)
    ),
  ]

  const filteredArray = parsedData.filter(
    (item) => !objectArray.includes(item.field.split('.')[0])
  )

  for (const d of objectArray) {
    const parsedObjArray = parsedData.filter((i) => i.field.split('.')[0] === d)
    const obj = parsedObjArray.reduce(
      (a, v) => ({ ...a, [v.field.split('.')[1]]: v }),
      {}
    )

    fields.push(
      <Modal.Root key={d}>
        <Modal.Trigger>
          <Button>Open Overlay: {'label'}</Button>
        </Modal.Trigger>
        <Modal.Content>
          {({ close }) => {
            return (
              <>
                <Modal.Title>
                  <styled.div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {'label'}
                    <Button
                      hideFocusState
                      size="medium"
                      light
                      color="system"
                      onClick={() => close()}
                      style={{
                        borderRadius: '50%',
                        border: '1px solid transparent',
                        marginLeft: 'auto',
                      }}
                      icon={<IconClose color="default" />}
                    />
                  </styled.div>
                </Modal.Title>
                <Modal.Description>{'description'}</Modal.Description>
                <Modal.Body>
                  <FormGroup
                    confirmationVariant="buttons"
                    variant="column"
                    config={obj}
                    values={values}
                    //@ts-ignore
                    onChange={onChange}
                  />
                </Modal.Body>
              </>
            )
          }}
        </Modal.Content>
      </Modal.Root>
    )
  }

  for (const d of filteredArray) {
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
      {alwaysAccept || !hasChanges ? null : (
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
