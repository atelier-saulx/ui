import React, { FC } from 'react'
import { Modal, Button, Breadcrumbs } from '../../components'
import { Label } from './Column/Label'
import { FormGroupColumn } from './Column'
import { FormItem } from './Column/Item'
import { styled } from 'inlines'
import { IconClose } from 'src/icons'
import { parseData, getValue } from './utils'
import { ObjectItemProps } from './types'

export const ObjectItem: FC<ObjectItemProps> = ({
  d,
  field,
  autoFocus,
  onChange,
  labelWidth,
  fieldWidth,
  onChangeField,
  hasChanges,
  valuesChanged,
  values,
  setChanges,
  alwaysAccept,
  style,
  parsedObjArray,
}) => {
  return (
    <Modal.Root>
      <Label>
        <Modal.Trigger>
          <Button>Open Overlay: {d}</Button>
        </Modal.Trigger>
      </Label>
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
                  <span
                    onClick={() => {
                      close()
                      close()
                    }}
                  >
                    <Breadcrumbs
                      data={field
                        ?.split('.')
                        .reduce(
                          (acc, curr, i) => ((acc[curr[i]] = curr), acc),
                          {}
                        )}
                    />
                  </span>
                  <Button
                    hideFocusState
                    size="medium"
                    // light
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
              <Modal.Body>
                {parsedObjArray.map((item) => {
                  if (item.type === 'object') {
                    return (
                      <FormGroupColumn
                        key={item.field}
                        field={item.field}
                        confirmationVariant="none"
                        autoFocus={autoFocus}
                        onChange={onChange}
                        parsedData={parseData({ [item.field]: item })}
                        labelWidth={labelWidth}
                        fieldWidth={fieldWidth}
                        onChangeField={onChangeField}
                        style={{
                          ...style,
                          width: '100%',
                        }}
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
                      objValues={item.values}
                      key={item.field}
                      autoFocus={autoFocus}
                      onChangeObj={onChange}
                      fieldWidth={fieldWidth}
                      width={labelWidth}
                      item={item}
                      onChange={onChangeField}
                      hasChanges={hasChanges}
                      valuesChanged={valuesChanged}
                      setChanges={setChanges}
                      alwaysAccept={alwaysAccept}
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
