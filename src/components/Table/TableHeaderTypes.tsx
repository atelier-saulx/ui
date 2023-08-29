import React, { FC, ReactNode } from 'react'
import { useClient } from '@based/react'
import { prettyDate } from '@based/pretty-date'
import {
  Avatar,
  Badge,
  Text,
  IconCheckLarge,
  useCopyToClipboard,
  Toggle,
  Checkbox,
} from '../..'

type TableHeaderTypesProps = {
  type: 'author' | 'boolean' | 'checkbox' | 'id' | 'img' | 'timestamp'
  itemData: any
  rowData: {}
  key: any
  renderCounter: any
  setRenderCounter: any
}

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
}> = ({ item, k, itemData }) => {
  const client = useClient()
  return (
    <Toggle
      value={itemData}
      //  disabled
      onClick={
        item.id
          ? (v) => {
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

const CheckboxItem: FC<{
  rowData?: any
  renderCounter?: any
  setRenderCounter?: any
}> = ({ rowData, renderCounter, setRenderCounter }) => {
  return (
    <Checkbox
      value={rowData.meta.selected}
      onClick={(v) => {
        v ? (rowData.meta.selected = true) : (rowData.meta.selected = false)
        setRenderCounter(renderCounter + 1)
      }}
    />
  )
}

export const TableHeaderTypes: FC<TableHeaderTypesProps> = ({
  type,
  rowData,
  itemData,
  key,
  renderCounter,
  setRenderCounter,
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
    <BooleanToggle item={rowData} itemData={itemData} k={key} />
  ) : type === 'checkbox' ? (
    <CheckboxItem
      rowData={rowData}
      renderCounter={renderCounter}
      setRenderCounter={setRenderCounter}
    />
  ) : type === 'id' ? (
    <IdBadge>{itemData}</IdBadge>
  ) : type === 'img' ? (
    <Avatar imgsrc={itemData} squared size="large" />
  ) : type === 'timestamp' ? (
    <Text>{prettyDate(itemData, 'date-time-human')}</Text>
  ) : (
    <>{itemData}</>
  )
}
