import React, { useState } from 'react'
import { RichTextEditor } from './index.js'

export default {
  title: 'Molecules/RichTextEditor',
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
