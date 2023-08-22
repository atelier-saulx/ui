import React, { useRef, useState } from 'react'
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
}

export function FileInput(props: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedImageObjectURL, setUploadedImageObjectURL] = useState<
    string | null
  >(null)
  const [showMore, setShowMore] = useState(false)

  function handleFileUpload(file: File) {
    setUploadedFile(file)

    if (file.type.startsWith('image/')) {
      setUploadedImageObjectURL(URL.createObjectURL(file))
    }
  }

  function clearUploadedFile() {
    setUploadedFile(null)
    setUploadedImageObjectURL(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return

          handleFileUpload(file)
        }}
      />
      <styled.div
        onClick={() => {
          if (!inputRef.current) return

          inputRef.current.click()
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()

          const file = e.dataTransfer.files[0]
          if (!file) return

          handleFileUpload(file)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        style={{
          height: uploadedImageObjectURL ? 64 : 40,
          boxSizing: 'border-box',
          borderRadius: 8,
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          '& > * + *': {
            marginLeft: uploadedImageObjectURL ? '12px' : '8px',
          },
          cursor: 'pointer',
          ...(uploadedFile
            ? {
                border: `1px solid ${color(
                  'inputBorder',
                  'neutralNormal',
                  'default'
                )}`,
                backgroundColor: 'transparent',
                '&:hover': {
                  border: `1px solid ${color(
                    'inputBorder',
                    'neutralHover',
                    'default'
                  )}`,
                },
              }
            : {
                border: `1px dashed ${color(
                  'inputBorder',
                  'neutralNormal',
                  'default'
                )}`,
                '&:hover': {
                  border: `1px dashed ${color(
                    'inputBorder',
                    'neutralHover',
                    'default'
                  )}`,
                },
                '&:active': {
                  border: `1px dashed ${color(
                    'inputBorder',
                    'active',
                    'default'
                  )}`,
                  backgroundColor: color('background', 'brand', 'surface'),
                },
              }),
          ...(props.disabled
            ? {
                opacity: '50%',
              }
            : {}),
        }}
      >
        {uploadedFile ? (
          <>
            {uploadedImageObjectURL ? (
              <img
                src={uploadedImageObjectURL}
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
            <Text weight="medium">{uploadedFile.name}</Text>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                    }}
                  >
                    {[
                      {
                        label: 'Delete',
                        Icon: IconDelete,
                        callback: clearUploadedFile,
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
        ) : (
          <>
            <IconUpload />
            <Text weight="medium">Upload new file</Text>
          </>
        )}
      </styled.div>
    </>
  )
}
