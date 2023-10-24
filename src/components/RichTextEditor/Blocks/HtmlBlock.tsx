import React, { FC, useRef, useEffect, useState } from 'react'
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
}

export const HtmlBlock: FC<HtmlBlockProps> = ({
  data,
  idx,
  setFocus,
  blocks,
  style,
}) => {
  const blockData = data.data

  const [html, setHtml] = useState(DOMPurify.sanitize(blockData.innerHTML))

  const codeRef = useRef()

  return (
    <styled.div
      style={{
        paddingLeft: 13,
        ...style,
      }}
      onFocus={() => setFocus(idx)}
      onBlur={() => {
        console.log('🌍')
        blocks[idx].data.innerHTML = html
      }}
      ref={codeRef}
    >
      <Code
        style={{ backgroundColor: color('background', 'neutral', 'surface') }}
        value={html}
        onChange={(v) => {
          setHtml(v)
        }}
        language="html"
      />
    </styled.div>
  )
}
