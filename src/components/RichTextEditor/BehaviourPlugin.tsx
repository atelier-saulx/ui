import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLayoutEffect } from 'react'
import { mergeRegister } from '@lexical/utils'
import {
  $createNodeSelection,
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $setSelection,
  KEY_ARROW_UP_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  COMMAND_PRIORITY_LOW,
  $isRangeSelection,
  ParagraphNode,
  TextNode,
} from 'lexical'
import { $createHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text'
import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'

export function BehaviourPlugin({
  onChange,
}: {
  onChange?: (state: string) => void
}): null {
  const [editor] = useLexicalComposerContext()

  useLayoutEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (onChange) {
          onChange(JSON.stringify(editorState.toJSON()))
        }
      }),
      editor.registerUpdateListener(() => {
        editor.update(() => {
          if ($getRoot().isEmpty()) {
            const paragraph = $createParagraphNode()
            $getRoot().append(paragraph)
            paragraph.select()
          }
        })
      }),
      // TODO make sure only the allowed formats are left on the node.
      // editor.registerNodeTransform(TextNode, (node) => {
      //   if (node.getFormat() !== 0) {
      //     node.setFormat(0)
      //   }
      // }),
      editor.registerNodeTransform(HeadingNode, (node) => {
        const nodes = node.getChildren()

        nodes.forEach((node) => {
          if (node instanceof LinkNode) {
            const textNodes = node.getChildren()

            for (let i = 0; i < textNodes.length; i++) {
              node.insertBefore(textNodes[i])
            }

            node.remove()
          }
        })

        if (node.getTag() !== 'h2') {
          const newNode = $createHeadingNode('h2')
          newNode.append(...node.getChildren())
          node.insertBefore(newNode)
          node.remove()
        }

        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerNodeTransform(ParagraphNode, (node) => {
        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerNodeTransform(QuoteNode, (node) => {
        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerNodeTransform(LinkNode, (node) => {
        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerNodeTransform(ListNode, (node) => {
        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerNodeTransform(ListItemNode, (node) => {
        if (node.getFormatType() !== 'left') {
          node.setFormat('left')
        }
        if (node.getIndent() !== 0) {
          node.setIndent(0)
        }
        if (node.getDirection() != 'ltr') {
          node.setDirection('ltr')
        }
      }),
      editor.registerCommand<KeyboardEvent>(
        KEY_BACKSPACE_COMMAND,
        (event) => {
          const selection = $getSelection()

          if (!$isNodeSelection(selection)) {
            return false
          }

          const node = selection.getNodes()[0]
          const prev = node.getPreviousSibling()
          const next = node.getNextSibling()

          if (!prev && !next) {
            const paragraph = $createParagraphNode()
            $getRoot().append(paragraph)
            paragraph.select()
          }

          event.preventDefault()
          node.remove()

          return true
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_DELETE_COMMAND,
        () => {
          const selection = $getSelection()

          if (!$isNodeSelection(selection)) {
            return false
          }

          const node = selection.getNodes()[0]
          const prev = node.getPreviousSibling()
          const next = node.getNextSibling()

          if (!prev && !next) {
            const paragraph = $createParagraphNode()
            $getRoot().append(paragraph)
            paragraph.select()
          }

          node.remove()

          return true
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_UP_COMMAND,
        (event) => {
          const selection = $getSelection()

          if ($isNodeSelection(selection)) {
            const currentNode = selection.getNodes()[0]
            const previousSibling = currentNode.getPreviousSibling()

            if (!previousSibling) {
              event.preventDefault()
              const paragraphNode = $createParagraphNode()
              currentNode.insertBefore(paragraphNode)
              paragraphNode.select()

              return true
            }

            if ($isDecoratorNode(previousSibling)) {
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(previousSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }

            event.preventDefault()
            previousSibling?.selectEnd()
            return true
          }

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const topLevelElement = selection.anchor
                .getNode()
                .getTopLevelElement()
              const prevSibling = topLevelElement?.getPreviousSibling()

              if ($isDecoratorNode(prevSibling)) {
                const nodeSelection = $createNodeSelection()
                nodeSelection.add(prevSibling.getKey())
                $setSelection(nodeSelection)
                return true
              }
            }
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_DOWN_COMMAND,
        (event) => {
          const selection = $getSelection()

          if ($isNodeSelection(selection)) {
            const currentNode = selection.getNodes()[0]
            const nextSibling = currentNode.getNextSibling()

            if (!nextSibling) {
              event.preventDefault()
              const paragraphNode = $createParagraphNode()
              currentNode.insertAfter(paragraphNode)
              paragraphNode.select()

              return true
            }

            if ($isDecoratorNode(nextSibling)) {
              event.preventDefault()
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(nextSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }

            event.preventDefault()
            nextSibling?.selectStart()
            return true
          }

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const topLevelElement = selection.anchor
                .getNode()
                .getTopLevelElement()
              const nextSibling = topLevelElement?.getNextSibling()

              if ($isDecoratorNode(nextSibling)) {
                const nodeSelection = $createNodeSelection()
                nodeSelection.add(nextSibling.getKey())
                $setSelection(nodeSelection)
                return true
              }
            }
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_RIGHT_COMMAND,
        (event) => {
          const selection = $getSelection()

          if ($isNodeSelection(selection)) {
            const currentNode = selection.getNodes()[0]
            const nextSibling = currentNode.getNextSibling()

            if (!nextSibling) {
              event.preventDefault()
              const paragraphNode = $createParagraphNode()
              currentNode.insertAfter(paragraphNode)
              paragraphNode.select()

              return true
            }

            if ($isDecoratorNode(nextSibling)) {
              event.preventDefault()
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(nextSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }

            event.preventDefault()
            nextSibling?.selectStart()
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_LEFT_COMMAND,
        (event) => {
          const selection = $getSelection()

          if ($isNodeSelection(selection)) {
            const currentNode = selection.getNodes()[0]
            const previousSibling = currentNode.getPreviousSibling()

            if (!previousSibling) {
              event.preventDefault()
              const paragraphNode = $createParagraphNode()
              currentNode.insertBefore(paragraphNode)
              paragraphNode.select()

              return true
            }

            if ($isDecoratorNode(previousSibling)) {
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(previousSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }

            event.preventDefault()
            previousSibling?.selectEnd()
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, onChange])

  return null
}
