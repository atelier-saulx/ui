import React, { FC, useRef, useState, useEffect } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'
import { BlockTool } from './BlockTool'
import { Row } from '../Styled'

export type RichTextEditorProps = {
  time?: number
  data?: any
  style?: Style
}

// TODO :
//  - update block data on content editable
//  - HTML preview -> editable -> outerHTML prop on nodes
//  - unordered list
//  - ordererd list
//  - link
//  - add blocks
//  - add media
//  - preview html code
//  - ony selections that fall within the editor
//  - convert block to other block.
//  - option to add css style to element
//  - option to add class to element
//  - arrow keys up and down to select blocks
//  shift + enter in blocks

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

  const makeNewBlock = (type, focus) => {
    if (focus || focus === 0) {
      // insert after focus index
      const duplicateArr = [
        ...blocks.slice(0, focus === 0 ? 1 : focus + 1),
        {
          id: `${type.substring(0, 3)}-${generateString(5)}`,
          type: type,
          data: {
            innerHTML: '',
          },
        },
        ...blocks.slice(focus === 0 ? 1 : focus + 1),
      ]

      setBlocks([...duplicateArr])
    } else {
      // add to end
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
  }

  const deleteBlock = (idx) => {
    const filteredBlocks = blocks.filter((item, id) => id !== idx)
    setBlocks([...filteredBlocks])
  }

  const updateBlock = (idx: number, ref?: any) => {
    // TODO update the data from this block
    // console.log(idx, ref, '👷🏻‍♂️')
    // console.log(ref.innerHTML)
    // console.log('innerText ')

    let newRef = ref

    if (!ref) {
      newRef = editorWrapRef.current.childNodes[idx]
    }

    console.log('update this 🤖')
    blocks[idx].data.innerHTML = newRef.innerHTML
    blocks[idx].data.innerText = newRef.innerHTML
    blocks[idx].data.alignment = newRef.style.textAlign
    blocks[idx].data.style = newRef.cssText
  }

  useEffect(() => {
    // use childNodes not children you know because of logic 🤨
    let child = editorWrapRef.current.childNodes[focus] as HTMLElement
    child.focus()
  }, [focus])

  useEffect(() => {
    console.log(' 🙄what are the blocks now --> ', blocks)
  }, [blocks])

  return (
    <styled.div>
      <Row style={{ border: '1px solid green', padding: 8, marginBottom: 12 }}>
        focused: {focus}
      </Row>
      <Header
        blocks={blocks}
        deleteBlock={deleteBlock}
        focus={focus}
        makeNewBlock={makeNewBlock}
        setBlocks={setBlocks}
        setFocus={setFocus}
        updateBlock={updateBlock}
      />
      <styled.div
        id="editor"
        ref={editorWrapRef}
        style={{
          backgroundColor: color('background', 'default'),
          borderRadius: 8,
          padding: '6px 20px',
          paddingBottom: '24px',
          paddingLeft: 0,
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
            paddingLeft: '16px',
            '&:focus-visible': {
              outline: '1px dashed #bfbfbf',
            },
          },
          '& a': {
            color: '#0a57d0',
          },
          '& h1, h2, h3, h4, h5, h6': {
            paddingLeft: '16px',
            '&:focus-visible': {
              outline: '1px dashed #bfbfbf',
            },
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
                deleteBlock={deleteBlock}
                updateBlock={updateBlock}
                style={{
                  borderLeft:
                    focus === idx
                      ? `3px solid ${color('action', 'primary', 'normal')}`
                      : '0px',
                }}
              />
            )
          } else if (item.type === 'heading') {
            return (
              <HeadingBlock
                key={idx}
                data={item}
                idx={idx}
                setFocus={setFocus}
                style={{
                  borderLeft:
                    focus === idx
                      ? `3px solid ${color('action', 'primary', 'normal')}`
                      : '0px',
                }}
              />
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
