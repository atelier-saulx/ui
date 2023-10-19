import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Row } from '../Styled'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import {
  IconFormatItalic,
  IconText,
  IconFormatBold,
  IconFormatAlignLeft,
  IconFormatAlignCenter,
  IconFormatAlignRight,
  IconFormatAlignJustify,
} from '../../icons'

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

const makeTextBold = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  let b = document.createElement('b')
  b.appendChild(selectedText)
  selection.insertNode(b)
}

const makeTextItalic = () => {
  let selection = window.getSelection().getRangeAt(0)
  let selectedText = selection.extractContents()
  let i = document.createElement('i')
  i.appendChild(selectedText)
  selection.insertNode(i)
}

const textAlign = (alignment: string) => {
  console.log(window.getSelection().focusNode.parentElement)
  let parentEl = window.getSelection().focusNode.parentElement
  parentEl.style.textAlign = alignment
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ data, style }) => {
  return (
    <styled.div>
      <Row
        style={{
          gap: 4,
          '& button': {
            width: '24px !important',
            height: '24px',
            borderRadius: '2px !important',
          },
          '& svg': {
            width: '12px',
            height: '12px',
          },
        }}
      >
        <Button
          onClick={makeTextBold}
          size="small"
          light
          color="neutral"
          icon={<IconFormatBold />}
        />
        <Button
          onClick={makeTextItalic}
          size="small"
          light
          color="neutral"
          icon={<IconFormatItalic />}
        />
        <Button
          onClick={() => textAlign('left')}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignLeft />}
        />
        <Button
          onClick={() => textAlign('center')}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignCenter />}
        />
        <Button
          onClick={() => textAlign('right')}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignRight />}
        />
        <Button
          onClick={() => textAlign('justify')}
          size="small"
          light
          color="neutral"
          icon={<IconFormatAlignJustify />}
        />
      </Row>
      <styled.div
        style={{
          padding: 8,
          border: `1px solid ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          marginTop: 16,
          marginBottom: 16,
          '& p': {
            padding: 12,
            lineHeight: 1.36,
            fontSize: 15,
          },
        }}
      >
        <p
          className="rte-paragraph"
          style={{ textAlign: 'left' }}
          contentEditable
          suppressContentEditableWarning
          autoFocus
        >
          Do an almighty painting with us. Use what you see, don't plan it. This
          piece of canvas is your world. And that's when it becomes fun - you
          don't have to spend your time thinking about what's happening - you
          just let it happen.
        </p>
      </styled.div>

      <Button
        onClick={() => {
          // testing for now
          let snurp = document.getElementsByClassName('rte-paragraph')
          console.log('snurp --> ', snurp)

          /// output can look something like this
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
