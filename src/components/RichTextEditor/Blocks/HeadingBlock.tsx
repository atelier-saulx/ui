import React, { FC } from 'react'
import DOMPurify = require('dompurify')

type HeadingBlockProps = {
  onMouseOver?: () => void
  data?: any
}

export const HeadingBlock: FC<HeadingBlockProps> = ({ onMouseOver, data }) => {
  const blockData = data.data

  return blockData.level === 'h1' ? (
    <h1
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : blockData.level === 'h2' ? (
    <h2
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : blockData.level === 'h3' ? (
    <h3
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : blockData.level === 'h4' ? (
    <h4
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : blockData.level === 'h5' ? (
    <h5
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
    />
  ) : blockData.level === 'h6' ? (
    <h6
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  ) : (
    <h1
      style={{ textAlign: blockData.alignment }}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify.sanitize(blockData.innerHTML) ||
          DOMPurify.sanitize(blockData.innerText),
      }}
      onMouseOver={onMouseOver}
    />
  )
}
