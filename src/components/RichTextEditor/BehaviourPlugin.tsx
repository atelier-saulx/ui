import React, { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createNodeSelection,
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'

export function BehaviourPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    mergeRegister(
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          editor.getEditorState().read(() => {
            const lastNode = $getRoot().getChildren().at(-1)

            if ($isDecoratorNode(lastNode)) {
              editor.update(() => {
                const paragraphNode = $createParagraphNode()
                $getRoot().append(paragraphNode)

                paragraphNode.selectStart()
              })
            }
          })
          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        KEY_ARROW_LEFT_COMMAND,
        (event) => {
          // avoid processing card behaviours when an inner element has focus
          if (document.activeElement !== editor.getRootElement()) {
            return true
          }

          const selection = $getSelection()

          if (!$isNodeSelection(selection)) {
            return false
          }

          const selectedNodes = selection.getNodes()
          const firstNode = selectedNodes[0]
          const topLevelElement = firstNode.getTopLevelElement()
          const previousSibling = topLevelElement.getPreviousSibling()

          if ($isDecoratorNode(previousSibling)) {
            event.preventDefault()
            const nodeSelection = $createNodeSelection()
            nodeSelection.add(previousSibling.getKey())
            $setSelection(nodeSelection)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_RIGHT_COMMAND,
        (event) => {
          // avoid processing card behaviours when an inner element has focus
          if (document.activeElement !== editor.getRootElement()) {
            return true
          }

          const selection = $getSelection()

          if (!$isNodeSelection(selection)) {
            return false
          }

          const selectedNodes = selection.getNodes()
          const lastNode = selectedNodes[selectedNodes.length - 1]
          const topLevelElement = lastNode.getTopLevelElement()
          const nextSibling = topLevelElement.getNextSibling()

          if ($isDecoratorNode(nextSibling)) {
            event.preventDefault()
            const nodeSelection = $createNodeSelection()
            nodeSelection.add(nextSibling.getKey())
            $setSelection(nodeSelection)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_UP_COMMAND,
        (event) => {
          // avoid processing card behaviours when an inner element has focus
          if (document.activeElement !== editor.getRootElement()) {
            return true
          }

          const selection = $getSelection()

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const topLevelElement = selection.anchor
                .getNode()
                .getTopLevelElement()
              const previousSibling = topLevelElement?.getPreviousSibling()
              if ($isDecoratorNode(previousSibling)) {
                event.preventDefault()
                const nodeSelection = $createNodeSelection()
                nodeSelection.add(previousSibling.getKey())
                $setSelection(nodeSelection)
                return true
              }
            }
          }

          if ($isNodeSelection(selection)) {
            const selectedNodes = selection.getNodes()
            const firstNode = selectedNodes[0]
            const topLevelElement = firstNode.getTopLevelElement()
            const previousSibling = topLevelElement.getPreviousSibling()

            if ($isDecoratorNode(previousSibling)) {
              event.preventDefault()
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(previousSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        (event) => {
          // avoid processing card behaviours when an inner element has focus
          if (document.activeElement !== editor.getRootElement()) {
            return true
          }

          const selection = $getSelection()

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const topLevelElement = selection.anchor
                .getNode()
                .getTopLevelElement()

              const nextSibling = topLevelElement?.getNextSibling()
              if ($isDecoratorNode(nextSibling)) {
                event.preventDefault()
                const nodeSelection = $createNodeSelection()
                nodeSelection.add(nextSibling.getKey())
                $setSelection(nodeSelection)
                return true
              }
            }
          }

          if ($isNodeSelection(selection)) {
            const selectedNodes = selection.getNodes()
            const lastNode = selectedNodes[selectedNodes.length - 1]
            const topLevelElement = lastNode.getTopLevelElement()
            const nextSibling = topLevelElement.getNextSibling()

            if ($isDecoratorNode(nextSibling)) {
              event.preventDefault()
              const nodeSelection = $createNodeSelection()
              nodeSelection.add(nextSibling.getKey())
              $setSelection(nodeSelection)
              return true
            }
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor])

  return null
}
