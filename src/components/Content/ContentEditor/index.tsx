import { useClient, useData } from '@based/react'
import React, { useRef, useState } from 'react'
import {
  Input,
  Text,
  Label,
  Badge,
  border,
  Button,
  AddIcon,
  Toggle,
  DateTimePicker,
  FileUpload,
  GeoInput,
  useSchemaTypes,
  LoadingIcon,
  ArrayList,
  EditIcon,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDescriptor } from '../hooks/useDescriptor'
import { Dialog, useDialog } from '~/components/Dialog'
import { ContentMain } from '../ContentMain'
import isUrl from 'is-url-superb'
import isEmail from 'is-email'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'

const Reference = ({ id }) => {
  const { type, descriptor } = useDescriptor(id)

  return (
    <div
      style={{
        height: 48,
        border: border(1),
        color: 'white',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: 12,
      }}
    >
      <Badge color="text">{type}</Badge>
      <Text style={{ marginLeft: 8 }}>{descriptor}</Text>
    </div>
  )
}

const FileReference = ({
  value,
  label,
  description,
  style,
  onChange,
  multiple,
}) => {
  const client = useClient()
  if (value?.mimeType) {
    value.type = value.mimeType
  }

  return (
    <FileUpload
      style={style}
      label={label}
      indent
      descriptionBottom={description}
      space
      multiple={multiple}
      onChange={async (files) => {
        console.log('-->', files)

        const result = await Promise.all(
          files.map((file) => {
            console.log('file from map', file)
            return client.file(file)
          })
        )

        // console.log('The result -->', result)
        // console.log(
        //   'Test this -->',
        //   result.map((file) => file?.id)
        // )

        console.log('Result->', result)

        onChange(
          multiple
            ? result.map((file) => file?.id) || { $delete: true }
            : result[0]?.id || { $delete: true }
        )
      }}
      value={value}
    />
  )
}

const References = (props) => {
  const { id, field, label, description, value, style } = props

  if (props.meta?.refTypes?.includes('files')) {
    return <FileReference {...props} multiple />
  }

  const { open } = useDialog()
  return (
    <InputWrapper indent style={style}>
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
      {value?.map((id) => (
        <Reference key={id} id={id} />
      ))}
      <Button
        ghost
        icon={AddIcon}
        onClick={() => {
          open(
            <Dialog
              padding={0}
              style={{
                width: '100vw',
                height: 'calc(100vh - 60px)',
              }}
              pure
            >
              <ContentMain
                // label={`Add ${field}`}
                // query={{
                //   filters: [],
                //   target: id,
                //   field,
                // }}
                style={{ height: '100%' }}
              />
            </Dialog>
          )
        }}
      >
        Add item
      </Button>
    </InputWrapper>
  )
}

const SingleReference = (props) => {
  if (props.meta?.refTypes?.includes('file')) {
    return <FileReference {...props} />
  }
  const { label, description, value, style } = props

  return (
    <div style={style}>
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
      {value ? <Reference id={value} /> : null}{' '}
      <Button light icon={AddIcon}>
        Add {label.toLowerCase()}
      </Button>
    </div>
  )
}

// const text = {
//   default: ({ description, ...props }) => {
//     return <Input {...props} descriptionBottom={description} indent space />
//   },
// }

const object = {
  default: ({ label, description, schema, style, ...props }) => {
    console.log('Muthafuckon Object props -->', props)
    return (
      <ObjectList
        label={label}
        schema={schema}
        indent
        description={description}
        style={style}
        {...props}
      />
    )
  },
  geo: ({ description, ...props }) => {
    return (
      <GeoInput
        {...props}
        space
        indent
        descriptionBottom={description}
        mapboxApiAccessToken="pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg"
        mapboxStyle="mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge"
      />
    )
  },
}

const string = {
  default: ({ description, ...props }) => (
    <Input
      {...props}
      descriptionBottom={description}
      indent
      space
      noInterrupt
    />
  ),
  url: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      descriptionBottom={description}
      indent
      space
      noInterrupt
      error={(value) => {
        if (!isUrl(value) && value.length > 0) {
          return `Please enter a valid url https://...`
        }
      }}
      onChange={(value) => {
        if (meta.format === 'url') {
          if (isUrl(value) || value.length < 1) {
            onChange(value)
          }
        }
      }}
    />
  ),
  email: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      maxChars={200}
      descriptionBottom={description}
      indent
      space
      noInterrupt
      error={(value) => {
        if (!isEmail(value) && value.length > 0) {
          return `Please enter a valid email-address`
        }
      }}
      onChange={(value) => {
        if (meta.format === 'email') {
          if (isEmail(value) || value.length < 1) {
            onChange(value)
          }
        }
      }}
    />
  ),
}

const number = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        noInterrupt
        space
        type="number"
      />
    )
  },
}

const float = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        noInterrupt
        type="number"
        indent
        //  onChange={(e) => console.log(typeof e)}
      />
    )
  },
}

const int = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        // integer
        noInterrupt
        type="number"
        indent
      />
    )
  },
}

const digest = {
  default: ({ description, ...props }) => {
    // TODO make it type: digest
    return (
      <Input {...props} descriptionBottom={description} indent digest space />
    )
  },
}

const boolean = {
  default: ({ description, ...props }) => {
    return <Toggle indent descriptionBottom={description} space {...props} />
  },
}

const timestamp = {
  default: (props) => (
    <DateTimePicker
      indent
      {...props}
      type="number"
      value={props.value}
      error={(value) => {
        if (!value) {
          return 'Please enter a valid value'
        }
      }}
    />
  ),
}

const references = {
  default: References,
}

const reference = {
  default: SingleReference,
}

const json = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        indent
        jsonInput
      />
    )
  },
}

const array = {
  default: ({ description, onChange, ...props }) => {
    return (
      <ArrayList
        {...props}
        description={description}
        onChange={onChange}
        indent
        space
      />
    )
  },
}

const set = {
  default: ({ description, onChange, ...props }) => {
    return (
      <SetList
        description={description}
        onChange={onChange}
        indent
        space
        {...props}
      />
    )
  },
}

const components = {
  boolean,
  reference,
  references,
  string,
  number,
  float,
  int,
  digest,
  object,
  text: string,
  timestamp,
  json,
  array,
  set,
}

const ContentField = ({
  id,
  type,
  schema,
  field,
  index,
  language,
  onChange,
  autoFocus,
}) => {
  const { ui, format, description, name, refTypes } = schema.meta
  const dataRef = useRef<any>()
  const isText = type === 'text'
  const { data, loading } = useData(
    id
      ? {
          $id: id,
          // $language: type === 'text' ? language : undefined,
          [field]: refTypes?.includes('file')
            ? {
                mimeType: true,
                name: true,
                src: true,
                id: true,
              }
            : isText
            ? { [language]: true }
            : true,
        }
      : null
  )

  if (!loading) {
    dataRef.current = data
  }

  const Component =
    components[type]?.[ui || format || 'default'] || components[type]?.default

  if (
    field === 'createdAt' ||
    field === 'updatedAt' ||
    alwaysIgnore.has(field)
  ) {
    return null
  }

  if (Component === undefined) {
    return (
      <div style={{ order: index }}>
        {name} Missing component for type: {type}
      </div>
    )
  }

  // console.log({ name, index, id })

  return (
    <Component
      id={id}
      description={description}
      label={name}
      field={field}
      schema={schema}
      meta={schema.meta}
      style={{ order: index, marginBottom: 24 }}
      value={
        isText ? dataRef.current?.[field]?.[language] : dataRef.current?.[field]
      }
      autoFocus={autoFocus}
      onChange={(value) => {
        // if (value === '') {
        //   value = { $delete: true }
        // }
        if (isText) {
          onChange({ $language: language, [field]: value })
        } else {
          onChange({ [field]: value })
        }
      }}
    />
  )
}

export const ContentEditor = ({
  id,
  type,
  onChange,
  style = null,
  autoFocus = null,
  language = 'en',
}) => {
  let fields, loading

  if (id) {
    const s = useItemSchema(id)
    fields = s.fields
    loading = s.loading

    // console.log('Fields from ContentEditor ----->', fields)
    // console.log('------------------')
  } else {
    const s = useSchemaTypes()
    loading = s.loading
    if (!loading) {
      fields = s.types[type].fields
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <LoadingIcon />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {Object.keys(fields).map((field) => {
        const fieldSchema = fields[field]
        const { type, meta } = fields[field]

        // console.log('fieldSchema', fieldSchema)
        // console.log('type', type, meta)

        if (
          type === 'id' ||
          type === 'type' ||
          meta === undefined ||
          meta.hidden
        ) {
          return null
        }

        const index = meta.index

        return (
          <ContentField
            autoFocus={autoFocus === field}
            field={field}
            id={id}
            index={index}
            key={field}
            schema={fieldSchema}
            type={type}
            onChange={onChange}
            language={language}
          />
        )
      })}
    </div>
  )
}
