import React from 'react'
import { Dialog, Input } from '~'

export const addSingleRecordItem = async (
  tempObj,
  setTempObj,
  itemType,
  onChange,
  open
): Promise<any> => {
  // const itemType = 'string'

  let inputValue = ''
  let inputKey = ''
  const ok = await open(
    <Dialog
      label={`Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `}
    >
      <Input
        label="Key"
        style={{ marginBottom: 24 }}
        type="text"
        // digest={itemType === 'digest'}
        autoFocus
        value={inputKey}
        onChange={(e) => {
          inputKey = e
        }}
      />
      <Input
        label="Value"
        type={
          itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
        }
        autoFocus
        value={inputValue}
        onChange={(e) => {
          inputValue = String(e)
        }}
      />

      <Dialog.Buttons border>
        <Dialog.Cancel />
        <Dialog.Confirm
          onConfirm={() => {
            if (inputKey && typeof ok !== 'boolean') {
              if (itemType === 'string') {
                setTempObj({ ...tempObj, [inputKey]: inputValue })
                onChange({ ...ok, [inputKey]: inputValue })
                console.log({ ...ok, [inputKey]: inputValue })
                console.log('tempObj>??', tempObj)
              } else if (itemType === 'int') {
                setTempObj({ ...tempObj, [inputKey]: parseInt(inputValue) })
                onChange({ ...ok, [inputKey]: parseInt(inputValue) })
              } else if (itemType === 'float') {
                setTempObj({ ...tempObj, [inputKey]: parseFloat(inputValue) })
                onChange({ ...ok, [inputKey]: parseFloat(inputValue) })
              } else if (itemType === 'digest') {
                setTempObj({ ...tempObj, [inputKey]: inputValue })
                onChange({ ...ok, [inputKey]: inputValue })
              }
            }
          }}
        />
      </Dialog.Buttons>
    </Dialog>
  )
}
