import { ElementFormatType, LexicalNode, NodeKey, Spread } from 'lexical'
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getNodeByKey,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'

function ImageComponent({ src, nodeKey }: { src: string; nodeKey: string }) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const ref = useRef<HTMLImageElement | null>(null)

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
          if (event.target === ref.current) {
            event.preventDefault()

            setSelected(!isSelected)
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
      )
    )
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected])

  return (
    <styled.img
      style={{
        border: `2px solid ${
          isSelected ? color('content', 'brand', 'primary') : 'transparent'
        }`,
      }}
      src={src}
      alt=""
      ref={ref}
    />
  )
}

export type ImageNodePayload = {
  src: string
}

type SerializedImageNode = Spread<
  {
    type: 'image'
    version: 1
  } & ImageNodePayload,
  SerializedDecoratorBlockNode
>

export class ImageNode extends DecoratorBlockNode {
  __src: string

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__format, node.__key)
  }

  constructor(src: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__src = src
  }

  createDOM(): HTMLElement {
    return document.createElement('div')
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return <ImageComponent src={this.__src} nodeKey={this.__key} />
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode(serializedNode)
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: 'image',
      version: 1,
      src: this.__src,
    }
  }
}

export function $createImageNode({ src }: ImageNodePayload): ImageNode {
  return new ImageNode(src)
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode
}
