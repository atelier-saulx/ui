import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import {
  Text,
  Confirmation,
  RowEnd,
  Row,
  Column,
  Button,
  Modal,
  FormGroup,
} from '../../../components'
import { FormItem } from './Item'
import { getValue, parseData } from '../utils'
import { FormGroupVariantProps } from '../types'
import { styled } from 'inlines'
import { IconClose } from '../../../icons'

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

  // console.log(parsedData)

  const objectArray = [
    ...new Set(
      parsedData
        .map((item) => item.field.split('.')[0])
        .filter((e, i, a) => a.indexOf(e) !== i)
    ),
  ]
  // console.log(objectArray)

  const filteredArray = parsedData.filter(
    (item) => !objectArray.includes(item.field.split('.')[0])
  )

  for (const d of objectArray) {
    const parsedObjArray = parsedData.filter((i) => i.field.split('.')[0] === d)
    // console.log(parsedObjArray)

    fields.push(
      <Modal.Root key={d}>
        <Modal.Trigger>
          <Button>Open Overlay: {d}</Button>
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
                    {d}
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
                {/* <Modal.Description>{'description'}</Modal.Description> */}
                <Modal.Body>
                  <styled.div style={{ overflowX: 'hidden' }}>
                    {parsedObjArray.map((item) => {
                      if (item.type === 'object') {
                        // console.log(item.field)
                        return (
                          <FormGroupColumn
                            confirmationVariant="none"
                            autoFocus={autoFocus}
                            onChange={onChange}
                            parsedData={parseData({ [item.field]: item })}
                            labelWidth={labelWidth}
                            fieldWidth={fieldWidth}
                            onChangeField={onChangeField}
                            style={style}
                            hasChanges={hasChanges}
                            valuesChanged={valuesChanged}
                            values={values}
                            setChanges={setChanges}
                            alwaysAccept={alwaysAccept}
                          />
                        )
                      }
                      return (
                        <FormItem
                          autoFocus={!hasAutoFocus && autoFocus}
                          fieldWidth={fieldWidth}
                          width={labelWidth}
                          key={item.field}
                          item={item}
                          onChange={onChangeField}
                          value={
                            hasChanges
                              ? getValue(item.field, valuesChanged.current) ??
                                item.value ??
                                getValue(item.field, values)
                              : item.value ?? getValue(item.field, values)
                          }
                        />
                      )
                    })}
                  </styled.div>
                </Modal.Body>
                <Modal.Actions>
                  <Button onClick={close}>Close</Button>
                  <Button onClick={close}>Confirm</Button>
                </Modal.Actions>
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
