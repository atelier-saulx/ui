import React, { FC, useRef, useEffect } from 'react'
import DOMPurify = require('dompurify')
import { Text } from '../../Text'

type ParagaphBlockProps = {
  innerText?: string
  innerHTML?: string
  alignment?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
  style?: string
  id?: string
}

export const ParagraphBlock: FC<ParagaphBlockProps> = ({
  innerText,
  innerHTML,
  alignment = 'inherit',
  style,
  id,
}) => {
  // TODO: sanitze?
  // TODO: fix style -> maybe set style throug js to this p tag.

  const pRef = useRef<HTMLParagraphElement>()

  useEffect(() => {
    if (pRef.current && style) {
      pRef.current.style.cssText = style
    }
  }, [pRef.current])

  return (
    <>
      <p
        style={{ textAlign: alignment }}
        ref={pRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => console.log('yo focussed on block id -> ', id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            //   const p = createElement('ParagraphBlock', { parent: parent })
            //   console.log(parent)
            console.log('MAKE NEW BLOCK')
          }
        }}
        dangerouslySetInnerHTML={{
          __html:
            DOMPurify.sanitize(innerHTML) || DOMPurify.sanitize(innerText),
        }}
      />
    </>
  )
}
