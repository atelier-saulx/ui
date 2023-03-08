import React, { useState } from 'react'
import {
  Input,
  Toggle,
  DateTimePicker,
  GeoInput,
  ArrayList,
  FileUpload,
} from '~'
import { SingleReference } from './References/SingleReference'
import { References } from './References/References'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'
import { RecordList } from '~/components/RecordList'
import isUrl from 'is-url-superb'
import { useClient } from '@based/react'
import isEmail from 'is-email'
import { prettyNumber } from '@based/pretty-number'
import { useRoute } from 'kabouter'

const object = {
  default: ({ prefix, schema, field, ...props }) => {
    const r = useRoute()
    return (
      <ObjectList
        indent
        schema={schema}
        {...props}
        onClick={() => {
          r.setLocation(`${prefix}.${field}`)
        }}
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

const number = {
  default: ({ description, meta, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        maxChars={meta.maxChar}
        indent
        //   noInterrupt
        space
        type="number"
      />
    )
  },
}

const float = {
  default: ({ description, meta, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        //   noInterrupt
        type="number"
        maxChars={meta.maxChar}
        indent
        //  onChange={(e) => console.log(typeof e)}
      />
    )
  },
  progress: ({ description, meta, ...props }) => {
    return (
      <Input
        space
        type="number"
        indent
        {...props}
        descriptionBottom={description}
        max={meta.progressMax}
        min={meta.progressMin}
      />
    )
  },
}

const int = {
  default: ({ description, meta, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        maxChars={meta.maxChar}
        space
        // integer
        //    noInterrupt
        type="number"
        indent
      />
    )
  },
  bytes: ({ description, meta, ...props }) => {
    const readOnly = meta?.readOnly
    const [focus, setFocus] = useState(false)

    return (
      <div
        style={{
          margin: '20 0',
          position: 'relative',
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <Input
          {...props}
          descriptionBottom={description}
          space
          // integer
          //    noInterrupt
          placeholder={prettyNumber(props.value, 'number-bytes')}
          // type={focus ? 'number' : 'text'}
          type="number"
          value={
            focus ? props.value : prettyNumber(props.value, 'number-bytes')
          }
          disabled={readOnly}
          indent
        />
      </div>
    )
  },
}

const digest = {
  default: ({ description, ...props }) => {
    // TODO make it type: digest
    return (
      <Input
        type="text"
        {...props}
        descriptionBottom={description}
        indent
        digest
        space
      />
    )
  },
}

const boolean = {
  default: ({ description, ...props }) => {
    return (
      <Toggle indent descriptionBottom={description} space="48px" {...props} />
    )
  },
}

const timestamp = {
  default: ({ description, ...props }) => (
    <DateTimePicker
      descriptionBottom={description}
      indent
      {...props}
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
        type="text"
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
        {...props}
      />
    )
  },
}

const record = {
  default: ({ prefix, field, label, value, description, schema, ...props }) => {
    const r = useRoute()

    return (
      <RecordList
        label={label}
        schema={schema}
        description={description}
        value={value}
        onClick={() => {
          r.setLocation(`${prefix}.${field}`)
        }}
        {...props}
      />
    )
  },
}

const url = {
  default: ({ description, meta, onChange, ...props }) => {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          ...props.style,
          alignItems: 'center',
        }}
      >
        {meta.name === 'thumb' && (
          <div style={{ height: 62, width: 62, backgroundColor: 'yellow' }} />
        )}
        <Input
          type="text"
          {...props}
          style={{ width: '100%' }}
          descriptionBottom={description}
          indent
          space
          // noInterrupt
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
      </div>
    )
  },
}

const string = {
  default: ({ description, meta, ...props }) => {
    const readOnly = meta?.readOnly

    return (
      <Input
        {...props}
        disabled={readOnly}
        descriptionBottom={description}
        // pattern="^[0-9]*$"
        pattern={meta.regex}
        maxChars={meta.maxChar}
        indent
        space
        // type="text" is for safari fix maybe it breaks smth
        type="text"
        //  noInterrupt
      />
    )
  },
  src: ({ description, meta, onChange, ...props }) => {
    // console.info(props)
    // console.info(props, '---', meta, props.value)

    const client = useClient()
    // meta for mime tyype fuck off
    const value = props.value
      ? [
          {
            name: props.value,
            src: props.value,
            type: meta.mimeType,
          },
        ]
      : []

    return (
      <FileUpload
        {...props.style}
        label={props.label}
        indent
        acceptedFileTypes={meta.mimeType}
        descriptionBottom={description}
        space
        onChange={async (files) => {
          if (!files) {
            onChange({ $delete: true })
            return
          }

          if (files.length !== 1) {
            return
          }

          // TODO: refactor to stream api when based cloud v1 is live!
          // @ts-ignore
          const x = await client.file(files[0])
          // @ts-ignore
          const { src } = await client.observeUntil(
            {
              $id: x.id,
              src: true,
            },
            (d) => {
              return d?.src
            }
          )
          console.info('SRC', src)
          onChange(src)
        }}
        value={value}
      />
    )
  },
  // url: ({ description, meta, onChange, ...props }) => (
  //   <Input
  //     {...props}
  //     descriptionBottom={description}
  //     indent
  //     space
  //     // noInterrupt
  //     error={(value) => {
  //       if (!isUrl(value) && value.length > 0) {
  //         return `Please enter a valid url https://...`
  //       }
  //     }}
  //     onChange={(value) => {
  //       if (meta.format === 'url') {
  //         if (isUrl(value) || value.length < 1) {
  //           onChange(value)
  //         }
  //       }
  //     }}
  //   />
  // ),
  email: ({ description, meta, onChange, ...props }) => {
    return (
      <Input
        type="email"
        {...props}
        maxChars={200}
        descriptionBottom={description}
        indent
        space
        //  noInterrupt
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
    )
  },
  markdown: ({ description, meta, ...props }) => {
    // console.log(meta.mustFill)
    // const consoleValue = (data) => console.log(data)
    // @ts-ignore
    // function consoleValue(x) {
    //   console.log(x)
    // }
    return (
      <Input
        type="markdown"
        {...props}
        descriptionBottom={description}
        pattern={meta.regex}
        // @ts-ignore
        // consoleFunc={consoleValue}
        space
        indent
        maxChars={meta.maxChar}
        markdownInput
        //    noInterrupt
      />
    )
  },
}

const text = string

// all selva types should be here else it can crash....

export {
  boolean,
  reference,
  references,
  string,
  number,
  float,
  int,
  digest,
  object,
  text,
  url,
  timestamp,
  json,
  array,
  set,
  record,
}
