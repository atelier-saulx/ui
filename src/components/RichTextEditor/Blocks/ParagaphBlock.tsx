import React, { FC, useRef, useEffect, useState } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'
import { color } from '../../../varsUtilities'
import { Text } from '../../Text'

type ParagaphBlockProps = {
  data: any
  deleteBlock?: (v) => void
  idx?: number
  makeNewBlock?: (v, idx) => void
  setFocus?: (v) => void
  style?: Style
  updateBlock?: (v, r) => void
  keyDownHandler?: any
  blocksLength?: number
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
  blocksLength,
}) => {
  const blockData = data.data

  const pRef = useRef<HTMLParagraphElement>()

  useEffect(() => {
    console.log(pRef)
    if (pRef.current && blockData.style) {
      pRef.current.style.cssText = blockData.style
    }
  }, [pRef.current])

  return (
    <styled.p
      style={{
        textAlign: blockData.alignment,
        ...style,
      }}
      ref={pRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocus(idx)}
      onInput={() => updateBlock(idx, pRef.current)}
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
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
    />
  )
}
