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
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  data,
  deleteBlock,
  idx,
  makeNewBlock,
  setFocus,
  style,
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
      onKeyDown={(e) => {
        // TODO -> Shift + Enter
        if (e.key === 'Enter') {
          e.preventDefault()
          let selection = window.getSelection()
          let anchorNodeLength = selection.anchorNode.length
          let focusOffset = selection.anchorOffset

          if (anchorNodeLength === focusOffset) {
            makeNewBlock('paragraph', idx)
            pRef.current.blur()
            setFocus(idx + 1)
          }
        }
        if (e.key === 'Backspace') {
          let selection = window.getSelection()
          let anchorNodeLength = selection.anchorNode.length
          let focusOffset = selection.anchorOffset

          if (!anchorNodeLength && focusOffset === 0) {
            deleteBlock(idx)
            setFocus(idx - 1)
            // todo caret at end
          }
        }
      }}
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
    />
  )
}
