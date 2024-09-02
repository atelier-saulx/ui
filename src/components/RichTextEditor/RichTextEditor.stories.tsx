import React, { useEffect, useMemo, useState } from 'react'
import { RichTextEditor } from './index.js'
import { exportToHTML } from './exportToHTML.js'
import { useClient } from '@based/react'

export default {
  title: 'RichTextEditor (WIP)',
  component: RichTextEditor,
}

export const Default = () => {
  const client = useClient()
  const [state, setState] = useState<string>()
  const [stateHTML, setStateHTML] = useState<string>()

  useEffect(() => {
    if (!state) return

    exportToHTML(state, client).then((res) => setStateHTML(res))
  }, [state])

  return (
    <>
      <RichTextEditor
        onChange={(state) => {
          setState(state)
        }}
      />
      <p>JSON state</p>
      <pre>{state}</pre>
      <p>HTML state</p>
      <pre>{stateHTML}</pre>
    </>
  )
}
