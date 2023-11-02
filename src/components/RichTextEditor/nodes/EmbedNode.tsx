import React from 'react'
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode'
import { ElementFormatType, LexicalNode, NodeKey, Spread } from 'lexical'
import { EmbedComponent } from '../components/EmbedComponent'

export type EmbedNodePayload = {
  html: string
}

type SerializedEmbedNode = Spread<
  {
    type: 'embed'
    version: 1
  } & EmbedNodePayload,
  SerializedDecoratorBlockNode
>

export class EmbedNode extends DecoratorBlockNode {
  __html: string

  constructor(html: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__html = html
  }

  static getType(): string {
    return 'embed'
  }

  static clone(node: EmbedNode): EmbedNode {
    return new EmbedNode(node.__html, node.__format, node.__key)
  }

  createDOM(): HTMLElement {
    return document.createElement('div')
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return <EmbedComponent html={this.__html} nodeKey={this.__key} />
  }

  static importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
    return $createEmbedNode(serializedNode)
  }

  exportJSON(): SerializedEmbedNode {
    return {
      ...super.exportJSON(),
      type: 'embed',
      version: 1,
      html: this.__html,
    }
  }
}

export function $createEmbedNode({ html }: EmbedNodePayload): EmbedNode {
  return new EmbedNode(html)
}

export function $isEmbedNode(
  node: LexicalNode | null | undefined
): node is EmbedNode {
  return node instanceof EmbedNode
}
