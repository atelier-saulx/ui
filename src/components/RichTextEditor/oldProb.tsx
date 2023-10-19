import React, { FC, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import EditorJS from '@editorjs/editorjs'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'
import SimpleImage from './Plugins/simple-image/simple-image'
import WhiteSpace from './Plugins/white-space/white-space'
import HtmlBlock from './Plugins/html-block/html-block'
import { IconEye, IconFile } from '../../icons'
import { blocksToHtmlParser } from './blocksToHtmlParser'
import { htmlToBlocksParser } from './htmlToBlocksParser'
import { Code } from '../Code'
import TextAlign from './InlineTools/text-align'
import Paragraph from './Plugins/custom-paragraph'

export type RichTextEditorProps = {
  data?: DataObj
  style?: Style
}

type DataObj = {
  time: number
  blocks: { type: string; data: object }[]
  version: string
}

const Header = require('@editorjs/header')
const List = require('@editorjs/list')

export const RichTextEditor: FC<RichTextEditorProps> = ({ data, style }) => {
  const [displayVisual, setDisplayVisual] = useState(true)

  // const [rawHtml, setRawHtml] = useState(blocksToHtmlParser(data?.blocks as []))

  const [tempVisualData, setTempVisualData] = useState<any>(data)

  const editor = new EditorJS({
    holder: 'editorjs',
    data: tempVisualData,
    defaultBlock: Paragraph as any,
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
        //   inlineToolbar: ['link', 'textAlign'],
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      list: {
        class: List,
        //  inlineToolbar: ['textAlign'],
      },
      html: HtmlBlock,
      image: SimpleImage,
      space: WhiteSpace,
      textAlign: TextAlign,
    },
    logLevel: 'WARN' as any,
  })

  // div on keypress,
  // out of focus always have a fresh one below..

  return (
    <>
      <Row style={{ justifyContent: 'flex-end', marginBottom: 6, gap: 6 }}>
        <Button
          size="xsmall"
          color={displayVisual ? 'primary' : 'neutral'}
          onClick={() => {
            setDisplayVisual(true)
          }}
          icon={<IconEye />}
        >
          Visual
        </Button>
        <Button
          size="xsmall"
          color={!displayVisual ? 'primary' : 'neutral'}
          onClick={() => {
            editor
              .save()
              .then((outputData) => {
                //  console.log(htmlToBlocksParser(outputData, rawHtml))
                console.log('Output?? -> ', outputData)
                setTempVisualData(outputData)
              })
              .catch((error) => {
                console.log('Saving failed: ', error)
              })
            setDisplayVisual(false)
          }}
          icon={<IconFile />}
        >
          Html
        </Button>
      </Row>

      {displayVisual && (
        <styled.div
          id="editorjs"
          style={{
            height: displayVisual ? 'auto' : '0px',
            opacity: displayVisual ? 1 : 0,
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
            '& .ce-paragraph': {
              marginBottom: '12px',
            },
            '& .ce-toolbar': {
              fontFamily: 'Inter, sans-serif',
            },
            '& .codex-editor__redactor': {
              paddingBottom: '2px !important',
            },
            '& .ce-toolbar__plus, .ce-toolbar__settings-btn': {
              color: color('content', 'default', 'primary'),
            },
            '& .ce-popover-item--confirmation': {
              background: color('content', 'negative'),
            },
            '& .ce-popover-item--confirmation .ce-popover-item__icon': {
              color: color('content', 'negative'),
            },
            '& .ce-popover-item__icon': {
              width: '22px',
              height: '22px',
              margin: '2px',
              marginRight: '8px',
            },
            '& .codex-editor': {
              fontSize: '15px',
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
              background: `${color(
                'action',
                'primary',
                'subtleSelected'
              )}  !important`,
            },
            '& .cdx-list__item': {
              lineHeight: '1.24em',
            },
            '& .cdx-list': {
              marginBottom: '12px',
            },
            ...style,
          }}
        />
      )}

      <div
        style={{
          display: displayVisual ? 'none' : 'block',
          width: '100%',
          padding: 16,
          borderRadius: 8,
          border: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          ...style,
        }}
      >
        <Code
          value={blocksToHtmlParser(tempVisualData?.blocks as [])}
          language="html"
        />
      </div>

      {displayVisual && (
        <Button
          style={{
            marginTop: 16,
            marginLeft: 'auto',
            position: 'relative',
            display: 'block',
          }}
          size="small"
          onClick={() => {
            editor
              .save()
              .then((outputData) => {
                //  console.log(htmlToBlocksParser(outputData, rawHtml))
                console.log('Output?? -> ', outputData)
              })
              .catch((error) => {
                console.log('Saving failed: ', error)
              })
          }}
        >
          Save test output
        </Button>
      )}
    </>
  )
}
