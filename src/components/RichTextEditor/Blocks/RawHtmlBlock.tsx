import React, { useEffect, useState } from 'react'
import { Code } from '../../Code'
import { color } from '../../../varsUtilities'

// html block for htlm view !
export const RawHtmlBlock = ({
  data,
  blocks,
  updateHtmlBlock,
  setFocus,
  focus,
  idx,
  style,
}) => {
  //   console.log('Raw Science bithc', data)

  const [htmlString, setHtmlString] = useState('')

  let str
  let blockStyle = ''

  let level = data.data.level
  let innerHTML = data.data.innerHTML || data.data.innerText
  let alignment = data.data.alignment
  let listType = data.data.type
  let space = data.data.space
  let spaceFormat = data.data.spaceFormat

  if (data.type === 'heading') {
    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }

    str = `<${level}${blockStyle}>${innerHTML}</${level}>`
  }

  if (data.type === 'paragraph') {
    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }

    str = `<p${blockStyle}>${innerHTML}</p>`
  }

  if (data.type === 'list') {
    let listItems = data.data.items
      .map((item) => `\t<li>${item.innerHTML || item.innerText}</li>\n`)
      .join(' ')

    if (alignment) {
      blockStyle = ` style="text-align:${alignment}"`
    }

    str = `<${
      listType === 'unordered' ? 'ul' : 'ol'
    }${blockStyle}>\n${listItems}</${listType === 'unordered' ? 'ul' : 'ol'}>`
  }

  if (data.type === 'space') {
    str = `<div class="spacing" style="height:${space}${spaceFormat}" />`
  }

  if (data.type === 'html') {
    str = innerHTML
  }

  useEffect(() => {
    setHtmlString(str)
  }, [])

  // now the view updates on moving blocks around
  useEffect(() => {
    setHtmlString(str)
  }, [blocks])

  return (
    <div onFocus={() => setFocus(idx)} id={data.id} className="raw">
      <Code
        style={{
          borderBottom: '1px dashed #bfbfbf52',
          padding: '0px 6px',
          ...style,
        }}
        // @ts-ignore
        onBlur={() => updateHtmlBlock()}
        value={htmlString}
        onChange={(v) => {
          setHtmlString(v)

          //   blocks[idx].innerHTML = v
          //   console.log('blocks??', blocks)
        }}
        language="html"
      />
    </div>
  )
}
