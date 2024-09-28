import { useRef, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Button } from '../Button/index.js'
import { Icon } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { useDialog } from '../Dialog/index.js'
import { useClient } from '@based/react'
import { Loader } from '../Loader/index.js'
import { prettyNumber } from '@based/pretty-number'
import { styled } from 'inlines'
import { IconButton } from '../IconButton/index.js'
import { Menu } from '../Menu/index.js'

// TODO download button
// TODO individual errors per uploaded files
// TODO handle outside state/value correctly
// TODO correctly handle partial UIFiles

type UIFile = {
  name?: string
  src: string
  size?: number
}

type FileInptuProps = {
  value?: UIFile | UIFile[]
  onChange: (value: UIFile | UIFile[]) => void
  error?: string
}

function FileInput(props: FileInptuProps) {
  const dialog = useDialog()
  const client = useClient()
  const fileInputRef = useRef<HTMLInputElement>()
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<
    {
      tempId: string
      name: string
      size: number
      progress: number
      error?: string
    }[]
  >([])
  const [itemWithOpenMenuId, setItemWithOpenMenuId] = useState<string>()

  async function uploadFiles(files: File[]) {
    await Promise.allSettled(
      files.map(async (file) => {
        const tempId = crypto.randomUUID()
        setFiles((p) => [
          ...p,
          { tempId, name: file.name, size: file.size, progress: 0 },
        ])

        await client.stream(
          'db:file-upload',
          { contents: file, fileName: file.name, mimeType: file.type },
          (progress) => {
            setFiles((p) =>
              p.map((e) => (e.tempId === tempId ? { ...e, progress } : e)),
            )
          },
        )
      }),
    )
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          gap: 8,
          flexDirection: 'column',
        }}
      >
        <styled.div
          style={{
            width: '100%',
            border: `1px solid ${colors.neutral20}`,
            borderRadius: radius[12],
            padding: 8,
            maxHeight: 360,
            overflowY: 'auto',
          }}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)

            const files = e.dataTransfer.files
            if (!files.length) return

            uploadFiles([...e.dataTransfer.files])
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => {
            setDragOver(false)
          }}
        >
          {files.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 120 - 16 - 2,
                maxHeight: 512,
                width: '100%',
                background: dragOver ? colors.neutral10Adjusted : 'transparent',
                borderRadius: radius[4],
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  flexDirection: 'column',
                  color: colors.neutral60,
                }}
              >
                <Icon variant="page" />
                <Text variant="subtext-medium" color="inherit">
                  Drag your file(s) here
                </Text>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              {files.map((file) => (
                <styled.div
                  key={file.tempId}
                  data-menuopen={
                    itemWithOpenMenuId === file.tempId ? true : undefined
                  }
                  style={{
                    display: 'flex',
                    height: 44,
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: radius[8],
                    padding: '0 8px',
                    '&:hover, &[data-menuopen]': {
                      background: colors.neutral10Adjusted,
                    },
                    '&:hover .menuButton, &[data-menuopen] .menuButton': {
                      opacity: '100% !important',
                    },
                  }}
                >
                  <div>
                    {file.progress < 1 ? (
                      <Loader value={file.progress * 100} />
                    ) : (
                      <Icon variant="page" />
                    )}
                  </div>

                  <Text
                    maxWidth={200}
                    variant="display-medium"
                    color="neutral80"
                  >
                    {file.name}
                  </Text>
                  <div
                    style={{
                      width: 2,
                      height: 2,
                      background: colors.neutral60,
                      borderRadius: radius.full,
                    }}
                  />
                  <Text variant="display-regular" color="neutral60">
                    {prettyNumber(file.size, 'number-bytes').toUpperCase()}
                  </Text>
                  <div
                    className="menuButton"
                    style={{ marginLeft: 'auto', opacity: 0, display: 'flex' }}
                  >
                    <Menu
                      onOpenChange={(open) => {
                        setItemWithOpenMenuId(open ? file.tempId : undefined)
                      }}
                    >
                      <Menu.Trigger>
                        <IconButton size="small" icon="more-vertical" />
                      </Menu.Trigger>
                      <Menu.Items>
                        <Menu.Item leadIcon="arrow-down">Download</Menu.Item>
                        <Menu.Item
                          color="red"
                          leadIcon="delete"
                          onClick={() => {
                            setFiles((p) =>
                              p.filter((e) => e.tempId !== file.tempId),
                            )
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </styled.div>
              ))}
            </div>
          )}
        </styled.div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            leadIcon="arrow-up"
            variant="border"
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            {files.length ? 'Upload another' : 'Upload'}
          </Button>
          {!!files.length && (
            <Button
              leadIcon="close"
              variant="border"
              onClick={() => {
                dialog({
                  title: files.length > 1 ? 'Clear all files?' : 'Clear file?',
                  description:
                    files.length > 1
                      ? 'All uploaded and currently uploading files will be removed.'
                      : 'The file will be removed.',
                  dismissButtonLabel:
                    files.length > 1 ? 'Keep files' : 'Keep file',
                  actionButtonLabel: 'Clear',
                  color: 'red',
                  onAction: () => {
                    setFiles([])
                  },
                })
              }}
            >
              {files.length > 1 ? 'Clear all' : 'Clear'}
            </Button>
          )}
        </div>
      </div>
      <input
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files
          if (!files.length) return

          uploadFiles([...e.target.files])
        }}
      />
    </>
  )
}

export { FileInput }
export type { FileInptuProps }
