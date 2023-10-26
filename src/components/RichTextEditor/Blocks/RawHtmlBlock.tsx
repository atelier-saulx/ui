import React from 'react'
import { Code } from '../../Code'

// html block for htlm view !
export const RawHtmlBlock = (data) => {
  console.log('Raw Science bithc', data)

  let str
  let style = ''

  let level = data.data.data.level
  let innerHTHML = data.data.data.innerHTML || data.data.data.innerText
  let alignment = data.data.data.alignment
  let listType = data.data.data.type
  let space = data.data.data.space
  let spaceFormat = data.data.data.spaceFormat

  if (data.data.type === 'heading') {
    if (alignment) {
      style = ` style="text-align:${alignment}"`
    }

    str = `<${level}${style}>${innerHTHML}</${level}>`
  }

  if (data.data.type === 'paragraph') {
    if (alignment) {
      style = ` style="text-align:${alignment}"`
    }

    str = `<p${style}>${innerHTHML}</p>`
  }

  if (data.data.type === 'list') {
    let listItems = data.data.data.items
      .map((item) => `\t<li>${item.innerHTML || item.innerText}</li>\n`)
      .join(' ')

    if (alignment) {
      style = ` style="text-align:${alignment}"`
    }

    str = `<${listType === 'unordered' ? 'ul' : 'ol'}${style}>\n${listItems}</${
      listType === 'unordered' ? 'ul' : 'ol'
    }>`
  }

  if (data.data.type === 'space') {
    str = `<div class="spacing" style="height:${space}${spaceFormat}" />`
  }

  if (data.data.type === 'html') {
    str = innerHTHML
  }

  return (
    <Code
      style={{ borderBottom: '1px dashed #bfbfbf52', padding: '0px 6px' }}
      value={str}
      language="html"
    />
  )
}
