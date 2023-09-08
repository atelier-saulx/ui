import React, { FC, ReactNode, useEffect } from 'react'
import { useClient } from '@based/react'
import { prettyDate } from '@based/pretty-date'
import {
  Avatar,
  Badge,
  IconCheckLarge,
  Input,
  Text,
  Toggle,
  useCopyToClipboard,
} from '../..'

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
      onClick={
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
  setShiftKeyIndex?: number
}> = ({
  rowData,
  rowIndex,
  renderCounter,
  setRenderCounter,
  shiftKeyIsDown,
  setShiftKeyIndex,
}) => {
  // rowData.meta.selectedIndex = rowIndex

  return (
    <Input
      type="checkbox"
      value={rowData.meta.selected}
      onChange={(v) => {
        v ? (rowData.meta.selected = true) : (rowData.meta.selected = false)

        // if shift key is down
        shiftKeyIsDown ? setShiftKeyIndex(rowIndex) : null

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
  rowIndex: number
}> = ({ item, k, itemData, editable, rowIndex }) => {
  const client = useClient()

  return !editable ? (
    <Text weight="medium">
      {itemData} - {rowIndex}
    </Text>
  ) : (
    <Input
      type="text"
      defaultValue={itemData}
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
  setShiftKeyIndex?: () => void
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
}) => {
  //   console.log(type)
  //   console.log('Row', rowData)
  //   console.log(itemData)

  return type === 'author' ? (
    <>
      <Avatar size="small">{itemData}</Avatar>
      <Text weight="medium" style={{ marginLeft: 8 }}>
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
    />
  ) : type === 'id' ? (
    <IdBadge>{itemData}</IdBadge>
  ) : type === 'img' ? (
    <Avatar imgsrc={itemData} squared size="large" />
  ) : type === 'string' ? (
    <StringItem
      item={rowData}
      itemData={itemData}
      k={key}
      editable={editable}
      rowIndex={rowIndex}
    />
  ) : type === 'timestamp' ? (
    <Text>{prettyDate(itemData, 'date-time-human')}</Text>
  ) : (
    <>{itemData}</>
  )
}
