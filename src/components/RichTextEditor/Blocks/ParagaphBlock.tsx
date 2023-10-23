import React, { FC, useRef, useEffect } from 'react'
import DOMPurify = require('dompurify')
import { Text } from '../../Text'

type ParagaphBlockProps = {
  makeNewBlock?: (v) => void
  data: any
  idx?: number
  setFocus?: (v) => void
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  data,
  makeNewBlock,
  idx,
  setFocus,
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
      style={{ textAlign: blockData.alignment }}
      ref={pRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocus(idx)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          let selection = window.getSelection()
          let anchorNodeLength = selection.anchorNode.length
          let focusOffset = selection.anchorOffset
          if (anchorNodeLength === focusOffset) {
            makeNewBlock('paragraph')
            pRef.current.blur()
            setFocus(idx + 1)
          }
        }
        if (e.key === 'Backspace') {
          console.log('backup in this mf')
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
