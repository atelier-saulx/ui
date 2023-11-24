import React, { useRef, useState } from 'react'
import {
  IconAttachment,
  IconDelete,
  IconDownload,
  IconMoreHorizontal,
  IconOpenInNew,
  IconUpload,
} from '../../icons'
import { color } from '../../varsUtilities'
import { styled } from 'inlines'
import { useClient } from '@based/react'
import { Text } from '../Text'
import { Dropdown } from '..'

export type FileInputProps = {
  onChange?: (file?: { id: string; src: string }) => void
}

export function FileInput({ onChange }: FileInputProps) {
  const client = useClient()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'error'
  >('initial')

  // console.log(status)

  return (
    <styled.label
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        color: color('content', 'default', 'primary'),
      }}
    >
      <styled.div
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          ...(status === 'initial' && {
            cursor: 'pointer',
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
          }),
          ...(status === 'error' && {
            cursor: 'pointer',
            border: `1px dashed ${color('inputBorder', 'alert', 'default')}`,
            '&:hover': {
              border: `1px dashed ${color('inputBorder', 'alert', 'default')}`,
            },
          }),
          ...(status === 'uploading' && {
            border: `1px solid ${color(
              'inputBorder',
              'neutralNormal',
              'default'
            )}`,
          }),
          ...(status === 'success' && {
            border: `1px solid ${color(
              'inputBorder',
              'neutralNormal',
              'default'
            )}`,
          }),
        }}
      >
        {status === 'initial' && (
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              '& > * + *': { marginLeft: '8px' },
            }}
          >
            <IconUpload />
            <Text>Upload new file</Text>
          </styled.div>
        )}
        {status === 'error' && (
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              '& > * + *': { marginLeft: '8px' },
            }}
          >
            <IconUpload />
            <Text>An error has occured</Text>
          </styled.div>
        )}
        {status === 'uploading' && (
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              '& > * + *': { marginLeft: '8px' },
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ transform: 'rotate(270deg)' }}
            >
              <circle
                cx="10"
                cy="10"
                r="7"
                stroke={color('action', 'neutral', 'subtleNormal')}
                strokeWidth="2"
              />
              <circle
                cx="10"
                cy="10"
                r="7"
                stroke={color('action', 'primary', 'normal')}
                strokeWidth="2"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - (5 + uploadProgress * 0.95)}
              />
            </svg>
            <Text>Uploading...</Text>
          </styled.div>
        )}
        {status === 'success' && (
          <styled.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& > * + *': { marginLeft: '8px' },
            }}
          >
            {filePreview ? (
              <styled.img
                src={filePreview}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 4,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <IconAttachment />
            )}
            <Text>{file?.name}</Text>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <styled.div
                  type="button"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '2px',
                    borderRadius: 4,
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    color: color('content', 'default', 'primary'),
                    '&:hover': {
                      background: color('action', 'system', 'hover'),
                    },
                  }}
                >
                  <IconMoreHorizontal />
                </styled.div>
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item
                  icon={<IconOpenInNew />}
                  onClick={() => {
                    const url = URL.createObjectURL(file)
                    window.open(url, '_blank', 'noopener,noreferrer')
                  }}
                >
                  Open in new tab
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<IconDownload />}
                  onClick={() => {
                    const url = URL.createObjectURL(file)
                    const link = document.createElement('a')
                    link.download = file.name
                    link.href = url
                    link.click()
                  }}
                >
                  Download
                </Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item
                  icon={<IconDelete />}
                  onClick={() => {
                    setStatus('initial')
                    setFile(null)
                    setFilePreview(null)
                    setUploadProgress(0)
                    onChange?.()
                    if (inputRef.current) {
                      inputRef.current.value = ''
                    }
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>
          </styled.div>
        )}
      </styled.div>
      <styled.input
        type="file"
        ref={inputRef}
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return

          setFile(file)

          try {
            setStatus('uploading')

            const { id, src } = await client.stream(
              'db:file-upload',
              {
                contents: file,
              },
              (value) => {
                setUploadProgress(value * 100)
              }
            )

            setStatus('success')
            onChange?.({ id, src })

            if (file.type.includes('image/')) {
              const objectURL = URL.createObjectURL(file)
              setFilePreview(objectURL)
            }
          } catch {
            setStatus('error')
            setFile(null)
            setFilePreview(null)
            setUploadProgress(0)
            if (inputRef.current) {
              inputRef.current.value = ''
            }
          }
        }}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        }}
      />
    </styled.label>
  )
}
