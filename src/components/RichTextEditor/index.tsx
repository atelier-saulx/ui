import React, { FC, useRef, useState, useEffect } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'
import { Row } from '../Styled'
import { generateString } from './utils/generateString'
import { keyDownHandler } from './utils/keyDownHandler'
import { Code } from '../Code'

export type RichTextEditorProps = {
  time?: number
  data?: any
  style?: Style
}

// TODO :
//  - HTML preview -> editable -> outerHTML prop on nodes
//  - placeholder on new empty block
//  - unordered list
//  - ordererd list
//  - link
//  - add blocks
//  - add media
//  - preview html code
//  - only selections that fall within the editor
//  - option to add css style to element
//  - option to add class to element
//  - on focus put the cursor either on end or beginning depending on action
//  shift + enter in blocks

export const RichTextEditor: FC<RichTextEditorProps> = ({
  time,
  data,
  style,
}) => {
  const editorWrapRef = useRef<HTMLElement>()

  const [blocks, setBlocks] = useState(data.blocks)
  const [focus, setFocus] = useState(0)
  const [html, setHtml] = useState<string>('')

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
                keyDownHandler={keyDownHandler}
                blocksLength={blocks.length}
                style={{
                  borderLeft:
                    focus === idx
                      ? `3px solid ${color('action', 'primary', 'normal')}`
                      : '0px',
                  '&::before': {
                    content: 'yo',
                    display: 'block',
                  },
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
                makeNewBlock={makeNewBlock}
                deleteBlock={deleteBlock}
                updateBlock={updateBlock}
                keyDownHandler={keyDownHandler}
                blocksLength={blocks.length}
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
          let snork = editorWrapRef.current.children
          console.log(snork, '📌 -> now here you save the blocks')

          let htmlString = Array.prototype.reduce.call(
            childnodes,
            function (html, node) {
              return html + (node.outerHTML || node.nodeValue)
            },
            ''
          )

          setHtml(htmlString)
          console.log('as html -->', htmlString)

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

      <Code language="html" value={html} />
    </styled.div>
  )
}
