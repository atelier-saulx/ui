import React from 'react'
import { RichTextEditor } from './index.js'

export default {
  title: 'RichTextEditor',
  component: RichTextEditor,
}

export const Default = () => {
  return (
    <RichTextEditor
      onChange={(state) => {
        console.log(state)
      }}
    />
  )
}
