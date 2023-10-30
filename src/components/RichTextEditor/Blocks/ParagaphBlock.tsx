import React, { FC, useRef, useEffect, useState } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'
import { color } from '../../../varsUtilities'
import { Text } from '../../Text'
import { useKeyboardShortcut } from '../../../hooks'

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
  focus?: number
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
  focus,
}) => {
  const blockData = data.data

  const pRef = useRef<HTMLParagraphElement>()

  useEffect(() => {
    if (pRef.current && blockData.style) {
      pRef.current.style.cssText = blockData.style
    }
  }, [pRef.current])

  const enterLineBreak = () => {
    // fucks sake this works bit weird but ok
    let selection = window.getSelection().getRangeAt(0)
    let selectedText = selection.extractContents()
    let br = document.createElement('br')
    br.appendChild(selectedText)
    selection.insertNode(br)
  }

  useKeyboardShortcut('Shift+Enter', enterLineBreak, pRef)

  if (!blockData.innerHTML && !blockData.innerText && focus === idx) {
    setTimeout(() => {
      pRef.current.focus()
    }, 50)
  }

  return (
    <styled.p
      id={data.id}
      style={{
        textAlign: blockData.alignment,
        ...style,
      }}
      ref={pRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => {
        setFocus(idx)
      }}
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
