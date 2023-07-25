import React, { FC, useEffect, useState } from 'react'
import { useUpdate } from '~/hooks/useUpdate'
import safeTypeName from '../AddTypeModal/safeTypeName'
import { BasedSchemaFieldShared } from '@based/schema'
import { Checkbox, Input, styled } from '~'

type FieldOptions = {
  field?: string
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

  useEffect(() => {
    update()
  }, [JSON.stringify(options)])

  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Your title for this field"
        label="Title"
        description="Title that will be displayed in the interface"
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
      <styled.div style={{ display: 'flex', marginTop: 20 }}>
        <Checkbox
          label="Required"
          style={{ marginRight: 20 }}
          onChange={(e) => {
            e ? (options.isRequired = true) : (options.isRequired = false)
            update()
          }}
          value={options.isRequired}
        />
        <Checkbox
          label="Read only"
          style={{ marginRight: 20 }}
          onChange={(e) => {
            if (e) {
              options.readOnly = true
              options.writeOnly = false
            } else {
              options.readOnly = false
            }
            update()
          }}
          value={options.readOnly}
        />
        <Checkbox
          label="Write only"
          onChange={(e) => {
            if (e) {
              options.writeOnly = true
              options.readOnly = false
            } else {
              options.writeOnly = false
            }
            update()
          }}
          value={options.writeOnly}
        />
      </styled.div>
    </>
  )
}
