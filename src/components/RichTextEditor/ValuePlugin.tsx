import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useRef } from 'react'

const EMPTY_EDITOR_STATE =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

type ValuePluginProps = {
  value?: string
  onChange: (value: string) => void
}

function ValuePlugin({
  value = EMPTY_EDITOR_STATE,
  onChange,
}: ValuePluginProps): null {
  const [editor] = useLexicalComposerContext()
  const internalValue = useRef<string>()

  useEffect(() => {
    if (internalValue.current === value) return

    editor.update(() => {
      const editorState = editor.parseEditorState(value)
      editor.setEditorState(editorState)
    })
  }, [value])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const newValue = JSON.stringify(editorState.toJSON())
      internalValue.current = newValue
      onChange?.(newValue)
    })
  }, [value, onChange])

  return null
}

export { ValuePlugin }
export { ValuePluginProps }
