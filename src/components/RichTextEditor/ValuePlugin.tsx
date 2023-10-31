import React, { useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

export type ValuePluginProps = {
  defaultValue?: string
  onChange?: (value: string) => void
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
        onChange?.(JSON.stringify(editorState.toJSON()))
      }}
    />
  )
}
