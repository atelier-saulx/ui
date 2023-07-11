import React, { FC, useEffect, useState } from 'react'
import { Input } from '~/components/Input'
import { useUpdate } from '~/hooks/useUpdate'
import safeTypeName from '../AddTypeModal/safeTypeName'
import { FieldOptions } from '../types'

export const SharedGeneral: FC<{
  options: FieldOptions
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  field?: string
}> = ({ options, setDisabled, field: targetField }) => {
  const [field, setField] = useState(options.field)
  const update = useUpdate()

  useEffect(() => {
    if (
      !options.meta.name ||
      options.meta.name.length < 3 ||
      !options.field ||
      options.field.length < 3
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [options.field, options.meta.name])

  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Type something here"
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(value: string) => {
          options.meta.name = value
          if (!field) {
            options.field = safeTypeName(value)
          }
          update()
        }}
        value={options.meta.name}
        style={{ marginTop: 24, marginBottom: 24 }}
      />
      <Input
        disabled={!!targetField}
        type="text"
        placeholder="Type something here"
        label="Field name"
        description="API field - name used in the sdk and clients"
        onChange={(value: string) => {
          // TODO make own safeName for fields (dont use type)
          options.field = safeTypeName(value)
          setField(options.field)
        }}
        value={
          options.field ??
          (options.meta.name && safeTypeName(options.meta.name))
        }
        style={{ marginBottom: 24 }}
      />
      <Input
        type="multiline"
        label="Description (Optional)"
        description="Displays a hint for content editors"
        value={options.meta.description}
        onChange={(value) => {
          options.meta.description = value
          update()
        }}
      />
    </>
  )
}
