import React, { FC, useState, ReactNode, useRef } from 'react'
import { IconChevronRight } from '../../icons'
import { styled, Style } from 'inlines'
import { RowSpaced, Row, Column } from '../Styled'
import { Text } from '../Text'
import { border, color as genColor } from '../../varsUtilities'
import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { Thumbnail } from '../Thumbnail'
import { Badge } from '../Badge'
import { Avatar } from '../Avatar'

type FieldType =
  | 'badge'
  | 'image'
  | 'avatar'
  | NumberFormat
  | DateFormat
  | 'strong'
  | 'medium'
  | 'normal'
  | FC

type Field = {
  width?: number
  label?: ReactNode
  key?: string
  type?: FieldType
}

export type ListItemProps = {
  row: any
  fields: Field[]
  onClick?: (data: any) => void | Promise<void>
}

export type ListProps<T = any> = {
  style?: Style
  filter?: boolean
  label?: ReactNode
  description?: ReactNode
  data: T[]
  onClick?: (data: T) => void | Promise<void>
  action?: ReactNode
  fields?: Field[]
  // showFields?: boolean // headers later
}

export const ListItem: FC<ListItemProps> = ({ row, fields, onClick }) => {
  const children: ReactNode[] = fields.map(({ key, type, width }, i) => {
    let fieldData = key ? row[key] ?? '' : ''

    if (fieldData instanceof Date) {
      fieldData = fieldData.getTime()
    }

    if (typeof fieldData === 'object') {
      fieldData = JSON.stringify(fieldData)
    }

    let innerNode: ReactNode
    if (typeof type === 'function') {
      innerNode = type({
        row,
        fieldData,
        key,
        width,
      })
    } else if (
      !type ||
      type === 'medium' ||
      type === 'strong' ||
      type === 'normal'
    ) {
      innerNode = (
        <Text
          // @ts-ignore
          weight={type}
          selectable={onClick ? 'none' : 'text'}
          style={{
            minWidth: width ?? 0,
          }}
        >
          {fieldData}
        </Text>
      )
    } else if (type === 'image') {
      innerNode = (
        <Thumbnail
          color="neutral"
          size="small"
          src={fieldData}
          style={{
            minWidth: width ?? 0,
            maxWidth: width ?? 40,
          }}
        />
      )
    } else if (type === 'badge') {
      // hashColor
      innerNode = (
        <Badge copy copyValue={fieldData}>
          {fieldData}
        </Badge>
      )
    } else if (type === 'avatar') {
      // hashColor
      innerNode = <Avatar>{fieldData}</Avatar>
    } else {
      innerNode = (
        <Text
          valueFormat={type}
          light={type.includes('date') || type.includes('time')}
          selectable={onClick ? 'none' : 'text'}
          style={{
            minWidth: width ?? 0,
          }}
        >
          {fieldData}
        </Text>
      )
    }
    return <styled.div>{innerNode}</styled.div>
  })

  if (fields[0].type === 'image') {
    const img = children[0]
    const text = children[1]
    children[0] = (
      <Row key={0} style={{ gap: 16 }}>
        {img}
        {text}
      </Row>
    )
    children[1] = null
  }

  return (
    <styled.div
      style={{
        gap: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: border(1),
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {children}
    </styled.div>
  )
}

const castToType = (v: string): FieldType => {
  return v === 'price'
    ? 'number-euro'
    : v === 'bytes'
    ? 'number-bytes'
    : v === 'avatar'
    ? 'avatar'
    : v === 'image' || v === 'logo' || v === 'img'
    ? 'image'
    : v === 'createdAt' || v === 'updatedAt'
    ? 'date-time-human'
    : v === 'name' || v === 'title'
    ? 'medium'
    : 'normal'
}

export const List: FC<ListProps> = ({
  style,
  label,
  data = [],
  fields,
  description,
  onClick,
  action,
}) => {
  if (!fields) {
    if (data[0]) {
      fields = Object.keys(data[0]).map((key) => {
        const value = data[0][key]

        if (value instanceof Date) {
          return {
            key,
            type: 'date-time-human',
          }
        }

        // TODO: Can check type of fields as well
        return {
          key: key,
          type: castToType(key),
        }
      })
    }
  }

  return (
    <styled.div
      style={{
        borderBottom: border(1),
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        ...style,
      }}
    >
      {data.map((d, i) => {
        return <ListItem onClick={onClick} fields={fields} row={d} key={i} />
      })}
    </styled.div>
  )
}
