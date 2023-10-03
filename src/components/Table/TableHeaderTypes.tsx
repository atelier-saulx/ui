import React, { FC, ReactNode, useEffect } from 'react'
import { useClient } from '@based/react'
import { prettyDate } from '@based/pretty-date'
import { Avatar, Badge, Input, Text, Toggle } from '../../components'
import { IconCheckLarge } from 'src/icons'
import { useCopyToClipboard } from 'src/hooks'

const IdBadge: FC<{
  children: string
}> = ({ children }) => {
  const [copied, copy] = useCopyToClipboard(children)
  return (
    <Badge
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        copy()
      }}
      light
      icon={copied ? <IconCheckLarge /> : ''}
    >
      {children}
    </Badge>
  )
}

const BooleanToggle: FC<{
  item: any
  k: string
  itemData: boolean
  disabled?: boolean
}> = ({ item, k, itemData, disabled }) => {
  const client = useClient()
  return (
    <Toggle
      value={itemData}
      disabled={disabled}
      onChange={
        item.id
          ? (v) => {
              console.log('hellow??')
              const s: any = { $id: item.id }
              if (Array.isArray(k)) {
                let t = s
                for (let i = 0; i < k.length; i++) {
                  if (i === k.length - 1) {
                    t[k[i]] = v
                  } else if (!t[k[i]]) {
                    t = t[k[i]] = {}
                  }
                }
              } else {
                s[k] = v
              }
              return client.call('db:set', s)
            }
          : null
      }
    />
  )
}

const CheckboxSelectItem: FC<{
  rowData?: any
  rowIndex?: number
  renderCounter?: any
  setRenderCounter?: any
  shiftKeyIsDown?: boolean
  setShiftKeyIndex: (n: number | undefined) => void | undefined
  shiftKeyIndex?: number
  setLastShiftKeyIndex: (n: number | undefined) => void | undefined
}> = ({
  rowData,
  rowIndex,
  renderCounter,
  setRenderCounter,
  shiftKeyIsDown,
  setShiftKeyIndex,
  shiftKeyIndex,
  setLastShiftKeyIndex,
}) => {
  // rowData.meta.selectedIndex = rowIndex

  return (
    <Input
      type="checkbox"
      value={rowData.meta.selected}
      onChange={(v) => {
        v ? (rowData.meta.selected = true) : (rowData.meta.selected = false)

        // if shift key is down
        shiftKeyIndex === undefined
          ? setShiftKeyIndex(rowIndex)
          : shiftKeyIsDown && typeof shiftKeyIndex === 'number'
          ? setLastShiftKeyIndex(rowIndex)
          : setShiftKeyIndex(rowIndex)

        setRenderCounter(renderCounter + 1)
      }}
    />
  )
}

const StringItem: FC<{
  item: any
  k: string
  itemData: string
  editable?: boolean
}> = ({ item, k, itemData, editable }) => {
  const client = useClient()

  return !editable ? (
    <Text weight="medium">{itemData}</Text>
  ) : (
    <Input
      type="text"
      value={itemData}
      onChange={
        item.id
          ? (v) => {
              // Check this logic
              // console.log(v)
              // const s: any = { $id: item.id }
              // console.log(s)
              // if (Array.isArray(k)) {
              //   let t = s
              //   for (let i = 0; i < k.length; i++) {
              //     if (i === k.length - 1) {
              //       t[k[i]] = v
              //     } else if (!t[k[i]]) {
              //       t = t[k[i]] = {}
              //     }
              //   }
              // } else {
              //   console.log('reach this', v)
              //   s[k] = v
              // }
              // return client.call('db:set', s)
            }
          : null
      }
    />
  )
}

type TableHeaderTypesProps = {
  type:
    | 'author'
    | 'boolean'
    | 'checkbox'
    | 'CheckboxSelectItem'
    | 'id'
    | 'img'
    | 'image'
    | 'number'
    | 'string'
    | 'timestamp'
  itemData: any
  rowData: {}
  rowIndex: number
  key: any
  renderCounter: any
  setRenderCounter: any
  editable?: boolean
  shiftKeyIsDown?: boolean
  setShiftKeyIndex?: (num: number | undefined) => void | undefined
  shiftKeyIndex?: number
  setLastShiftKeyIndex?: (num: number | undefined) => void | undefined
}

export const TableHeaderTypes: FC<TableHeaderTypesProps> = ({
  type,
  rowData,
  rowIndex,
  itemData,
  key,
  renderCounter,
  setRenderCounter,
  editable,
  shiftKeyIsDown,
  setShiftKeyIndex,
  shiftKeyIndex,
  setLastShiftKeyIndex,
}) => {
  //   console.log(type)
  //   console.log('Row', rowData)
  //   console.log(itemData)

  return type === 'author' ? (
    <>
      <Avatar size="small">{itemData}</Avatar>
      <Text weight="medium" style={{ marginLeft: 8 }} truncate>
        {itemData}
      </Text>
    </>
  ) : type === 'boolean' ? (
    <BooleanToggle
      item={rowData}
      itemData={itemData}
      k={key}
      disabled={!editable}
    />
  ) : type === 'CheckboxSelectItem' ? (
    <CheckboxSelectItem
      rowData={rowData}
      rowIndex={rowIndex}
      renderCounter={renderCounter}
      setRenderCounter={setRenderCounter}
      shiftKeyIsDown={shiftKeyIsDown}
      setShiftKeyIndex={setShiftKeyIndex}
      shiftKeyIndex={shiftKeyIndex}
      setLastShiftKeyIndex={setLastShiftKeyIndex}
    />
  ) : type === 'id' ? (
    <IdBadge>{itemData}</IdBadge>
  ) : type === 'img' || type === 'image' ? (
    <Avatar src={itemData} squared size="large" color="grey" light />
  ) : type === 'string' ? (
    <StringItem
      item={rowData}
      itemData={itemData}
      k={key}
      editable={editable}
    />
  ) : type === 'timestamp' ? (
    <Text>{prettyDate(itemData, 'date-time-human')}</Text>
  ) : (
    <>{itemData}</>
  )
}
