import {
  DecoratorNode,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'
import React, { ReactNode } from 'react'

export type ImageNodePayload = {
  src: string
}

type SerializedImageNode = Spread<
  {
    type: 'image'
    version: 1
  } & ImageNodePayload,
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__key)
  }

  constructor(src: string, key?: NodeKey) {
    super(key)
    this.__src = src
  }

  createDOM(): HTMLElement {
    return document.createElement('span')
  }

  updateDOM(): false {
    return false
  }

  decorate(): ReactNode {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={this.__src} alt="" />
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode(serializedNode)
  }

  exportJSON(): SerializedImageNode {
    return {
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
