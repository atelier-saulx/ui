import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import EditorJS from '@editorjs/editorjs'
import { color } from '../../varsUtilities'

export type RichTextEditorProps = {
  data?: DataObj
  style?: Style
}

type DataObj = {
  time: number
  blocks: { type: string; data: object }[]
  version: string
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ data, style }) => {
  const RawTool = require('@editorjs/raw')
  const Header = require('@editorjs/header')

  const editor = new EditorJS({
    holder: 'editorjs',
    data: data,
    onReady: () => {
      console.log('Editor.js is ready to work!')
      // style changing of tooltip
      const tooltipGet: NodeListOf<Element> = document.querySelectorAll('.ct')
      tooltipGet.forEach((item: HTMLElement) => {
        item.style.fontFamily = 'Inter'
      })
    },
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link'],
      },
      raw: RawTool,
    },
    onChange: (v) => console.log(v),
  })

  return (
    <styled.div
      style={{
        fontFamily: 'Inter, sans-serif',
        padding: 16,
        border: `1px solid ${color('inputBorder', 'neutralNormal', 'default')}`,
        borderRadius: 8,
        '& .cdx-block': {
          background: 'yellow',
        },
        '& .ce-toolbar': {
          fontFamily: 'Inter, sans-serif',
        },
        ...style,
      }}
      id="editorjs"
    />
  )
}
