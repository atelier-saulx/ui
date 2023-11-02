import React, { useCallback, useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { AddEmbedModal } from './AddEmbedModal'
import { color } from '../../../varsUtilities'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { Button } from '../../Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getNodeByKey,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  BLUR_COMMAND,
  CLICK_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical'
import { $isEmbedNode } from '../nodes/EmbedNode'
import { IconDelete, IconEdit, IconLayerThree } from '../../../icons'
import { Text } from '../../Text'
import { mergeRegister } from '@lexical/utils'

export function EmbedComponent({
  html,
  nodeKey,
}: {
  html?: string
  nodeKey: string
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const ref = useRef<HTMLDivElement | null>(null)

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isDecoratorNode(node)) {
          node.remove()
        }
      }

      return false
    },
    [isSelected, nodeKey]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (
            event.target === ref.current ||
            ref.current?.contains(event.target as Node)
          ) {
            clearSelection()
            setSelected(true)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          clearSelection()
          return true
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected])

  return (
    <styled.div
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: color('action', 'neutral', 'subtleNormal'),
        padding: '64px 0',
        borderRadius: 8,
        border: `2px solid ${
          isSelected ? color('content', 'brand', 'primary') : 'transparent'
        }`,
        '&:hover .overlay': {
          display: 'flex',
        },
        '& > * + *': {
          marginTop: '8px',
        },
      }}
    >
      <IconLayerThree />
      <Text>Custom HTML embed</Text>
      <styled.div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'none',
          margin: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& > * + *': {
            marginTop: '12px',
          },
        }}
      >
        <AddEmbedModal
          defaultHTML={html}
          onSave={({ html }) => {
            editor.update(() => {
              const node = $getNodeByKey(nodeKey)
              if ($isEmbedNode(node)) {
                const writable = node.getWritable()
                writable.__html = html
              }
            })
          }}
        >
          <Button icon={<IconEdit />}>Edit embed</Button>
        </AddEmbedModal>
        <Button
          color="alert"
          icon={<IconDelete />}
          onClick={() => {
            editor.update(() => {
              const node = $getNodeByKey(nodeKey)
              node.remove()
            })
          }}
        >
          Delete embed
        </Button>
      </styled.div>
    </styled.div>
  )
}
