import React, { FC } from 'react'
import DOMPurify = require('dompurify')
import { Style } from 'inlines'

type HeadingBlockProps = {
  data?: any
  idx?: number
  setFocus?: (v) => void
  style?: Style
}

export const HeadingBlock: FC<HeadingBlockProps> = ({
  setFocus,
  idx,
  data,
  style,
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
    />
  )
}
