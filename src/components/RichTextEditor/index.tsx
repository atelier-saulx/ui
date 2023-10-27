import React, { FC, useRef, useState, useEffect } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header/Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'
import { Row } from '../Styled'
import { generateString } from './utils/generateString'
import { keyDownHandler } from './utils/keyDownHandler'
import { Code } from '../Code'
import { ListBlock } from './Blocks/ListBlock'
import { HtmlBlock } from './Blocks/HtmlBlock'
import { SpaceBlock } from './Blocks/SpaceBlock'
import { nodeToJson } from './utils/nodesToJson'
import { RawHtmlBlock } from './Blocks/RawHtmlBlock'
import { htmlNodesToJson } from './utils/htmlNodesToJson'
import { IconEye, IconEyeOff } from '../../icons'
import { Tooltip } from '../..'

export type RichTextEditorProps = {
  time?: number
  data?: any
  style?: Style
}

// TODO :
//  - HTML preview -> editable -> outerHTML prop on nodes
//  header buttons in html editor??
//  - add media
//  - only selections that fall within the editor
//  - option to add css style to element
//  - option to add class to element
// -  shift + enter at end of block
//  - styling
//  - backgroundcolor save to blocks -> if you change focus it removes now
// - duplicate a block
// spit out to database / onchange

export const RichTextEditor: FC<RichTextEditorProps> = ({
  time,
  data,
  style,
}) => {
  const editorWrapRef = useRef<HTMLElement>()

  const [blocks, setBlocks] = useState(data.blocks)
  const [focus, setFocus] = useState(0)
  const [htmlView, setHtmlView] = useState<boolean>(false)

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
            level: type === 'heading' ? 'h1' : undefined,
            items:
              type === 'list' ? [{ innerText: '', innerHTML: '' }] : undefined,
            type: type === 'list' ? 'unordered' : undefined,
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
            level: type === 'heading' ? 'h1' : undefined,
            items:
              type === 'list' ? [{ innerText: '', innerHTML: '' }] : undefined,
          },
        },
      ])
    }
  }

  const deleteBlock = (idx) => {
    setFocus(focus > 0 ? focus - 1 : 0)
    const filteredBlocks = blocks.filter((item, id) => id !== idx)
    setBlocks([...filteredBlocks])
  }

  // TODO -> Check the setBlocks state
  const updateBlock = (idx: number, ref?: any) => {
    let newRef = ref
    if (!ref) {
      newRef = editorWrapRef.current.childNodes[idx]
    }

    console.log('updated 🤖 beep boop...', newRef)
    // update paragraph and headings
    if (
      newRef.nodeName === 'P' ||
      newRef.nodeName === 'H1' ||
      newRef.nodeName === 'H2' ||
      newRef.nodeName === 'H3' ||
      newRef.nodeName === 'H4' ||
      newRef.nodeName === 'H5' ||
      newRef.nodeName === 'H6'
    ) {
      blocks[idx].data.innerHTML = newRef.innerHTML
      blocks[idx].data.innerText = newRef.innerHTML
      blocks[idx].data.alignment = blocks[idx].data.alignment
      blocks[idx].data.style = newRef.cssText
    }
    // update lists
    if (newRef.nodeName === 'UL' || newRef.nodeName === 'OL') {
      blocks[idx].data.alignment = blocks[idx].data.alignment
      let listItemsArray = Array.from(newRef.childNodes).map((item, idx) => ({
        // @ts-ignore
        innerHTML: item.innerHTML,
        // @ts-ignore
        innerText: item.innerText,
      }))
      blocks[idx].data.items = listItemsArray
    }

    /// setBlocks(blocks)
  }

  useEffect(() => {
    // use childNodes not children you know because of logic 🤨
    let child = editorWrapRef.current.childNodes[focus] as HTMLElement
    child?.focus()
  }, [focus])

  useEffect(() => {
    console.log(' 🙄what are the blocks now --> ', blocks)
  }, [blocks])

  return (
    <styled.div>
      <styled.div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          style={{
            '& button': {
              height: '24px',
              borderRadius: '4px !important',
              '& div': {
                fontSize: '13px !important',
                lineHeight: '13px !important',
                fontWeight: '400 !important',
              },
              '& svg': {
                marginTop: '-2px',
                width: '14px',
                height: '14px',
              },
            },
          }}
        >
          <Tooltip text="Switch view">
            <Button
              onClick={() => {
                if (!htmlView) {
                  let nodes = editorWrapRef.current.children
                  setBlocks(nodeToJson(nodes))
                  setHtmlView(true)
                } else {
                  let childrenNodes = editorWrapRef.current.children[0].children
                  setBlocks(htmlNodesToJson(childrenNodes))
                  setHtmlView(false)
                }
              }}
              size="small"
              light
              color="neutral"
              icon={!htmlView ? <IconEyeOff /> : <IconEye />}
            >
              {!htmlView ? 'Html' : 'Visual'}
            </Button>
          </Tooltip>
        </styled.div>
      </styled.div>
      <styled.div
        id="editor"
        ref={editorWrapRef}
        style={{
          backgroundColor: color('background', 'default'),
          position: 'relative',
          borderRadius: 8,
          padding: '6px 20px',
          paddingBottom: '24px',
          paddingLeft: 0,
          border: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          minWidth: 680,
          marginTop: 8,
          marginBottom: 16,
          '& p': {
            lineHeight: '1.36',
            fontSize: '15px',
            paddingLeft: '13px',
            '&:focus-visible': {
              outline: '1px dashed #bfbfbf52',
            },
            '&[contenteditable=true]:empty:before': {
              content: '"Type here..."',
              color: color('content', 'default', 'secondary'),
              pointerEvents: 'none',
              display: 'absolute',
            },
          },
          '& a': {
            color: '#0a57d0',
          },
          '& h1, h2, h3, h4, h5, h6': {
            paddingLeft: '13px',
            '&:focus-visible': {
              outline: '1px dashed #bfbfbf52',
            },
            '&[contenteditable=true]:empty:before': {
              content: '"Title here..."',
              color: color('content', 'default', 'secondary'),
              pointerEvents: 'none',
              display: 'absolute',
              fontWeight: 400,
            },
          },
          '& ul, ol': {
            lineHeight: '1.36',
            fontSize: '15px',
            '&:focus-visible': {
              outline: '1px dashed #bfbfbf52 !important',
            },
          },
        }}
      >
        {!htmlView ? (
          blocks.map((item, idx) => {
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
                  focus={focus}
                  style={{
                    textAlign: item.data.alignment,
                    borderLeft:
                      focus === idx
                        ? `3px solid ${color('action', 'primary', 'normal')}`
                        : '3px solid transparent',
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
                  focus={focus}
                  style={{
                    borderLeft:
                      focus === idx
                        ? `3px solid ${color('action', 'primary', 'normal')}`
                        : '3px solid transparent',
                  }}
                />
              )
            } else if (item.type === 'list') {
              return (
                <ListBlock
                  key={idx}
                  idx={idx}
                  data={item}
                  setFocus={setFocus}
                  deleteBlock={deleteBlock}
                  blocksLength={blocks.length}
                  focus={focus}
                  style={{
                    borderLeft:
                      focus === idx
                        ? `3px solid ${color('action', 'primary', 'normal')}`
                        : '3px solid transparent',
                  }}
                />
              )
            } else if (item.type === 'html') {
              return (
                <HtmlBlock
                  key={idx}
                  idx={idx}
                  data={item}
                  setFocus={setFocus}
                  blocks={blocks}
                  focus={focus}
                  style={{
                    borderLeft:
                      focus === idx
                        ? `3px solid ${color('action', 'primary', 'normal')}`
                        : '3px solid transparent',
                  }}
                />
              )
            } else if (item.type === 'space') {
              return (
                <SpaceBlock
                  data={item}
                  key={idx}
                  idx={idx}
                  setFocus={setFocus}
                  focus={focus}
                  blocks={blocks}
                  style={{
                    borderLeft:
                      focus === idx
                        ? `3px solid ${color('action', 'primary', 'normal')}`
                        : '3px solid transparent',
                  }}
                />
              )
            }
          })
        ) : (
          // html view
          <styled.div>
            {blocks.map((item, idx) => (
              <RawHtmlBlock
                idx={idx}
                data={item}
                blocks={blocks}
                setFocus={setFocus}
                focus={focus}
                key={idx}
                style={{
                  borderLeft:
                    focus === idx
                      ? `3px solid ${color('action', 'primary', 'normal')}`
                      : '3px solid transparent',
                }}
              />
            ))}
          </styled.div>
        )}
      </styled.div>

      <Button
        size="small"
        onClick={() => {
          if (!htmlView) {
            let nodes = editorWrapRef.current.children
            setBlocks(nodeToJson(nodes))
            // TODO
            console.log('Spit out these blocks', blocks)
          } else {
            let childrenNodes = editorWrapRef.current.children[0].children
            setBlocks(htmlNodesToJson(childrenNodes))
            // TODO
            console.log('spit these blocks to DB', blocks)
          }
        }}
      >
        Publish
      </Button>
    </styled.div>
  )
}
