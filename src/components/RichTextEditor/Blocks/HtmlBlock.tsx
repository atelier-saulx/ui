import React, { FC, useRef, useState } from 'react'
import DOMPurify = require('dompurify')
import { Style, styled } from 'inlines'
import { Code } from '../../Code'
import { color } from '../../../varsUtilities'

type HtmlBlockProps = {
  data?: any
  idx?: number
  setFocus?: (v) => void
  blocks?: any
  style?: Style
  focus?: number
}

export const HtmlBlock: FC<HtmlBlockProps> = ({
  data,
  idx,
  setFocus,
  blocks,
  focus,
  style,
}) => {
  const blockData = data.data

  const [html, setHtml] = useState(DOMPurify.sanitize(blockData.innerHTML))

  let htmlRef = useRef<HTMLElement>()

  // on new block puts focus in first caret place
  if (!blockData.innerHTML && focus === idx) {
    setTimeout(() => {
      let x = htmlRef.current.childNodes[0].childNodes[0]
        .childNodes[0] as HTMLTextAreaElement
      x.focus()
    }, 50)
  }

  return (
    <styled.div
      style={{
        paddingLeft: 13,
        marginBottom: 12,
        ...style,
      }}
      onFocus={() => setFocus(idx)}
      //   onBlur={() => {
      //     console.log('🌍')
      //   }}
      ref={htmlRef}
    >
      <Code
        style={{ backgroundColor: color('background', 'neutral', 'surface') }}
        value={blockData.innerHTML}
        onChange={(v) => {
          setHtml(v)
          blocks[idx].data.innerHTML = v
        }}
        language="html"
      />
    </styled.div>
  )
}
