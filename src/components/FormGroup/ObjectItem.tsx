import React, { FC, useEffect, useState } from 'react'
import { SidePanel, Button, Breadcrumbs } from '../../components'
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
      object: field.split('.').join('.'),
    })
    setOpen(true)
  }

  useEffect(() => {
    const objectStr = object as string
    if (open) {
      const thingy = objectStr.split('.')
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
        .join('.'),
      item,
    ]
  })

  const closeFunc = () => {
    route.setQuery({ object: splitField.slice(0, -1).join('.') })
  }

  return (
    <SidePanel.Root open={open}>
      <SidePanel.Trigger>
        <Button onClick={openFunc} size="small">
          Open Overlay: {field}
        </Button>
      </SidePanel.Trigger>
      <SidePanel.Content>
        <>
          <SidePanel.Title closeFunc={closeFunc}>
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
            </styled.div>
          </SidePanel.Title>
          <SidePanel.Body>
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
          </SidePanel.Body>
          <SidePanel.Actions>
            <Button keyboardShortcut="Esc" onClick={closeFunc}>
              Close
            </Button>
            <Button onClick={closeFunc}>Confirm</Button>
          </SidePanel.Actions>
        </>
      </SidePanel.Content>
    </SidePanel.Root>
  )
}
