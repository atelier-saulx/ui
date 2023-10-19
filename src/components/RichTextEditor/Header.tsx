import React from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../Button'
import { color } from '../../varsUtilities'
import { Row } from '../Styled'
import {
  IconFormatItalic,
  IconText,
  IconFormatBold,
  IconFormatAlignLeft,
  IconFormatAlignCenter,
  IconFormatAlignRight,
  IconFormatAlignJustify,
  IconPlus,
} from '../../icons'

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
  // TODO make sure parentnode is not a b or i
  console.log(window.getSelection())
  let parentEl = window.getSelection().focusNode.parentElement
  parentEl.style.textAlign = alignment
}

export const Header = () => {
  return (
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
      <Button onClick={() => {}} size="small" icon={<IconPlus />} />
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
  )
}
