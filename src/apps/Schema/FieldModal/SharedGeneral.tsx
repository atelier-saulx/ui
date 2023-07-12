import React, { FC, useEffect, useState } from 'react'
import { Input } from '~/components/Input'
import { useUpdate } from '~/hooks/useUpdate'
import safeTypeName from '../AddTypeModal/safeTypeName'
import { BasedSchemaFieldShared } from '@based/schema'

type FieldOptions = {
  field?: string
  // meta?: any
  // items?: {
  //   type: string
  // }
}

export const SharedGeneral: FC<{
  options: BasedSchemaFieldShared & FieldOptions
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  field?: string
}> = ({ options, setDisabled, field: targetField }) => {
  const [field, setField] = useState(options.field)
  const update = useUpdate()

  useEffect(() => {
    if (
      !options.title ||
      options.title.length < 3 ||
      !options.field ||
      options.field.length < 3
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [options.field, options.title])

  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Your title for this field"
        label="Title"
        description="Name that will be displayed in the interface"
        onChange={(value: string) => {
          options.title = value
          if (!field) {
            options.field = safeTypeName(value)
          }
          update()
        }}
        value={options.title}
        style={{ marginTop: 24, marginBottom: 24 }}
      />
      {/* <Input
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
          (options.title && safeTypeName(options.title))
        }
        style={{ marginBottom: 24 }}
      /> */}
      <Input
        type="multiline"
        label="Description (Optional)"
        description="Displays a hint for content editors"
        value={options.description}
        onChange={(value) => {
          options.description = value
          update()
        }}
      />
    </>
  )
}
