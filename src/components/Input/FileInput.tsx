import React, { useEffect, useRef, useState } from 'react'
import {
  IconAttachment,
  IconDelete,
  IconMoreHorizontal,
  IconUpload,
} from '../../icons'
import { color } from '../../varsUtilities'
import { styled } from 'inlines'
import { Text } from '../Text'

export type FileInputProps = {
  disabled?: boolean
  multiple?: boolean
}

type FileListItemProps = {
  file: File
  onDelete: () => void
}

function FileListItem({ file, onDelete }: FileListItemProps) {
  const [showMore, setShowMore] = useState(false)
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null)

  useEffect(() => {
    if (!file.type.startsWith('image/')) return

    const url = URL.createObjectURL(file)
    setImagePreviewURL(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  return (
    <styled.div
      style={{
        height: imagePreviewURL ? 64 : 40,
        boxSizing: 'border-box',
        borderRadius: 8,
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        backgroundColor: 'transparent',
        '& > * + *': {
          paddingLeft: imagePreviewURL ? '12px' : '8px',
        },
      }}
    >
      <>
        {imagePreviewURL ? (
          <img
            src={imagePreviewURL}
            style={{
              height: 48,
              width: 48,
              borderRadius: 8,
              display: 'block',
              objectFit: 'cover',
            }}
          />
        ) : (
          <IconAttachment />
        )}
        <Text weight="medium">{file.name}</Text>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <styled.button
            onClick={(e) => {
              e.stopPropagation()
              setShowMore(true)
            }}
            style={{
              height: 24,
              width: 24,
              padding: 2,
              borderRadius: 4,
              border: 'none',
              background: color('action', 'system', 'normal'),
              '&:hover': {
                background: color('action', 'system', 'hover'),
              },
            }}
          >
            <IconMoreHorizontal />
          </styled.button>
          {showMore && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMore(false)
                }}
              />
              <styled.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 28,
                  widht: '100%',
                  background: color('background', 'default', 'surface'),
                  border: `1px solid ${color(
                    'inputBorder',
                    'neutralNormal',
                    'default'
                  )}`,
                  borderRadius: 8,
                  padding: 8,
                  '& > * + *': {
                    marginTop: '2px',
                  },
                  zIndex: 50,
                }}
              >
                {[
                  {
                    label: 'Delete',
                    Icon: IconDelete,
                    callback: onDelete,
                  },
                ].map((action) => (
                  <styled.div
                    key={action.label}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMore(false)
                      action.callback()
                    }}
                    style={{
                      position: 'relative',
                      userSelect: 'none',
                      cursor: 'pointer',
                      height: 32,
                      background: color('background', 'default', 'surface'),
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      padding: '0 12px 0 42px',
                      borderRadius: 8,
                      '&:hover': {
                        background: color('action', 'system', 'hover'),
                      },
                      '&:active': {
                        background: color('action', 'system', 'active'),
                      },
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 12,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <action.Icon />
                    </div>
                    {action.label}
                  </styled.div>
                ))}
              </styled.div>
            </>
          )}
        </div>
      </>
    </styled.div>
  )
}

export function FileInput({ disabled, multiple }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragState, setDragState] = useState(false)

  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragState(true)
    } else if (e.type === 'dragleave') {
      setDragState(false)
    }
  }
  useEffect(() => {
    console.log(files)
  })

  return (
    <>
      <styled.div style={{ '& > * + *': { marginTop: '8px' } }}>
        {files.map((file, index) => (
          <FileListItem
            key={file.name}
            file={file}
            onDelete={() => {
              setFiles((p) => p.filter((_, i) => i !== index))

              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          />
        ))}

        {(multiple || (!multiple && !files.length)) && (
          <styled.div
            onClick={() => {
              if (!inputRef.current) return

              inputRef.current.click()
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()

              const files = e.dataTransfer.files
              if (!files?.length) return

              setFiles((p) => [...p, ...(multiple ? files : [files[0]])])
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDrag(e)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDrag(e)
            }}
            onDragEnter={(e) => {}}
            style={{
              height: 40,
              boxSizing: 'border-box',
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              '& > * + *': {
                marginLeft: '8px',
              },
              cursor: 'pointer',
              border:
                files.length > 0
                  ? `1px solid ${color('inputBorder', 'active', 'default')}`
                  : dragState
                  ? `1px dashed ${color('inputBorder', 'active', 'default')}`
                  : `1px dashed ${color(
                      'inputBorder',
                      'neutralNormal',
                      'default'
                    )}`,
              // '&:hover': {
              //   border: `1px dashed ${color(
              //     'inputBorder',
              //     'neutralHover',
              //     'default'
              //   )}`,
              // },
              // '&:active': {
              // border: `1px dashed ${color(
              //   'inputBorder',
              //   'active',
              //   'default'
              // )}`,
              //   backgroundColor: color('background', 'brand', 'surface'),
              // },
              ...(disabled
                ? {
                    opacity: '50%',
                  }
                : {}),
            }}
          >
            <IconUpload />
            <Text weight="medium">Upload new file</Text>
          </styled.div>
        )}
      </styled.div>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => {
          const files = e.target.files
          if (!files?.length) return

          setFiles((p) => [...p, ...files])
        }}
      />
    </>
  )
}
