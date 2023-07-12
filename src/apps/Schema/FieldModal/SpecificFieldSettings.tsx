import React, { useEffect } from 'react'
import { Text, MultiSelect, Select, Checkbox, styled, Input } from '~'
import { templates, FieldTemplates } from '../templates'

export const StringSettings = ({ options }) => {
  console.log(options, 'options 🏀')

  return (
    <>
      <Select
        options={['email', 'hostname', 'ipv4', 'ipv6', 'uuid', 'uri']}
        label="String Format"
        style={{ marginBottom: 24 }}
        value={options.format}
        onChange={(e) => (options.format = e)}
      />
      <styled.div style={{ display: 'flex', marginBottom: 24 }}>
        <Input
          type="number"
          label="Minimum length"
          placeholder="0"
          style={{ marginRight: 12 }}
          value={options.minLength}
          onChange={(e) => (options.minLength = e)}
        />
        <Input
          type="number"
          label="Maximum length"
          placeholder="Max string length"
          value={options.maxLength}
          onChange={(e) => (options.maxLength = e)}
        />
      </styled.div>
      <Input
        type="text"
        label="Pattern"
        placeholder="^([a-z0-9]{4,7})$"
        value={options.pattern}
        onChange={(e) => (options.pattern = e)}
      />
    </>
  )
}

export const NumberSettings = ({ options }) => {
  return (
    <>
      <styled.div style={{ display: 'flex', marginBottom: 24 }}>
        <Input
          type="number"
          label="Minimum"
          placeholder="Min"
          style={{ marginRight: 12 }}
          value={options.minimum}
          onChange={(e) => (options.minimum = e)}
        />
        <Input
          type="number"
          label="Maximum"
          placeholder="Max"
          style={{ marginRight: 12 }}
          value={options.maximum}
          onChange={(e) => (options.maximum = e)}
        />
        <Input
          type="number"
          label="Multiple of"
          placeholder="Steps of"
          value={options.multipleOf}
          onChange={(e) => (options.multipleOf = e)}
        />
      </styled.div>
      <styled.div style={{ display: 'flex' }}>
        <Checkbox
          label="Exclusive Minimum"
          value={options.exclusiveMinimum}
          onChange={(e) => (options.exclusiveMinimum = e)}
          style={{ marginRight: 20 }}
        />
        <Checkbox
          label="Exclusive Maximum"
          value={options.exclusiveMaximum}
          onChange={(e) => (options.exclusiveMaximum = e)}
        />
      </styled.div>
    </>
  )
}

export const TextSettings = ({}) => {
  return (
    <>
      <styled.div style={{ display: 'flex', marginBottom: 24 }}>
        <Input
          type="number"
          label="Minimum length"
          placeholder="0"
          style={{ marginRight: 12 }}
        />
        <Input
          type="number"
          label="Maximum length"
          placeholder="Max text length"
        />
      </styled.div>
      <Input type="text" label="Pattern" placeholder="Enter a regex pattern" />
    </>
  )
}

export const ReferencesGeneral = ({ types, options }) => {
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

export const ArrayGeneral = ({ options, field, setDisabled }) => {
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

export const SetGeneral = ({ options, field, setDisabled }) => {
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

export const RecordGeneral = ({ options, field, setDisabled }) => {
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

export const FileGeneral = ({ options }) => {
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
