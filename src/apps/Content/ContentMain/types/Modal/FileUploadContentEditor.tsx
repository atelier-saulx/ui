import React, { FC } from 'react'
import { FileUpload, pathReader, Input } from '~'
import { BOTTOMSPACE } from './constants'

export const FileUploadContentEditor: FC<{
  item: {
    name?: string
    type: string
    meta?: any
    key: string
    mimeTypeKey?: string
  }
  name: string
  data: any
  state: any
  onChange: (fields: any) => void
}> = ({
  name,
  data,
  item: { type, meta, key, mimeTypeKey },
  onChange,
  state,
}) => {
  // const [progress, setProgress] = useState(null)

  const mimeType: string = mimeTypeKey
    ? pathReader(data, mimeTypeKey.split('.'))
    : undefined

  return (
    <div>
      <FileUpload
        label={name}
        descriptionBottom="Drag and drop or click to upload"
        description={
          meta?.description ??
          (meta?.mime?.length > 0
            ? `Allowed types: ${meta?.mime?.join(', ')}`
            : null)
        }
        looseMime
        // progress={progress}
        onChange={(files) => {
          if (files.length === 0) {
            onChange('')
          } else {
            onChange({ $files: files, $type: type, $key: key, $data: data })
          }
        }}
        indent
        value={
          state[key] === ''
            ? []
            : (state[key] && state[key].$files) ||
              (type === 'file' || type === 'reference'
                ? data[key]?.src
                  ? [
                      {
                        src: data[key]?.src,
                        type: data[key]?.mimeType,
                        name: data[key]?.name,
                      },
                    ]
                  : null
                : data[key]
                ? [
                    {
                      src: data[key],
                      type: mimeType,
                      name: data[key],
                    },
                  ]
                : null)
        }
        mime={mimeType ? [mimeType] : meta?.mime}
        style={{ marginBottom: 16 }}
      />
      {type === 'file' || type === 'reference' ? (
        <Input
          style={{ marginBottom: BOTTOMSPACE, width: 150 }}
          type="text"
          placeholder="Referenced ID"
          value={
            state[key] && typeof state[key] === 'string'
              ? state[key]
              : data[key]?.id
          }
          onChange={(v) => {
            onChange(v)
          }}
        />
      ) : null}
    </div>
  )
}
