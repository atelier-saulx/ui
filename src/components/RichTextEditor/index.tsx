import React, { FC, useRef, useState } from 'react'
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

//  - unordered list
//  - ordererd list
//  - link
//  - add blocks
//  - add media
//  - preview html code

// move blocks up and or down
// convert block to other block.
// option to add css style to element
// option to add class to element

// gen id
const generateString = (length) =>
  Array(length)
    .fill('')
    .map((v) => Math.random().toString(36).charAt(2))
    .join('')

export const RichTextEditor: FC<RichTextEditorProps> = ({
  time,
  data,
  style,
}) => {
  const editorWrapRef = useRef<HTMLElement>()

  const [blocks, setBlocks] = useState(data.blocks)
  console.log(blocks)

  const makeNewBlock = (type) => {
    console.log(type)

    setBlocks((oldblocks) => [
      ...oldblocks,
      {
        id: `${type.substring(0, 3)}-${generateString(5)}`,
        type: type,
        data: {
          innerHTML: '',
        },
      },
    ])
  }

  return (
    <styled.div>
      <Header makeNewBlock={makeNewBlock} />
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
                id={item.id}
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
                id={item.id}
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
