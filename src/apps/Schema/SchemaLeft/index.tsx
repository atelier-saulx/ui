import { useQuery } from '@based/react'
import React, { FC, useState } from 'react'
import {
  Menu,
  Text,
  Button,
  AddIcon,
  useDialog,
  Badge,
  LoadingIcon,
  useContextState,
} from '~'
import { useSchema } from '~/apps/Schema/hooks/useSchema'
import { AddTypeModal } from '../AddTypeModal'

export const SystemLabel = ({ isActive = false, children }) => {
  const [hover, setHover] = useState(false)
  let thingy: boolean
  if (hover || isActive) {
    thingy = false
  } else {
    thingy = true
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
      <Badge ghost={thingy}>system</Badge>
    </div>
  )
}

export const SchemaLeft: FC = () => {
  const dialog = useDialog()
  const [db] = useContextState('db', 'default')
  const [type, setType] = useContextState('type')

  const { data: origins = [] } = useQuery('db:origins')

  const { schema, loading } = useSchema(db)

  // console.log('from schemaLeft??', schema)

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>
          <LoadingIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
          Loading schema
        </span>
      </div>
    )
  }

  const types = {
    root: schema?.rootType,
    ...schema?.types,
  }

  return (
    <Menu
      style={{
        paddingTop: 24,
        minWidth: 234,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      active={type}
      onChange={(v) => setType(v)}
      header={
        <Text typography="title2" style={{ marginBottom: 18 }}>
          Schema
        </Text>
      }
      data={[
        {
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 32,
              }}
            >
              <Text
                typography="caption600"
                color="text2"
                style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}
              >
                Types
              </Text>
              <Button
                ghost
                icon={AddIcon}
                onClick={() => {
                  dialog.open(<AddTypeModal />)
                }}
              >
                Add
              </Button>
            </div>
          ),
          items: Object.keys(types)
            .sort()
            .map((key) => {
              return {
                // TODO look into this
                label: types[key]?.meta?.name || key,
                value: key,
              }
            }),
        },
      ]}
    />
  )
}
