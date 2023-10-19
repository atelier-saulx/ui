import React, { FC, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Header } from './Header'
import { ParagraphBlock } from './Blocks/ParagaphBlock'
import { HeadingBlock } from './Blocks/HeadingBlock'

export type RichTextEditorProps = {
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

const AddNewBlock = (type, arr, idx) => {
  arr.push(type)
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ data, style }) => {
  const editorWrapRef = useRef<HTMLElement>()

  const arrayOfDataBlocks = ['paragraph', 'header', 'paragraph']

  return (
    <styled.div>
      <Button
        onClick={() => {
          AddNewBlock('paragraph', arrayOfDataBlocks, 1)
          console.log(arrayOfDataBlocks)
        }}
      >
        test
      </Button>
      <Header />
      <styled.div
        id="flap"
        ref={editorWrapRef}
        style={{
          padding: '6px 20px',
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
        }}
      >
        {arrayOfDataBlocks.map((item, idx) => {
          if (item === 'paragraph') {
            return <ParagraphBlock key={idx} />
          } else if (item === 'header') {
            return <HeadingBlock key={idx} />
          }
        })}
        {/* // pass ref to appendChild ?? */}

        {/* <ParagraphBlock parent={flappie} /> */}
      </styled.div>

      <Button
        onClick={() => {
          // get all html nodes inside the ref
          let snork = editorWrapRef.current.childNodes
          console.log(snork, '📌')

          const flappie = document.getElementById('flap')
          console.log(flappie, 'flappie>>?')

          const blah = document.createElement('p')
          blah.textContent = 'aefaewfwaef'

          flappie.appendChild(blah)

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
