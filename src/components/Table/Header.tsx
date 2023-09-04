import React, { FC, ReactNode } from 'react'
import { TableHeader } from './types'
import { styled, Checkbox, IconSort, Text, color } from '../..'

export const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  filteredHeaders: TableHeader<any>[]
  outline: boolean
  // performance??
  sortKey: any
  setSortKey: (k) => void
  clearAllRows: any
  selectAllRows: any
  selectedRows?: any
  data?: any
  renderCounter?: number
  setRenderCounter?: any
}> = ({
  headers,
  width,
  headerWidth,
  sortKey,
  setSortKey,
  clearAllRows,
  selectAllRows,
  selectedRows,
  data,
}) => {
  const children: ReactNode[] = []
  let total = 16

  // console.log('headers--> ❇️', headers)

  for (const header of headers) {
    const w = header.width ?? headerWidth
    children.push(
      <styled.div
        key={header.key}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          left: total,
          top: 0,
          height: 40,
          width: w,
        }}
      >
        {header.customLabelComponent ? (
          <header.customLabelComponent />
        ) : header.key === 'selected' ? (
          <Checkbox
            value={selectedRows.length === data.length}
            onChange={() => {
              if (selectedRows.length === data.length) {
                clearAllRows()
              } else {
                selectAllRows()
              }
            }}
          />
        ) : (
          <styled.div
            style={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => {
              if (sortKey.key !== header.key) {
                setSortKey({
                  key: header.key,
                  counter: sortKey.counter + 1,
                  ascOrder: true,
                })
              } else {
                setSortKey({
                  key: header.key,
                  counter: sortKey.counter + 1,
                  ascOrder: !sortKey.ascOrder,
                })
              }
            }}
          >
            {header.key === sortKey.key && (
              <IconSort style={{ marginRight: 8 }} />
            )}
            <Text
              color={header.key === sortKey.key ? 'brand' : 'default'}
              weight={header.key === sortKey.key ? 'strong' : 'medium'}
              light={header.key === sortKey.key ? false : true}
            >
              {header.label ?? header.key}
            </Text>
          </styled.div>
        )}
      </styled.div>
    )
    total += w
  }

  // console.log('💷', children)

  return (
    <styled.div
      style={{
        width,
        height: 40,
        position: 'relative',
      }}
    >
      {children}
    </styled.div>
  )
}
