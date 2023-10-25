import React, { FC, useRef } from 'react'
import DOMPurify = require('dompurify')
import { Style } from 'inlines'
import { useKeyboardShortcut } from '../../../hooks'

type HeadingBlockProps = {
  data?: any
  deleteBlock?: (v) => void
  idx?: number
  keyDownHandler?: any
  makeNewBlock?: (v, idx) => void
  setFocus?: (v) => void
  style?: Style
  updateBlock?: (v) => void
  blocksLength?: number
  focus?: number
}

export const HeadingBlock: FC<HeadingBlockProps> = ({
  data,
  deleteBlock,
  idx,
  keyDownHandler,
  makeNewBlock,
  setFocus,
  style,
  updateBlock,
  blocksLength,
  focus,
}) => {
  const blockData = data.data
  const headRef = useRef<HTMLParagraphElement>()

  const enterLineBreak = () => {
    // fucks sake this works bit weird but ok
    let selection = window.getSelection().getRangeAt(0)
    let selectedText = selection.extractContents()
    let br = document.createElement('br')
    br.appendChild(selectedText)
    selection.insertNode(br)
  }

  useKeyboardShortcut('Shift+Enter', enterLineBreak, headRef)

  if (!blockData.innerHTML && !blockData.innerText && focus === idx) {
    setTimeout(() => {
      headRef.current.focus()
    }, 50)
  }

  return blockData.level === 'h1' ? (
    <h1
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : blockData.level === 'h2' ? (
    <h2
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : blockData.level === 'h3' ? (
    <h3
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : blockData.level === 'h4' ? (
    <h4
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : blockData.level === 'h5' ? (
    <h5
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : blockData.level === 'h6' ? (
    <h6
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  ) : (
    <h1
      ref={headRef}
      style={{ textAlign: blockData.alignment, ...style }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx)}
      onKeyDown={(e) => {
        keyDownHandler(
          e,
          idx,
          setFocus,
          makeNewBlock,
          deleteBlock,
          'paragraph',
          blocksLength
        )
      }}
    />
  )
}
