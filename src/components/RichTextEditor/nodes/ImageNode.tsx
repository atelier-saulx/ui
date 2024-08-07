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
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'

export class ImageNode extends DecoratorNode<ReactNode> {
  __id: string

  static override getType(): string {
    return 'image'
  }

  constructor(id: string, key?: NodeKey) {
    super(key)
    this.__id = id
  }

  static override clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__id, node.__key)
  }

  override createDOM() {
    return document.createElement('div')
  }

  override updateDOM() {
    return false
  }

  static override importJSON(
    serializedNode: Spread<{ id: string }, SerializedLexicalNode>,
  ): ImageNode {
    return new ImageNode(serializedNode.id)
  }

  override exportJSON(): Spread<{ id: string }, SerializedLexicalNode> {
    return {
      version: 1,
      type: 'image',
      id: this.__id,
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
    return <Image id={this.__id} nodeKey={this.__key} />
  }
}

// TODO fetch correct image src, width etc based on ID from db

function Image({ id, nodeKey }: { id: string; nodeKey: NodeKey }) {
  const ref = useRef<HTMLElement>(null)
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [data, setData] = useState<{ src: string; caption?: string } | null>(
    null,
  )

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

  // TODO fix this
  useEffect(() => {
    fetch(`/api/files/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setData({
          ...data,
          src:
            process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DISTRIBUTION_URL +
            '/' +
            data.key,
          caption: 'TODO caption',
        }),
      )
  }, [id])

  return (
    <figure
      ref={ref}
      style={{
        ...(isSelected && { border: '2px solid red' }),
      }}
    >
      <img
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        src={data?.src}
      />
      {data?.caption && <figcaption>{data.caption}</figcaption>}
    </figure>
  )
}
