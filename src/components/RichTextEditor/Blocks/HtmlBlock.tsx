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
