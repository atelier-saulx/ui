import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical'
import { ReactNode, useEffect } from 'react'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import {
  $createEmbedNode,
  EmbedNode,
  EmbedNodePayload,
} from '../nodes/EmbedNode'

export const INSERT_EMBED_COMMAND: LexicalCommand<EmbedNodePayload> =
  createCommand('INSERT_EMBED_COMMAND')

export function EmbedPlugin(): ReactNode | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([EmbedNode])) {
      throw new Error('EmbedPlugin: EmbedNode not registered on editor')
    }

    return editor.registerCommand<EmbedNodePayload>(
      INSERT_EMBED_COMMAND,
      (payload) => {
        const embedNode = $createEmbedNode(payload)
        $insertNodeToNearestRoot(embedNode)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
