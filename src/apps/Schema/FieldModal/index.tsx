import React, { FC, useRef, useState } from 'react'
import { templates } from '../templates'
import { Confirm } from './Confirm'
import { SharedGeneral } from './SharedGeneral'
import { useSchema } from '../hooks/useSchema'
import { Dialog, Tab, Tabs, Thumbnail, Text, styled } from '~'
import * as fieldSettings from './SpecificFieldSettings'
import { JsonTab } from './JsonTab'

type FieldOptions = {
  field?: string
  meta?: any
  items?: {
    type: string
  }
}

const specificFieldSettings = {
  string: fieldSettings.StringSettings,
  text: fieldSettings.StringSettings,
  number: fieldSettings.NumberSettings,
  integer: fieldSettings.NumberSettings,
  reference: fieldSettings.ReferenceSettings,
  references: fieldSettings.ReferenceSettings,
  array: fieldSettings.ArrayGeneral,
  set: fieldSettings.SetGeneral,
  record: fieldSettings.RecordGeneral,
}

export const FieldModal: FC<{
  type: string
  field?: string
  template: any
  path?: string[]
}> = ({ type, field, template, path = [] }) => {
  const { schema, loading } = useSchema()
  const [generalDisabled, setGeneralDisabled] = useState(true)
  const [specificDisabled, setSpecificDisabled] = useState(false)

  const optionsRef = useRef<FieldOptions>()

  if (loading) {
    return null
  }

  console.log('PATh??', path)
  console.log('FIELD>', field)

  const types = schema.types

  // @ts-ignore
  const fields =
    type === 'root'
      ? schema?.rootType?.fields
      : // @ts-ignore  is this an issue?
        path.reduce((fields, key) => fields[key], types[type].fields)

  console.log('fields??', fields)

  if (!template) {
    if (field) {
      const fieldSchema = fields[field]
      if (!fieldSchema) {
        console.warn('Field is not defined in schema')
        return null
      }
      template = fieldSchema.format || fieldSchema.type
    } else {
      console.warn('FieldModal needs template or field property')
      return null
    }
  }

  if (!optionsRef.current) {
    if (field) {
      optionsRef.current = {
        field,
        ...fields[field],
      }
    } else {
      // @ts-ignore
      optionsRef.current = {
        ...templates[template].schema,
      }
    }
  }

  const options = optionsRef.current

  const getValue = (path, obj) =>
    path?.split('.').reduce((acc, c) => acc && acc[c], obj)

  // if it is nested in a object
  if (field?.split('.').length > 1) {
    const path = field?.split('.')

    const currentFieldInObject = getValue(field, schema.types[type].fields)
    console.log('currentField in Object 🧔🏻‍♀️', currentFieldInObject)

    Object.assign(options, currentFieldInObject)
  }

  console.log('🚑 new options --> here', options)

  const { label, icon, color, description } = templates[template]
  const TypeSpecificGeneral = specificFieldSettings[template]

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
            <styled.div>
              <Text typography="subtext600">{label}</Text>
              <Text typography="body500" color="text2">
                {description}
              </Text>
            </styled.div>
          </div>
        </Dialog.Label>
        <Tabs activeTab={0}>
          <Tab label="General">
            <SharedGeneral
              options={options}
              setDisabled={setGeneralDisabled}
              field={field}
            />
          </Tab>
          {TypeSpecificGeneral && (
            <Tab label="Settings">
              <styled.div style={{ paddingTop: 24 }}>
                <TypeSpecificGeneral
                  options={options}
                  setDisabled={setSpecificDisabled}
                  field={field}
                  types={types}
                  templates={templates}
                />
              </styled.div>
            </Tab>
          )}

          <Tab label="JSON">
            {/* todo in object modal where is my tab??? */}
            <styled.div style={{ paddingTop: 24 }}>
              <JsonTab options={options} />
            </styled.div>
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
