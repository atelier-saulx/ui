import { Input, Dialog, useSchema, useContextState } from '~'
import React, { useState, FC, useEffect } from 'react'
import safeTypeName from './safeTypeName'
import { generatePlural } from '~/utils'
import { useClient } from '@based/react'

export const AddTypeModal: FC = () => {
  const client = useClient()
  const [name, setName] = useState('')
  const [pluralName, setPluralName] = useState<string>('')
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')
  const [filled, setFilled] = useState(false)
  const [, setType] = useContextState('type')
  const [db] = useContextState('db', 'default')
  const { schema } = useSchema(db)

  useEffect(() => {
    if (name !== '') {
      setFilled(true)
    } else if (name === '') {
      setFilled(false)
    }
  }, [name])

  return (
    <Dialog label="Create a type">
      <Dialog.Body>
        <Input
          style={{ marginBottom: 24 }}
          type="text"
          autoFocus
          placeholder="Type something here"
          label="Display name"
          description="Name that will be displayed in the interface"
          onChange={(value) => {
            setName(value)
          }}
          value={name}
        />
        <Input
          style={{ marginBottom: 24 }}
          type="text"
          placeholder="Type something here"
          label="Display name plural"
          description="Plural display name"
          onChange={(value) => {
            setPluralName(value)
          }}
          value={
            pluralName ||
            (name || typeName ? generatePlural(name || typeName) : undefined)
          }
        />
        <Input
          style={{ marginBottom: 24 }}
          type="text"
          placeholder="Type something here"
          label="Type name"
          description="Api name used in the sdk and clients"
          onChange={(value) => {
            setTypeName(safeTypeName(value))
          }}
          value={typeName || safeTypeName(name)}
        />
        <Input
          type="multiline"
          label="Description"
          description="Displays a hint for content editors"
          value={description}
          onChange={(value) => {
            setDescription(value)
          }}
        />
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <div style={filled ? {} : { cursor: 'not-allowed' }}>
          <Dialog.Confirm
            style={
              filled
                ? {}
                : {
                    pointerEvents: 'none',
                    cursor: 'not-allowed',
                  }
            }
            onConfirm={async () => {
              const type = typeName || safeTypeName(name)
              const typeSchema = {
                fields: {},
                meta: {
                  name: name,
                  description,
                  pluralName,
                },
              }
              if (schema) {
                schema.types[type] = typeSchema
              }
              await client.call('db:set-schema', {
                mutate: true,
                db,
                schema: {
                  types: {
                    [type]: typeSchema,
                  },
                },
              })

              setType(type)
            }}
          >
            Create Model (Enter)
          </Dialog.Confirm>
        </div>
      </Dialog.Buttons>
    </Dialog>
  )
}
