import { useClient } from '@based/react'
import React, { FC, Fragment, useState } from 'react'
import { useContextMenu, useSchemaTypes } from '~/hooks'
import {
  Checkbox,
  MoreIcon,
  Text,
  ScrollArea,
  ContextItem,
  Button,
  AddIcon,
} from '~'
import { Link, useRoute } from 'kabouter'
import { Fields } from './Fields'
import { ChevronLeftIcon, ChevronRightIcon, WarningIcon } from '~/icons'
import { border } from '~/utils'
import { Dialog, useDialog } from '~/components/Dialog'

import { SelectFieldTypeModal } from '../SelectFieldTypeModal'

const EditMenu = ({ type }) => {
  const { open } = useDialog()
  const client = useClient()
  return (
    <ContextItem
      onClick={async () => {
        // const ok = await open(
        await open(
          <Dialog label="Delete Type" style={{ paddingTop: 20 }}>
            <div style={{}}>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 20,
                }}
              >
                <Text style={{ paddingRight: 4 }}>
                  Are you sure you want to delete the type{' '}
                </Text>
                <Text weight={700}>{type}</Text>
              </div>
              <Button
                light
                large
                color="reddish"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0 auto',
                  pointerEvents: 'none',
                  height: 40,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WarningIcon
                    color="red"
                    style={{ marginTop: 1.5, marginRight: 8 }}
                  />
                  <Text color="text">
                    Warning: Data stored in this field will be lost.
                  </Text>
                </div>
              </Button>
              <Dialog.Buttons border>
                <Dialog.Cancel />
                <Dialog.Confirm
                  color="red"
                  onConfirm={async () => {
                    await client.call('db:set-schema', {
                      schema: {
                        types: {
                          [type]: {
                            $delete: true,
                          },
                        },
                      },
                    })
                  }}
                >
                  {`Delete ${type}`}
                </Dialog.Confirm>
              </Dialog.Buttons>
            </div>
          </Dialog>
        )
      }}
    >
      Delete
    </ContextItem>
  )
}

const BackButton = () => {
  const route = useRoute()
  return (
    <Link
      href={route.location.split('/').slice(0, -1).join('/')}
      style={{ paddingRight: 8 }}
    >
      <ChevronLeftIcon />
    </Link>
  )
}

const Header = ({ back = null, children, type, path }) => {
  const openEditMenu = useContextMenu(EditMenu, {
    type,
    path,
  })

  const openSelectField = useContextMenu(
    SelectFieldTypeModal,
    {
      type,
      path,
    },
    { width: 924, placement: 'right' }
  )

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {back ? <BackButton /> : null}
        <Text
          size="22px"
          weight="700"
          style={{
            userSelect: 'none',
            lineHeight: '32px',
            marginRight: 8,
            // textTransform: 'capitalize',
          }}
        >
          {children}
        </Text>
        <Button
          ghost
          color="text"
          icon={
            <MoreIcon
              onClick={openEditMenu}
              style={{
                marginTop: 3,
                cursor: 'pointer',
              }}
            />
          }
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          textAlign="center"
          large
          icon={AddIcon}
          style={{ width: '100%' }}
          onClick={openSelectField}
        >
          Add Field
        </Button>
      </div>
    </div>
  )
}

const Footer = ({ type, prefix, name }) => {
  const route = useRoute()
  const path = route.location
    .substring(prefix.length + type.length + 2)
    .split('/')

  return (
    <div
      style={{
        borderTop: border(1),
        padding: '16px 32px ',
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link href={`${prefix}/${type}`}>
        <Text color="text2">{name}</Text>
      </Link>
      {path.map((field, index) => {
        return (
          <Fragment key={index}>
            <ChevronRightIcon style={{ flexShrink: 0, margin: 4 }} />
            <Link
              href={`${prefix}/${type}/${path.slice(0, index + 1).join('/')}`}
            >
              <Text>{field}</Text>
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}

const getMeta = (fields, path) => {
  let obj
  let isNested
  path.reduce((fields, key) => {
    const { type, properties, items } = fields[key]
    if (type) {
      if (isNested) {
        isNested = false
      } else {
        obj = fields[key]
        if (properties || items) {
          isNested = true
        }
      }
    }
    return fields[key]
  }, fields)
  return obj.meta
}

export const SchemaMain: FC<{
  type: string
  db: string
  path?: string[]
  prefix?: string
}> = ({ type, db = 'default', path = [], prefix = '' }) => {
  const { loading, types } = useSchemaTypes()
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const client = useClient()

  if (loading) {
    return null
  }

  const { meta = {}, fields } = types[type] || {}
  const { name } = meta

  if (!fields) {
    return null
  }

  const typeName = name || type
  let header, footer
  if (path.length) {
    header = (
      <Header back type={type} path={path}>
        {getMeta(fields, path)?.name || path[path.length - 1]}
      </Header>
    )
    footer = <Footer type={type} prefix={prefix} name={typeName} />
  } else {
    header = (
      <Header type={type} path={path}>
        {typeName}
      </Header>
    )
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          paddingBottom: 64,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {header}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 660, flexGrow: 1, margin: '0 48px' }}>
            <Checkbox
              style={{ marginTop: 36, marginBottom: 24, width: '100%' }}
              label="Show system fields"
              checked={includeSystemFields}
              onChange={toggleSystemFields}
            />
            <div>
              <Fields
                type={type}
                fields={path.reduce((fields, key) => fields[key], fields)}
                includeSystemFields={includeSystemFields}
                onChange={(val) => {
                  const update = {}
                  let from = fields
                  let dest = update
                  let i = 0
                  const l = path.length

                  while (i < l) {
                    const key = path[i++]
                    dest[key] = { ...from[key] }
                    dest = dest[key]
                    from = from[key]
                  }

                  Object.assign(dest, val)

                  return client
                    .call('basedUpdateSchema', {
                      types: {
                        [type]: {
                          fields: update,
                        },
                      },
                      db,
                    })
                    .catch((e) => console.error('error updating schema', e))
                }}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      {footer}
    </div>
  )
}
