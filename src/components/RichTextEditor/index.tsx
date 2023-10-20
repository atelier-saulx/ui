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

const AddNewBlock = (type, arr, idx) => {
  arr.push(type)
}

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
