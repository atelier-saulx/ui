import React, { FC, useRef, useState, useEffect } from 'react'
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
  const [focus, setFocus] = useState(0)

  let childnodes = editorWrapRef?.current?.childNodes

  const makeNewBlock = (type) => {
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

  useEffect(() => {
    // console.log((editorWrapRef.current.children[1] as HTMLElement).focus())
    console.log(editorWrapRef.current)
    console.log(editorWrapRef.current.children[focus])
    // use childNodes not children you know because of logic 🤨
    let child = editorWrapRef.current.childNodes[focus] as HTMLElement
    child.focus()
  }, [focus])

  return (
    <styled.div>
      <Button onClick={() => setFocus(1)}>focus</Button>
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
              <ParagraphBlock
                key={idx}
                idx={idx}
                data={item}
                setFocus={setFocus}
                makeNewBlock={makeNewBlock}
              />
            )
          } else if (item.type === 'heading') {
            return <HeadingBlock key={idx} data={item} />
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
          //       style: 'css',
          //       alignment: 'left',
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
