import { useClient } from '@based/react'
import React, { FC } from 'react'
import { useContextMenu } from '~/hooks'
import {
  MoreIcon,
  Text,
  border,
  color,
  DragDropIcon,
  Thumbnail,
  Badge,
  Button,
  useDialog,
  ContextItem,
  ChevronDownIcon,
  ContextDivider,
  AddIcon,
  useContextState,
} from '~'

import { systemFields, templates } from '../templates'
// import { FieldModal } from '../FieldModal'
// import { SelectFieldTypeModal } from '../SelectFieldTypeModal'
import { getDepth } from './utils'
import { useSchema } from '~/apps/_Schema/hooks/useSchema'
import { Dialog } from '~/components/Dialog'
import { WarningIcon } from '~/icons/WarningIcon'
import { BasedSchemaFieldType } from '@based/schema'

const EditMenu: FC<{
  type: string
  field: string
  template: BasedSchemaFieldType
  isObject: boolean
  path: string[]
  setPath: (path: string[]) => void
}> = ({ type, field, setPath, template, isObject, path }) => {
  const [db] = useContextState('db', 'default')
  const { schema } = useSchema(db)
  const client = useClient()
  const { open } = useDialog()

  return (
    <>
      <ContextItem
        onClick={() => {
          //      open(<FieldModal type={type} field={field} template={template} />)
        }}
      >
        Settings
      </ContextItem>
      {isObject ? (
        <ContextItem
          onClick={() => {
            let isField = true
            const filteredPath = path.filter((field) => {
              if (isField) {
                isField = false
                return true
              }
              if (field === 'properties') {
                isField = true
              }
              return false
            })
            setPath(filteredPath)
          }}
        >
          Configure Object
        </ContextItem>
      ) : null}
      <ContextDivider />
      <ContextItem
        onClick={async () => {
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
                    Are you sure you want to delete the field{' '}
                  </Text>
                  <Text weight={700}>{field}</Text>
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
                      const path = field.split('.')
                      const currentFields = schema.types[type].fields
                      const fields = {}
                      let from = currentFields
                      let dest = fields
                      let i = 0
                      const l = path.length

                      while (i < l) {
                        const key = path[i++]
                        dest[key] = { ...from[key] }
                        dest = dest[key]
                        // @ts-ignore
                        from = from[key]
                      }

                      // @ts-ignore
                      dest.$delete = true

                      await client.call('db:set-schema', {
                        db,
                        mutate: true,
                        schema: {
                          types: {
                            [type]: {
                              fields,
                            },
                          },
                        },
                      })
                    }}
                  >
                    {`Delete ${field}`}
                  </Dialog.Confirm>
                </Dialog.Buttons>
              </div>
            </Dialog>
          )
        }}
      >
        Delete
      </ContextItem>
    </>
  )
}

const AddObjectFieldButton = ({ type, path }) => {
  // const openSelectField = useContextMenu(
  //   SelectFieldTypeModal,
  //   {
  //     type,
  //     field: path,
  //   },
  //   { width: 924, placement: 'right' }
  // )
  return (
    <Button
      // onClick={openSelectField}
      ghost
      icon={AddIcon}
    >
      Add field
    </Button>
  )
}
export const Field = ({
  type,
  field,
  fields,
  isDragging = false,
  toggleExpand = null,
  collapsed = false,
}) => {
  const path = field.split('.')
  const fieldSchema = path.reduce((fields, key) => fields[key], fields)
  const { meta, type: fieldType } = fieldSchema
  const template = meta?.format || fieldType
  const { icon, color: iconColor } = templates[template] || {}
  const nestedType = (fieldSchema.items || fieldSchema.values)?.type
  const isObject = fieldType === 'object' || nestedType === 'object'
  const lastIndex = path.length - 1
  const objectPath: string[] = isObject
    ? fieldType === 'record'
      ? [...path, 'values', 'properties']
      : fieldType === 'array'
      ? [...path, 'items', 'properties']
      : [...path, 'properties']
    : path

  const [, setPath] = useContextState('field', [])

  const openEditMenu = useContextMenu(
    EditMenu,
    {
      type,
      field,
      template,
      isObject,
      path,
      setPath,
    },
    { position: 'left' }
  )

  return (
    // require extra div for smooth animation of nested props
    <div>
      <div
        style={{
          height: 50,
          opacity: systemFields.has(field) ? 0.5 : 1,
          borderRadius: 8,
          border: border(1),
          paddingLeft: 16,
          paddingRight: 16,
          marginLeft: getDepth(path) * 24,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color('background2dp'),
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        {isObject ? (
          <ChevronDownIcon
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleExpand?.(field)}
            style={{
              transform: isDragging || collapsed ? 'rotate(-90deg)' : null,
              cursor: 'pointer',
              position: 'absolute',
              left: -30,
              top: 16,
            }}
          />
        ) : null}
        <DragDropIcon style={{ marginRight: 12, flexShrink: 0 }} />
        <Thumbnail
          outline
          icon={icon}
          color={iconColor}
          size={32}
          style={{ flexShrink: 0 }}
        />
        <Text weight={600} style={{ marginLeft: 12, marginRight: 5 }}>
          {meta?.name}
        </Text>
        <Text color="text2" weight={400}>
          - {path[lastIndex]}
        </Text>
        <Badge color="text" style={{ marginLeft: 12 }}>
          {fieldType}
        </Badge>
        {systemFields.has(field) && (
          <Badge color="text" style={{ marginLeft: 12 }}>
            System Field
          </Badge>
        )}
        {nestedType ? (
          <Badge color="text" style={{ marginLeft: 12 }}>
            {nestedType}
          </Badge>
        ) : null}
        <div style={{ flexGrow: 1, width: 16 }} />
        {isObject ? (
          <AddObjectFieldButton type={type} path={objectPath} />
        ) : null}
        <Button
          color="text"
          ghost
          style={{ marginLeft: 16 }}
          onClick={openEditMenu}
          icon={<MoreIcon />}
        />
      </div>
    </div>
  )
}
