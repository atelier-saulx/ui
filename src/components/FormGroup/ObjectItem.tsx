import React, { FC, useEffect, useState } from 'react'
import { Modal, Button, Breadcrumbs } from '../../components'
import { Label } from './Column/Label'
import { FormGroupColumn } from './Column'
import { FormItem } from './Column/Item'
import { styled } from 'inlines'
import { IconClose } from 'src/icons'
import { parseData, getValue } from './utils'
import { ObjectItemProps } from './types'
import { useRoute } from 'kabouter'

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
  parsedObjArray,
}) => {
  const route = useRoute('[object]')
  const object = route.query.object

  const [open, setOpen] = useState(false)

  const splitField = field.split('.')

  const openFunc = () => {
    route.setQuery({
      object: field.split('.').join('%'),
    })
    setOpen(true)
  }

  useEffect(() => {
    const objectStr = object as string
    if (open) {
      const thingy = objectStr.split('%')
      thingy.pop()
      const boolArr = thingy
        .filter((_, i) => i < splitField.length)
        .map((v, i) => v === splitField[i])
      if (boolArr.includes(false) || boolArr.length < splitField.length - 1) {
        setOpen(false)
      }
      if (objectStr === '') {
        setOpen(false)
      }
    }
  }, [object])

  const breadCrumbData = splitField.map((item, i) => {
    return [
      field
        .split('.')
        .filter((_, index) => index <= i)
        .join('%'),
      item,
    ]
  })

  const closeFunc = () => {
    route.setQuery({ object: splitField.slice(0, -1).join('%') })
  }

  return (
    <Modal.Root open={open}>
      <Modal.Trigger>
        <Button onClick={openFunc} size="small">
          Open Overlay: {field}
        </Button>
      </Modal.Trigger>
      <Modal.Content>
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

              <Breadcrumbs
                onChange={(v) => route.setQuery({ object: v })}
                data={Object.fromEntries(breadCrumbData)}
              />

              <Button
                hideFocusState
                size="medium"
                // light
                color="system"
                onClick={closeFunc}
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
              return (
                <FormItem
                  objValues={item.values}
                  key={item.field}
                  autoFocus={autoFocus}
                  onChangeObj={onChange}
                  fieldWidth={fieldWidth}
                  width={labelWidth}
                  item={{
                    ...item,
                    label:
                      item.field.split('.')[item.field.split('.').length - 1],
                  }}
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
            <Button onClick={closeFunc}>Close</Button>
            <Button onClick={closeFunc}>Confirm</Button>
          </Modal.Actions>
        </>
      </Modal.Content>
    </Modal.Root>
  )
}
