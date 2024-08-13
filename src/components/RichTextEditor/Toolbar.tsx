import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  ParagraphNode,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { useLayoutEffect, useRef, useState } from 'react'
import {
  $findMatchingParent,
  $insertNodeToNearestRoot,
  mergeRegister,
} from '@lexical/utils'
import { ImageNode } from './nodes/ImageNode.js'
import { EmbedNode } from './nodes/EmbedNode.js'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import { LinkNode } from '@lexical/link'
import { IconButton } from '../IconButton/index.js'
import { Menu } from '../Menu/index.js'
import { Separator } from '../Separator/index.js'
import { MiniSheet } from '../MiniSheet/index.js'
import { useClient } from '@based/react'

function ImageUploadButton({ onUpload }: { onUpload: (id: string) => void }) {
  const client = useClient()
  const fileInputRef = useRef<HTMLInputElement>()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <IconButton
        tooltip="Insert image"
        size="small"
        icon="image"
        onClick={() => {
          fileInputRef.current?.click()
        }}
        loading={loading}
      />
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
        onChange={async (e) => {
          const file = e.target.files[0]
          if (!file) return
          setLoading(true)

          try {
            const { id } = await client.stream('db:file-upload', {
              contents: file,
            })
            onUpload(id)
          } finally {
            setLoading(false)
          }
        }}
      />
    </>
  )
}

export function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [canRedo, setCanRedo] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [nodeType, setNodeType] = useState('')
  const [isLink, setIsLink] = useState(false)

  useLayoutEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection()
          if (!$isRangeSelection(selection)) return

          const anchorNode = selection.anchor.getNode()
          const anchorClosestRootNode =
            anchorNode.getKey() === 'root'
              ? anchorNode
              : $findMatchingParent(anchorNode, (e) =>
                  $isRootOrShadowRoot(e.getParent()),
                )
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          )

          if (parentList) {
            setNodeType(parentList.getListType())
            return
          }

          setNodeType(anchorClosestRootNode?.getType() ?? '')

          setIsLink(
            anchorNode instanceof LinkNode ||
              anchorNode.getParent() instanceof LinkNode,
          )
        })
      }),
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor])

  return (
    <div style={{ display: 'flex', height: 24, gap: 4 }}>
      <Menu>
        <Menu.Trigger>
          {({ open }) => (
            <IconButton
              tooltip="Select text style"
              size="small"
              icon="text-styling"
              trailChevron="down"
              forceHover={open}
            />
          )}
        </Menu.Trigger>
        <Menu.Items>
          <Menu.ToggleItem
            value={nodeType === 'heading'}
            onChange={() => {
              editor.update(() => {
                const selection = $getSelection()

                $setBlocksType(selection, () => new HeadingNode('h2'))
              })
            }}
          >
            Heading
          </Menu.ToggleItem>
          <Menu.ToggleItem
            value={nodeType === 'paragraph'}
            onChange={() => {
              editor.update(() => {
                const selection = $getSelection()

                $setBlocksType(selection, () => new ParagraphNode())
              })
            }}
          >
            Paragraph
          </Menu.ToggleItem>
        </Menu.Items>
      </Menu>
      <Separator orientation="vertical" />
      <IconButton tooltip="Bold" keyHint="Cmd+B" size="small" icon="bold" />
      <IconButton tooltip="Italic" keyHint="Cmd+I" size="small" icon="italic" />
      <IconButton
        tooltip="Underlined"
        keyHint="Cmd+U"
        size="small"
        icon="underline"
      />
      <IconButton
        tooltip="Strikethrough"
        keyHint="Cmd+Shift+X"
        size="small"
        icon="strikethrough"
      />
      <Separator orientation="vertical" />
      <IconButton
        tooltip={isLink ? 'Remove link' : 'Insert link'}
        keyHint="Cmd+K"
        size="small"
        icon={isLink ? 'link-off' : 'link'}
        onClick={() => {
          if (isLink) {
            editor.update(() => {
              const selection = $getSelection()
              if (!$isRangeSelection(selection)) return

              const nodes = selection.extract()

              nodes.forEach((node) => {
                const parent = node.getParent()

                if (parent instanceof LinkNode) {
                  const children = parent.getChildren()

                  for (let i = 0; i < children.length; i++) {
                    parent.insertBefore(children[i])
                  }

                  parent.remove()
                }
              })
            })

            return
          }

          const url = prompt('url')
          if (!url) return

          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return

            const nodes = selection.extract()

            nodes.forEach((node) => {
              if ($isElementNode(node)) {
                return
              }

              const linkNode = new LinkNode(url)
              node.insertBefore(linkNode)
              linkNode.append(node)
            })
          })
        }}
      />
      <ImageUploadButton
        onUpload={(id) => {
          editor.update(() => {
            const imageNode = new ImageNode(id)
            $insertNodeToNearestRoot(imageNode)
          })
        }}
      />
      <IconButton
        tooltip="Insert embed"
        size="small"
        icon="embed"
        onClick={() => {
          editor.update(() => {
            const embedNode = new EmbedNode(
              `<iframe width="560" height="315" src="https://www.youtube.com/embed/c0-hvjV2A5Y?si=UhGFOVC-FviwIb1C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
            )
            $insertNodeToNearestRoot(embedNode)
          })
        }}
      />
      <Separator orientation="vertical" />

      <MiniSheet>
        <MiniSheet.Trigger>
          {({ open }) => (
            <IconButton
              tooltip="Create list"
              size="small"
              icon="numbered-list"
              trailChevron="down"
              forceHover={open}
            />
          )}
        </MiniSheet.Trigger>
        <MiniSheet.Items>
          <MiniSheet.Item
            size="small"
            icon="bulleted-list"
            onClick={() => {
              editor.update(() => {
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
              })
            }}
          />
          <MiniSheet.Item
            size="small"
            icon="numbered-list"
            onClick={() => {
              editor.update(() => {
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
              })
            }}
          />
        </MiniSheet.Items>
      </MiniSheet>
      <Separator orientation="vertical" />
      <IconButton
        tooltip={nodeType === 'quote' ? 'Remove Quote' : 'Quote'}
        size="small"
        icon={nodeType === 'quote' ? 'quote-off' : 'quote'}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            $setBlocksType(selection, () =>
              nodeType === 'quote' ? new ParagraphNode() : new QuoteNode(),
            )
          })
        }}
      />
      <Separator orientation="vertical" />
      <IconButton
        tooltip="Undo"
        keyHint="Cmd+Z"
        size="small"
        icon="arrow-left-curved"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      />
      <IconButton
        tooltip="Redo"
        keyHint="Cmd+Y"
        size="small"
        icon="arrow-right-curved"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      />
    </div>
  )
}
