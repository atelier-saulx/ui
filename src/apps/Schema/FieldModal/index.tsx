import React, { FC, useEffect, useRef, useState } from 'react'
import { Dialog } from '~/components/Dialog'
import { Tab, Tabs } from '~/components/Tabs'
import { Thumbnail } from '~/components/Thumbnail'
import { Text } from '~/components/Text'
import { templates, FieldTemplates } from '../templates'
import { Confirm } from './Confirm'

import { SharedGeneral } from './SharedGeneral'
import { useSchema } from '~/apps/_Schema'
import { MultiSelect, Select } from '~/components/Select'
import { Checkbox } from '~/components/Checkbox'
import { Input } from '~'

type FieldOptions = {
  field?: string
  meta?: any
  items?: {
    type: string
  }
}

const ReferencesGeneral = ({ types, options }) => {
  return (
    <>
      <MultiSelect
        placeholder="Type to reference"
        filterable
        style={{ marginTop: 16, width: 400 }}
        values={options.meta.refTypes || []}
        onChange={(values) => {
          options.meta.refTypes = values
        }}
        options={Object.keys(types)}
      />
    </>
  )
}

const ArrayGeneral = ({ options, field, setDisabled }) => {
  const itemsType = options.items?.type

  useEffect(() => {
    setDisabled(!itemsType)
  }, [itemsType])

  return (
    <>
      <Text style={{ marginTop: 24 }}>Value type</Text>
      <Select
        placeholder="Select value type"
        style={{
          opacity: field ? 0.6 : 1,
          pointerEvents: field ? 'none' : null,
          cursor: field ? 'not-allowed' : null,
          marginTop: 16,
          width: 400,
        }}
        filterable
        value={itemsType}
        onChange={(value) => {
          options.items = templates[value].schema
          setDisabled(false)
        }}
        options={[
          { value: 'digest', label: 'Digest' },
          { value: 'float', label: 'Float' },
          { value: 'int', label: 'Integer' },
          { value: 'object', label: 'Object' },
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const SetGeneral = ({ options, field, setDisabled }) => {
  const itemsType = options.items?.type

  useEffect(() => {
    setDisabled(!itemsType)
  }, [itemsType])

  return (
    <>
      <Text style={{ marginTop: 24 }}>Value type</Text>
      <Select
        placeholder="Select value type"
        style={{
          opacity: field ? 0.6 : 1,
          pointerEvents: field ? 'none' : null,
          cursor: field ? 'not-allowed' : null,
          marginTop: 16,
          width: 400,
        }}
        filterable
        value={itemsType}
        onChange={(value) => {
          options.items = templates[value].schema
          setDisabled(false)
        }}
        options={[
          { value: 'digest', label: 'Digest' },
          { value: 'float', label: 'Float' },
          { value: 'int', label: 'Integer' },
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const RecordGeneral = ({ options, field, setDisabled }) => {
  const valuesType = options.values?.type

  useEffect(() => {
    setDisabled(!valuesType)
  }, [valuesType])

  return (
    <>
      <Text style={{ marginTop: 24 }}>Value type</Text>
      <Select
        placeholder="Select value type"
        style={{
          opacity: field ? 0.6 : 1,
          pointerEvents: field ? 'none' : null,
          cursor: field ? 'not-allowed' : null,
          marginTop: 16,
          width: 400,
        }}
        filterable
        value={valuesType}
        onChange={(value) => {
          options.values = templates[value].schema
          setDisabled(false)
        }}
        options={[
          { value: 'digest', label: 'Digest' },
          { value: 'float', label: 'Float' },
          { value: 'int', label: 'Integer' },
          { value: 'object', label: 'Object' },
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const FileGeneral = ({ options }) => {
  return (
    <Checkbox
      style={{ marginTop: 24 }}
      label="Allow multiple files upload"
      value={options.multiple}
      onChange={(value) => {
        options.meta.multiple = value
        if (value) {
          // schema change from file to files
          options.meta.format = 'files'
          options.meta.refTypes = ['files']
          options.type = 'references'
        }
        // change template based on this reference for file and refrences for files
      }}
    />
  )
}

const general = {
  references: ReferencesGeneral,
  array: ArrayGeneral,
  record: RecordGeneral,
  set: SetGeneral,
  file: FileGeneral,
}

export const FieldModal: FC<
  | {
      type: string
      field: string
      template?: FieldTemplates
      path?: string[]
    }
  | {
      type: string
      field?: string
      template: FieldTemplates
      path?: string[]
    }
> = ({ type, field, template, path = [] }) => {
  const { schema, loading } = useSchema()
  const [generalDisabled, setGeneralDisabled] = useState(true)
  const [specificDisabled, setSpecificDisabled] = useState(false)
  const optionsRef = useRef<FieldOptions>()

  if (loading) {
    return null
  }

  const types = schema.types

  // @ts-ignore
  const fields =
    type === 'root'
      ? schema?.rootType?.fields
      : // @ts-ignore  is this an issue?
        path.reduce((fields, key) => fields[key], types[type].fields)

  if (!template) {
    if (field) {
      const fieldSchema = fields[field]
      if (!fieldSchema) {
        console.warn('Field is not defined in schema')
        return null
      }
      template = fieldSchema.meta?.format || fieldSchema.type
    } else {
      console.warn('FieldModal needs template or field property')
      return null
    }
  }

  if (!optionsRef.current) {
    if (field) {
      optionsRef.current = {
        field,
        meta: {},
        ...fields[field],
      }
    } else {
      // @ts-ignore
      optionsRef.current = {
        meta: {},
        ...templates[template].schema,
      }
    }
  }

  const options = optionsRef.current

  const { label, icon, color } = templates[template]
  const TypeSpecificGeneral = general[template]
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Label>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: 16,
              marginTop: 8,
            }}
          >
            <Thumbnail
              color={color}
              icon={icon}
              size={32}
              outline
              style={{ marginRight: 16 }}
            />
            <Text weight={600} size={16}>
              {label}
            </Text>
          </div>
        </Dialog.Label>
        <Tabs sameHeight activeTab={0}>
          <Tab label="General">
            <SharedGeneral
              options={options}
              setDisabled={setGeneralDisabled}
              field={field}
            />
            {TypeSpecificGeneral && (
              <TypeSpecificGeneral
                options={options}
                setDisabled={setSpecificDisabled}
                field={field}
                types={types}
              />
            )}
            {options.meta.format === 'src' && (
              <Select
                style={{ marginTop: 40 }}
                label="Mime type"
                // @ts-ignore TODO: why is mimetype not allowed
                value={options.meta.mimeType}
                options={['image', 'video', 'audio', 'document']}
                onChange={(e) => {
                  // @ts-ignore TODO: why is mimetype not allowed
                  options.meta.mimeType = e
                }}
              />
            )}
            {options.meta.format === 'progress' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 40,
                }}
              >
                <Input
                  type="number"
                  style={{ minWidth: 100 }}
                  placeholder="Min"
                  onChange={(e) => {
                    options.meta.progressMin = e
                  }}
                />
                <Text wrap>&</Text>
                <Input
                  type="number"
                  style={{ minWidth: 100 }}
                  placeholder="Max"
                  onChange={(e) => {
                    options.meta.progressMax = e
                  }}
                />
              </div>
            )}
          </Tab>
          <Tab label="Settings" style={{ overflow: 'auto' }}>
            <div style={{ marginTop: 24, marginBottom: 24, paddingLeft: 16 }}>
              <Checkbox
                style={{ marginBottom: 24 }}
                label="Can't be empty"
                description="Prevents saving an entry if this field is empty"
                onChange={(e) => {
                  options.meta.mustFill = e
                }}
              />
              <Checkbox
                style={{ marginBottom: 24 }}
                label="Set field as unique"
                description="Ensures that multiple entries can't have the same value for this field"
              />
              <Input
                type="number"
                style={{ marginBottom: 24 }}
                label="Limit character count"
                description="Specifies the maximum number of characters allowed in this field"
                onChange={(e) => {
                  options.meta.maxChar = e
                }}

                // input max chars = this
              />
              <Checkbox
                style={{ marginBottom: 24 }}
                label="Read only"
                description="Read only for you and me"
                onChange={(e) => {
                  options.meta.readOnly = e
                }}
              />

              {true && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 20,
                    marginTop: -12,
                    maxWidth: 450,
                    marginLeft: 24,
                  }}
                >
                  <Select
                    options={[
                      { value: 'atleast', label: 'At least' },
                      { value: 'between', label: 'Between' },
                      { value: 'nomorethan', label: 'No more than' },
                    ]}
                    placeholder="Set a limit"
                  />
                  <Input
                    type="number"
                    style={{ minWidth: 100 }}
                    placeholder="Min"
                  />
                  <Text wrap>&</Text>
                  <Input
                    type="number"
                    style={{ minWidth: 100 }}
                    placeholder="Max"
                  />
                </div>
              )}
              <Input
                type="text"
                style={{ marginBottom: 24 }}
                label="Match a specific pattern"
                description="Only accepts values that match a specific regular exporession"
                onChange={(e) => {
                  options.meta.regex = e
                }}
              />
              <Checkbox
                style={{ marginBottom: 24 }}
                label="Custom validation"
                description="Write a custom function"
              />
            </div>
          </Tab>
        </Tabs>
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel />
        <Confirm
          type={type}
          disabled={generalDisabled || specificDisabled}
          options={options}
          path={path}
        >
          {field ? 'Update' : 'Create'}
        </Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}
