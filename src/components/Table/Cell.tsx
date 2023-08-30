import React, { createElement } from 'react'
import { TableHeaderTypes } from './TableHeaderTypes'
import { Text, styled, color } from '../..'
import { prettyNumber } from '@based/pretty-number'
import { getByPath } from '@saulx/utils'

export const Cell = (props) => {
  const { columnIndex, rowIndex, style, data } = props
  const header = data.headers[columnIndex]
  const colls = data.headers.length
  const rowData = data.data[rowIndex]
  if (!rowData) {
    return <div />
  }

  const key = header.key

  let itemData
  if (Array.isArray(key)) {
    for (const k of key) {
      itemData = getByPath(rowData, k.split('.'))
      if (itemData) {
        break
      }
    }
  } else {
    itemData = getByPath(rowData, header.key.split('.'))
  }

  const onClick = header.onClick ?? props.data.onClick
  const type = header.type

  // Array.isArray(itemData) && console.log('itemDATA??', itemData)

  // Make this into a map /  a bit nicer
  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
      columnIndex,
      rowIndex,
    })
  ) : type ? (
    <TableHeaderTypes
      type={type}
      rowData={rowData}
      itemData={itemData}
      key={key}
      renderCounter={data.renderCounter}
      setRenderCounter={data.setRenderCounter}
    />
  ) : (
    <Text weight="medium">
      {type === 'bytes'
        ? prettyNumber(itemData, 'number-bytes')
        : typeof itemData === 'object'
        ? 'isObj'
        : itemData}{' '}
    </Text>
  )

  return (
    <styled.div
      onMouseEnter={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                x.style.background = 'yellow'
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                x.style.background = 'orange'
                x = x.nextSibling
              }
            }
          : null
      }
      onMouseLeave={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.nextSibling
              }
            }
          : null
      }
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        cursor: onClick ? 'pointer' : 'default',
        borderBottom: `1px solid ${color('border', 'default', 'strong')}`,
        boxSizing: 'border-box',
        ...style,
      }}
      onClick={
        onClick
          ? (e) => {
              onClick(e, rowData)
            }
          : null
      }
    >
      {body}
    </styled.div>
  )
}
