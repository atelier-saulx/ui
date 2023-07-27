import React, { useState, useEffect } from 'react'
import { MultiSelect, Select, Checkbox, styled, Input, Text } from '~'
import { BasedSchemaField } from '@based/schema'

export const StringSettings = ({ options }) => {
  const [reqLangs, setReqLangs] = useState(options.required)

  return (
    <>
      <Select
        options={[
          'email',
          'URL',
          'MACAddress',
          'IP',
          'IPRange',
          'FQDN',
          'IBAN',
          'BIC',
          'alpha',
          'alphaLocales',
          'alphanumeric',
          'alphanumericLocales',
          'passportNumber',
          'port',
          'lowercase',
          'uppercase',
          'ascii',
          'semVer',
          'surrogatePair',
          'IMEI',
          'hexadecimal',
          'octal',
          'hexColor',
          'rgbColor',
          'HSL',
          'ISRC',
          'MD5',
          'JWT',
          'UUID',
          'luhnNumber',
          'creditCard',
          'identityCard',
          'EAN',
          'ISIN',
          'ISBN',
          'ISSN',
          'mobilePhone',
          'mobilePhoneLocales',
          'postalCode',
          'postalCodeLocales',
          'ethereumAddress',
          'currency',
          'btcAddress',
          'ISO6391',
          'ISO8601',
          'RFC3339',
          'ISO31661Alpha2',
          'ISO31661Alpha3',
          'ISO4217',
          'base32',
          'base58',
          'base64',
          'dataURI',
          'magnetURI',
          'mimeType',
          'latLong',
          'slug',
          'strongPassword',
          'taxID',
          'licensePlate',
          'VAT',
        ]}
        label="String Format"
        style={{ marginBottom: 24 }}
        value={options.format}
        onChange={(e) => {
          options.format = e
        }}
      />
      <styled.div style={{ display: 'flex', marginBottom: 24 }}>
        <Input
          type="number"
          label="Min. length"
          placeholder="0"
          style={{ marginRight: 12, maxWidth: 124 }}
          value={options.minLength}
          onChange={(e) => (options.minLength = e)}
        />
        <Input
          type="number"
          label="Max. length"
          placeholder="280"
          value={options.maxLength}
          onChange={(e) => (options.maxLength = e)}
          style={{ marginRight: 12, maxWidth: 124 }}
        />
        <Input
          type="text"
          label="Pattern"
          placeholder="^([a-z0-9]{4,7})$"
          value={options.pattern}
          onChange={(e) => (options.pattern = e)}
          style={{ flexGrow: 1 }}
        />
      </styled.div>

      <Select
        options={[
          'text/html',
          'text/plain',
          'text/markdown',
          'image/png',
          'image/jpeg',
          'video/mp4',
          'string',
        ]}
        label="Content Media Type"
        value={options.contentMediaType}
        onChange={(e) => (options.contentMediaType = e)}
        style={{ marginBottom: 24 }}
      />

      {options.type === 'text' && (
        <MultiSelect
          style={{ marginBottom: 24 }}
          label="Required languages"
          values={reqLangs || []}
          options={['en', 'nl']}
          onChange={(e) => {
            if (e.length < 1) {
              options.required = null
              setReqLangs(e)
            } else {
              setReqLangs(e)
              options.required = e
            }
          }}
        />
      )}
      <Input
        type="text"
        label="Content Media Encoding"
        placeholder="base64"
        value={options.contentMediaEncoding}
        onChange={(e) => (options.contentMediaEncoding = e)}
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

export const TextSettings = ({ options }) => {
  return (
    <>
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
          placeholder="Max text length"
          value={options.maxLength}
          onChange={(e) => (options.maxLength = e)}
        />
      </styled.div>
      <Input
        type="text"
        label="Pattern"
        placeholder="Enter a regex pattern"
        value={options.pattern}
        onChange={(e) => (options.pattern = e)}
      />
    </>
  )
}

export const ReferenceSettings = ({ types, options }) => {
  const [tempValues, setTempValues] = useState(options.allowedTypes)

  return (
    <>
      <Input
        type="text"
        label="Bidirectional"
        placeholder="From field?"
        style={{ marginBottom: 24 }}
        value={options?.bidirectional?.fromField}
        onChange={(e) => {
          if (!options.bidirectional) {
            options.bidirectional = {}
          }
          options.bidirectional.fromField = e
        }}
      />
      <MultiSelect
        label="Allowed types"
        options={['file', 'snark', 'slurpie']}
        values={tempValues || []}
        filterable="create"
        onChange={(e) => {
          if (e.length < 1) {
            options.allowedTypes = null
            setTempValues(e)
          } else {
            setTempValues(e)
            options.allowedTypes = e
          }
        }}
      />
    </>
  )
}

export const templates: {
  [key: string]: BasedSchemaField
} = {}

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
          //  options.items = []
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
          options.items = {}
          options.items.type = value
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
          options.items = {}
          options.items.type = value
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

// export const FileGeneral = ({ options }) => {
//   return (
//     <Checkbox
//       style={{ marginTop: 24 }}
//       label="Allow multiple files upload"
//       value={options.multiple}
//       onChange={(value) => {
//         options.meta.multiple = value
//         if (value) {
//           // schema change from file to files
//           options.meta.format = 'files'
//           options.meta.refTypes = ['files']
//           options.type = 'references'
//         }
//         // change template based on this reference for file and refrences for files
//       }}
//     />
//   )
// }
