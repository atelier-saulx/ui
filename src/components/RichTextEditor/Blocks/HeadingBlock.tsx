import React, { FC } from 'react'
import DOMPurify = require('dompurify')
import { Style } from 'inlines'

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
}) => {
  const blockData = data.data

  return blockData.level === 'h1' ? (
    <h1
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
