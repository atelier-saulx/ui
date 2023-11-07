import React, { useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $getRoot } from 'lexical'

export type ValuePluginProps = {
  defaultValue?: string
  onChange?: ({ json, html }: { json: string; html: string }) => void
}

export function ValuePlugin({ defaultValue, onChange }: ValuePluginProps) {
  const [editor] = useLexicalComposerContext()
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    if (defaultValue && isFirstRender && editor) {
      setIsFirstRender(false)
      editor.update(() => {
        editor.setEditorState(editor.parseEditorState(JSON.parse(defaultValue)))
      })
    }
  }, [isFirstRender, defaultValue, editor])

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onChange?.({
            json: JSON.stringify(editorState.toJSON()),
            html: $generateHtmlFromNodes(editor, null),
          })
        })
      }}
    />
  )
}
