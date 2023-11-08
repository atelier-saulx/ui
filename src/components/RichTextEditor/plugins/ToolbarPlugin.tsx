import React, { useEffect, useState } from 'react'
import { styled } from 'inlines'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $isParagraphNode,
  $isRootOrShadowRoot,
  $isTextNode,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { getSelectedNode } from '../utils'
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils'
import {
  $isListNode,
  ListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import { Button, Dropdown, Tooltip } from '../..'
import {
  IconCheckLarge,
  IconFormatBold,
  IconFormatItalic,
  IconFormatStrikethrough,
  IconFunction,
  IconImage,
  IconLayerThree,
  IconLink,
  IconListBullet,
  IconText,
} from '../../../icons'
import { $setBlocksType } from '@lexical/selection'
import { INSERT_IMAGE_COMMAND } from './ImagePlugin'
import { ImageUploadModal } from '../components/ImageUploadModal'
import { AddEmbedModal } from '../components/AddEmbedModal'
import { INSERT_EMBED_COMMAND } from './EmbedPlugin'

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [type, setType] = useState<
    'title' | 'heading' | 'subheading' | 'body' | 'bullet'
  >('body')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isStrikeThrough, setIsStrikeThrough] = useState(false)
  const [isLink, setIsLink] = useState(false)

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return

        setIsBold(selection.hasFormat('bold'))
        setIsItalic(selection.hasFormat('italic'))
        setIsStrikeThrough(selection.hasFormat('strikethrough'))

        const node = getSelectedNode(selection)
        const parent = node.getParent()
        setIsLink($isLinkNode(parent) || $isLinkNode(node))

        const anchorNode = selection.anchor.getNode()
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent()
                return parent !== null && $isRootOrShadowRoot(parent)
              })

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()

          if (type === 'bullet') {
            setType('bullet')
          }
        } else if ($isHeadingNode(element)) {
          switch (element.getTag()) {
            case 'h1': {
              setType('title')
              break
            }
            case 'h2': {
              setType('heading')
              break
            }
            case 'h3': {
              setType('subheading')
              break
            }
          }
        } else if ($isParagraphNode(element)) {
          setType('body')
        }
      })
    })
  }, [editor])

  return (
    <styled.div
      style={{
        position: 'absolute',
        top: 12,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        '& > * + *': {
          marginLeft: '4px',
        },
      }}
    >
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button size="small" color="system" icon={<IconText />} />
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            icon={type === 'title' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h1'))
                }
              })
            }}
          >
            Title
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'heading' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h2'))
                }
              })
            }}
          >
            Heading
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'subheading' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h3'))
                }
              })
            }}
          >
            Subheading
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'body' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createParagraphNode())
                }
              })
            }}
          >
            Body
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
      <Button
        size="small"
        color={isBold ? 'neutral' : 'system'}
        icon={<IconFormatBold />}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
            }
          })
        }}
      />
      <Button
        size="small"
        color={isItalic ? 'neutral' : 'system'}
        icon={<IconFormatItalic />}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }
          })
        }}
      />
      <Button
        size="small"
        color={isStrikeThrough ? 'neutral' : 'system'}
        icon={<IconFormatStrikethrough />}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }
          })
        }}
      />
      <Button
        size="small"
        color={isLink ? 'neutral' : 'system'}
        icon={<IconLink />}
        onClick={() => {
          editor.update(() => {
            editor.dispatchCommand(
              TOGGLE_LINK_COMMAND,
              isLink ? null : prompt('enter url')
            )
          })
        }}
      />
      <Button
        size="small"
        color={type === 'bullet' ? 'neutral' : 'system'}
        icon={<IconListBullet />}
        onClick={() => {
          editor.update(() => {
            editor.dispatchCommand(
              type === 'bullet'
                ? REMOVE_LIST_COMMAND
                : INSERT_UNORDERED_LIST_COMMAND,
              undefined
            )
          })
        }}
      />
      <ImageUploadModal
        onSave={({ file, caption }) => {
          editor.update(() => {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
              src: file.src,
              caption,
            })
          })
        }}
      >
        <Button size="small" color="system" icon={<IconImage />} />
      </ImageUploadModal>
      <AddEmbedModal
        onSave={({ html }) => {
          editor.update(() => {
            editor.dispatchCommand(INSERT_EMBED_COMMAND, {
              html,
            })
          })
        }}
      >
        <Button size="small" color="system" icon={<IconLayerThree />} />
      </AddEmbedModal>
    </styled.div>
  )
}
