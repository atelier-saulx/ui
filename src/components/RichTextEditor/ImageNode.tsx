import {
  BLUR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  ElementFormatType,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical'
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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { color } from '../../varsUtilities'
import { IconImage } from '../../icons'
import { Button, Input, Modal } from '..'

function ImageComponent({
  src,
  caption,
  nodeKey,
}: {
  src?: string
  caption?: string
  nodeKey: string
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  // src: 'https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200',
  // caption: 'test caption',

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
    <>
      {src ? (
        <styled.div
          ref={ref}
          onClick={() => {
            setModalOpen(true)
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            border: `2px solid ${
              isSelected ? color('content', 'brand', 'primary') : 'transparent'
            }`,
            '& > * + *': {
              marginTop: '8px',
            },
          }}
        >
          <styled.img src={src} alt="" style={{ margin: '0 auto' }} />
          <div>{caption}</div>
        </styled.div>
      ) : (
        <styled.div
          onClick={() => {
            setModalOpen(true)
          }}
          style={{
            cursor: 'pointer',
            padding: '128px 0',
            background: color('background', 'neutral', 'subtle'),
            border: `2px solid ${
              isSelected ? color('content', 'brand', 'primary') : 'transparent'
            }`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            '& > * + *': {
              marginTop: '16px',
            },
          }}
        >
          <IconImage />
          <div>Click to select image</div>
        </styled.div>
      )}

      <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Content>
          {({ close }) => (
            <>
              <Modal.Title>Edit image</Modal.Title>
              <Modal.Description>
                Upload an image or edit the caption
              </Modal.Description>
              <Modal.Body>
                <Input type="file" label="Image" />
                <Input type="textarea" label="Caption" />
                {!src && (
                  <Button
                    onClick={() => {
                      editor.update(() => {
                        const node = $getNodeByKey(nodeKey)
                        if ($isImageNode(node)) {
                          const writable = node.getWritable()
                          writable.__src =
                            'https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200'
                          writable.__caption = 'test caption'
                          close()
                        }
                      })
                    }}
                  >
                    Add example image
                  </Button>
                )}
              </Modal.Body>
              <Modal.Actions>
                <Button color="system" onClick={close}>
                  Cancel
                </Button>
                <Button>Save changes</Button>
              </Modal.Actions>
            </>
          )}
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export type ImageNodePayload = {
  src?: string
  caption?: string
}

type SerializedImageNode = Spread<
  {
    type: 'image'
    version: 1
  } & ImageNodePayload,
  SerializedDecoratorBlockNode
>

export class ImageNode extends DecoratorBlockNode {
  __src?: string
  __caption?: string

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__caption, node.__format, node.__key)
  }

  constructor(
    src?: string,
    caption?: string,
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key)
    this.__src = src
    this.__caption = caption
  }

  createDOM(): HTMLElement {
    return document.createElement('div')
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        caption={this.__caption}
        nodeKey={this.__key}
      />
    )
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
      caption: this.__caption,
    }
  }
}

export function $createImageNode({
  src,
  caption,
}: ImageNodePayload): ImageNode {
  return new ImageNode(src, caption)
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode
}
