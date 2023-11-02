import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical'
import { ReactNode, useEffect } from 'react'
import { $createImageNode, ImageNode, ImageNodePayload } from '../nodes/ImageNode'
import { $insertNodeToNearestRoot } from '@lexical/utils'

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageNodePayload> =
  createCommand('INSERT_IMAGE_COMMAND')

export function ImagePlugin(): ReactNode | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagePlugin: ImageNode not registered on editor')
    }

    return editor.registerCommand<ImageNodePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload)
        $insertNodeToNearestRoot(imageNode)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
