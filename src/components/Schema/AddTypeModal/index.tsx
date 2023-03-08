import { Input, Dialog, useRoute, useSchema } from '~'
import React, { useState, FC, useEffect } from 'react'
import safeTypeName from './safeTypeName'
import { generatePlural } from '~/utils'
import { useClient } from '@based/react'

export const AddTypeModal: FC<{ prefix: string }> = ({ prefix }) => {
  const { schema } = useSchema()
  const client = useClient()
  const db = 'default' // TODO
  const [name, setName] = useState('')
  const [pluralName, setPluralName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')
  const { setLocation } = useRoute()
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    if (name !== '') {
      setFilled(true)
    } else if (name === '') {
      setFilled(false)
    }
  })

  return (
    <Dialog label="Create a type">
      <Dialog.Body>
        <Input
          space
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
          space
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
          space
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
          type="text"
          multiline
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
                meta: {
                  name: name,
                  description,
                  pluralName,
                },
              }
              if (schema) {
                schema.types[type] = typeSchema
              }
              // @ts-ignore
              await client.call('db:set-schema', {
                db,
                schema: {
                  types: {
                    [type]: typeSchema,
                  },
                },
              })

              setLocation(`${prefix}/${type}`)
            }}
          >
            Create Model (Enter)
          </Dialog.Confirm>
        </div>
      </Dialog.Buttons>
    </Dialog>
  )
}
