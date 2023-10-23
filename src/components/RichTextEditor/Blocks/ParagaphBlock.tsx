import React, { FC, useRef, useEffect } from 'react'
import DOMPurify = require('dompurify')
import { Style } from 'inlines'

type ParagaphBlockProps = {
  data: any
  deleteBlock?: (v) => void
  idx?: number
  makeNewBlock?: (v, idx) => void
  setFocus?: (v) => void
  style?: Style
  updateBlock?: (v, r) => void
  keyDownHandler?: any
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  data,
  deleteBlock,
  idx,
  makeNewBlock,
  setFocus,
  style,
  updateBlock,
  keyDownHandler,
}) => {
  const blockData = data.data

  const pRef = useRef<HTMLParagraphElement>()

  useEffect(() => {
    if (pRef.current && blockData.style) {
      pRef.current.style.cssText = blockData.style
    }
  }, [pRef.current])

  return (
    <p
      style={{ textAlign: blockData.alignment, ...style }}
      ref={pRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx, pRef.current)}
      onKeyDown={(e) => {
        keyDownHandler(e, idx, setFocus, makeNewBlock, deleteBlock, 'paragraph')
      }}
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
    />
  )
}
