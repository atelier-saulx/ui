import React, { FC, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'

export type RichTextEditorProps = {
  time?: number
  data?: any
  style?: Style
}

// classic wp editor ->
//  - bold
//  - italic
//  - unordered list
//  - ordererd list
//  - quote
//  - text align left
//  - text align center
//  - text align right
//  - link
//  - add blocks
//  - add media
//  - preview html code

// option to add css style to element
// option to add class to element

const AddNewBlock = (type, arr, idx) => {}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  time,
  data,
  style,
}) => {
  const editorWrapRef = useRef<HTMLElement>()

  const [blocks, setBlocks] = useState(data.blocks)

  return (
    <styled.div>
      <Header />
      <styled.div
        id="flap"
        ref={editorWrapRef}
        style={{
          backgroundColor: color('background', 'default'),
          padding: '6px 20px',
          paddingBottom: '24px',
          border: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          marginTop: 8,
          marginBottom: 16,
          '& p': {
            lineHeight: '1.36',
            fontSize: '15px',
          },
          '& a': {
            color: '#0a57d0',
          },
        }}
      >
        {blocks.map((item, idx) => {
          if (item.type === 'paragraph') {
            return (
              <ParagraphBlock
                key={idx}
                innerHTML={item.data.innerHTML}
                innerText={item.data.innerText}
                alignment={item.data.alignment}
                style={item.data.style}
              />
            )
          } else if (item.type === 'heading') {
            return (
              <HeadingBlock
                key={idx}
                level={item.data.level}
                innerHTML={item.data.innerHTML}
                innerText={item.data.innerText}
                alignment={item.data.alignment}
                style={item.data.style}
              />
            )
          }
        })}
        {/* // pass ref to appendChild ?? */}

        {/* <ParagraphBlock parent={flappie} /> */}
      </styled.div>

      <Button
        onClick={() => {
          // get all html nodes inside the ref
          let snork = editorWrapRef.current.childNodes
          console.log(snork, '📌 -> now here you save the blocks')

          // TODO: for each childnode make an object
          // [
          //   {
          //     id: 'par-blha',
          //     type:'paragraph'
          //     data: {
          //       innerHTML: '',
          //       innerText: '',
          //       style: 'css'
          //     }
          //   }
          // ]
        }}
      >
        log output
      </Button>
    </styled.div>
  )
}
