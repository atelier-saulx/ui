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
import { useLayoutEffect, useState } from 'react'
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
    <>
      <p>node type</p>
      <select
        value={nodeType}
        disabled={!nodeType}
        onChange={(e) => {
          const newType = e.target.value
          editor.update(() => {
            if (newType === 'bullet') {
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
              return
            }
            if (newType === 'number') {
              editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
              return
            }

            const selection = $getSelection()

            $setBlocksType(selection, () =>
              newType === 'heading'
                ? new HeadingNode('h2')
                : newType === 'quote'
                  ? new QuoteNode()
                  : new ParagraphNode(),
            )
          })
        }}
      >
        <option value="" disabled></option>
        <option value="paragraph">paragraph</option>
        <option value="heading">heading</option>
        <option value="quote">quote</option>
        <option value="bullet">bulleted list</option>
        <option value="number">numbered list</option>
      </select>
      <p>link: {isLink.toString()}</p>
      <button
        onClick={() => {
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
      >
        insert link
      </button>
      <button
        disabled={!isLink}
        onClick={() => {
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
        }}
      >
        remove link
      </button>
      <p>image</p>
      <button
        onClick={(id) => {
          editor.update(() => {
            const imageNode = new ImageNode('test123')
            $insertNodeToNearestRoot(imageNode)
          })
        }}
      >
        add
      </button>
      <p>embed</p>
      <button
        onClick={() => {
          editor.update(() => {
            const imageNode = new EmbedNode(
              `<iframe width="560" height="315" src="https://www.youtube.com/embed/c0-hvjV2A5Y?si=UhGFOVC-FviwIb1C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
            )
            $insertNodeToNearestRoot(imageNode)
          })
        }}
      >
        insert embed
      </button>
      <p>history</p>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      >
        undo
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      >
        redo
      </button>
      <p />
    </>
  )
}
