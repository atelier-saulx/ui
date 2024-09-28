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
  const [value, setValue] = useState<string>()
  const [stateHTML, setStateHTML] = useState<string>()

  useEffect(() => {
    if (!value) return

    exportToHTML(value, client).then((res) => setStateHTML(res))
  }, [value])

  console.log({ value })

  return (
    <>
      <RichTextEditor value={value} onChange={setValue} />
      <p>JSON state</p>
      <pre>{value}</pre>
      <p>HTML state</p>
      <pre>{stateHTML}</pre>
    </>
  )
}

export const ChangingOutsideValue = () => {
  const [value, setValue] = useState<string>()

  useEffect(() => {
    setInterval(() => {
      setValue(
        `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${Math.random() * 100}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
      )
    }, 500)
  }, [])

  return <RichTextEditor value={value} onChange={setValue} />
}
