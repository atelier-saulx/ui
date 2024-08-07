import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import {
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'
import { ReactNode, useLayoutEffect, useRef } from 'react'

export class EmbedNode extends DecoratorNode<ReactNode> {
  __content: string

  static override getType(): string {
    return 'embed'
  }

  constructor(content: string, key?: NodeKey) {
    super(key)
    this.__content = content
  }

  static override clone(node: EmbedNode): EmbedNode {
    return new EmbedNode(node.__content, node.__key)
  }

  override createDOM() {
    return document.createElement('div')
  }

  override updateDOM() {
    return false
  }

  static override importJSON(
    serializedNode: Spread<{ content: string }, SerializedLexicalNode>,
  ): EmbedNode {
    return new EmbedNode(decodeURIComponent(serializedNode.content))
  }

  override exportJSON(): Spread<{ content: string }, SerializedLexicalNode> {
    return {
      version: 1,
      type: 'embed',
      content: encodeURIComponent(this.__content),
    }
  }

  override isIsolated(): false {
    return false
  }

  override isInline(): false {
    return false
  }

  canInsertTextBefore(): false {
    return false
  }

  canInsertTextAfter(): false {
    return false
  }

  override decorate() {
    return <Embed content={this.__content} nodeKey={this.__key} />
  }
}

function Embed({ content, nodeKey }: { content: string; nodeKey: NodeKey }) {
  const ref = useRef<HTMLDivElement>(null)
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  useLayoutEffect(() => {
    return editor.registerCommand(
      CLICK_COMMAND,
      (event) => {
        if (ref.current && ref.current.contains(event.target as Node)) {
          clearSelection()
          setSelected(true)
          return true
        }

        return false
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor, clearSelection, setSelected])

  return (
    <figure
      ref={ref}
      style={{
        ...(isSelected && { border: '2px solid red' }),
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ pointerEvents: 'none' }}
      />
    </figure>
  )
}
