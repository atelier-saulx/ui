import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import EditorJS from '@editorjs/editorjs'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import SimpleImage from './Plugins/simple-image/simple-image.jsx'
require('./Plugins/simple-image/simple-image.css')

export type RichTextEditorProps = {
  data?: DataObj
  style?: Style
}

type DataObj = {
  time: number
  blocks: { type: string; data: object }[]
  version: string
}

const RawTool = require('@editorjs/raw')
const Header = require('@editorjs/header')
const List = require('@editorjs/list')

export const RichTextEditor: FC<RichTextEditorProps> = ({ data, style }) => {
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
      list: List,
      image: SimpleImage,
    },
    onChange: (v) => console.log(v),
  })

  return (
    <>
      <styled.div
        style={{
          fontFamily: 'Inter, sans-serif',
          padding: 16,
          border: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          borderRadius: 8,
          '& .cdx-block': {
            //   background: 'yellow',
            lineHeight: '1.45em',
          },
          '& .ce-toolbar': {
            fontFamily: 'Inter, sans-serif',
          },
          '& .codex-editor__redactor': {
            paddingBottom: '74px !important',
          },
          '& .ce-popover-item__icon': {
            width: '22px',
            height: '22px',
            margin: '2px',
            marginRight: '8px',
          },
          '& .codex-editor ::selection, .ce-block--selected .ce-block__content':
            {
              background: color('action', 'primary', 'subtleSelected'),
            },
          '& .ce-inline-tool--active': {
            color: color('action', 'primary', 'active'),
          },
          '& .ce-popover-item--active': {
            background: color('action', 'primary', 'subtleSelected'),
            color: color('action', 'primary', 'active'),
          },
          '& .ce-conversion-tool--focused': {
            background: ` ${color(
              'action',
              'primary',
              'subtleSelected'
            )}  !important`,
          },
          // html tool
          '& .ce-rawtool__textarea': {
            height: 'auto !important',
            minHeight: 'fit-content',
          },
          ...style,
        }}
        id="editorjs"
      />
      <Button
        style={{ marginTop: 24 }}
        onClick={() => {
          editor
            .save()
            .then((outputData) => {
              console.log('Article data: ', outputData)
            })
            .catch((error) => {
              console.log('Saving failed: ', error)
            })
        }}
      >
        Save test output
      </Button>
    </>
  )
}
