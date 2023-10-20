import React, { FC, useRef, useState } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'
import { BlockTool } from './BlockTool'

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
// ony selections that fall within the editor

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
  const [focusedIndex, setFocusedIndex] = useState()

  console.log(blocks)
  let snork = editorWrapRef?.current?.childNodes

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

  const deleteBlock = (idx) => {
    console.log('delete this block ->', idx)
  }

  return (
    <styled.div>
      <Header makeNewBlock={makeNewBlock} />
      <styled.div
        id="editor"
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
              <React.Fragment key={idx}>
                {focusedIndex === idx && (
                  <BlockTool
                    idx={idx}
                    setBlocks={setBlocks}
                    blocks={blocks}
                    snork={snork}
                  />
                )}
                <ParagraphBlock
                  key={idx}
                  innerHTML={item.data.innerHTML}
                  innerText={item.data.innerText}
                  alignment={item.data.alignment}
                  style={item.data.style}
                  id={item.id}
                  onMouseOver={() => setFocusedIndex(idx)}
                  onChange={(v) => console.log(v)}
                />
              </React.Fragment>
            )
          } else if (item.type === 'heading') {
            return (
              <React.Fragment key={idx}>
                {focusedIndex === idx && (
                  <BlockTool
                    idx={idx}
                    setBlocks={setBlocks}
                    blocks={blocks}
                    snork={snork}
                  />
                )}
                <HeadingBlock
                  key={idx}
                  level={item.data.level}
                  innerHTML={item.data.innerHTML}
                  innerText={item.data.innerText}
                  alignment={item.data.alignment}
                  style={item.data.style}
                  id={item.id}
                  onMouseOver={() => setFocusedIndex(idx)}
                />
              </React.Fragment>
            )
          }
        })}
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
