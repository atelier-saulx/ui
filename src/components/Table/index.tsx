// @ts-nocheck
import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import {
  Button,
  Text,
  AddIcon,
  Page,
  color,
  Toast,
  useToast,
  UploadIcon,
} from '~'
import { InfiniteListQueryResponse } from '../InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
import { HEADER_HEIGHT, ITEM_HEIGHT } from './constants'
import { TableFromQuery } from './TableFromQuery'
import { OnAction } from './types'
import { useRoute } from 'kabouter'
import { useClient } from '@based/react'

type Fields =
  | {
      [field: string]: string
    }
  | string[]

type TableProps = {
  fields?: Fields
  query?: (
    offset: number,
    limit: number,
    sortField: string,
    sortOrder: string
  ) => InfiniteListQueryResponse
  data?: object[]
  width?: number
  height?: number
  language?: string
  target?: string
  onAction?: OnAction
  isMultiref?: boolean
  onClick?: (
    item: { [key: string]: string },
    field: string,
    fieldType: string
  ) => void
  prefix?: string
  view?: string
}

const TableFromData = () => {
  return 'todo'
}

export const Table: FC<TableProps> = ({ style, ...props }) => {
  const [selectedRowCheckboxes, setSelectedRowCheckboxes] = useState([])
  const [tableIsEmpty, setTableIsEmpty] = useState(true)

  const [location, setLocation] = useLocation()
  // this is for the file drop if there are no files yet
  const [draggingOver, setDraggingOver] = useState(false)
  const toast = useToast()
  const client = useClient()
  const locationIsFile = location.split('/').pop() === 'file'

  // console.log('---------->', { ...props })

  // console.log(selectedRowCheckboxes)
  // console.log('Table ---> ', props)
  // console.log(Field)

  // file drop
  const handleFileDrop = async (e) => {
    if (locationIsFile && draggingOver) {
      setDraggingOver(false)
      e.preventDefault()
      e.stopPropagation()

      const files = Array.from(e.dataTransfer.files)
      console.log(files)

      const test = await Promise.all(
        files?.map((file) => {
          console.log('file 🐤', file)
          // make a toast pop for each file
          // TODO check if successfull upload i guess
          const notify = () => {
            toast.add(
              <Toast
                label="File uploaded"
                type="success"
                description={file.name}
              />
            )
          }

          notify()

          return client.file(file)
        })
      )
    } else {
      return null
    }
  }

  return (
    <styled.div
      style={{
        minHeight: HEADER_HEIGHT + ITEM_HEIGHT * 3,
        flexGrow: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        ...scrollAreaStyle,
        ...style,
      }}
    >
      {tableIsEmpty && !locationIsFile && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', marginBottom: '20px', gap: 4 }}>
            <Text>Create a new item for </Text>
            <Text typo="body600"> {`${props.view}`}.</Text>
          </div>
          <Button
            large
            icon={AddIcon}
            onClick={() => {
              // console.log('lable', label, 'view', view, 'prefix', prefix)
              setLocation(`${props.prefix}/create/${props.view}`)
            }}
            //  onClick={useContextMenu(CreateMenu, { prefix, types })}
          >
            Create Item
          </Button>
        </div>
      )}

      {locationIsFile && tableIsEmpty && (
        <Page
          onDrop={handleFileDrop}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDraggingOver(true)
          }}
          onDragLeave={() => {
            setDraggingOver(false)
          }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${color('border')}`,
            background:
              locationIsFile && draggingOver
                ? color('lightaccent')
                : color('background'),
          }}
        >
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div>
              <Text>There don't seem to be any files here yet.</Text>
            </div>
            <div style={{ display: 'flex', gap: 12, margin: '10px auto' }}>
              <UploadIcon /> <Text>Drop a file in here to start</Text>
            </div>
          </div>
        </Page>
      )}

      <AutoSizer>
        {({ width, height }) => {
          return props.query ? (
            <TableFromQuery
              style={{ minHeight: 200 }}
              width={width}
              height={height}
              {...props}
              selectedRowCheckboxes={selectedRowCheckboxes}
              setSelectedRowCheckboxes={setSelectedRowCheckboxes}
              setTableIsEmpty={setTableIsEmpty}
            />
          ) : (
            <TableFromData width={width} height={height} {...props} />
          )
        }}
      </AutoSizer>
    </styled.div>
  )
}
