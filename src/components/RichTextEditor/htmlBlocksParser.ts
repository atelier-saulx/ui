type blockTypes = 'header' | 'paragraph' | 'list' | 'html' | 'image' | 'space'

export const htmlBlocksParser = (
  jsonBlocks: { type: blockTypes; id: string; data: any }[]
) => {
  let htmlString = ''

  jsonBlocks.map((block, idx) => {
    if (block.type === 'header') {
      htmlString += `<h${block.data.level}>${block.data.text}</h${block.data.level}>\n`
    }
    if (block.type === 'paragraph') {
      htmlString += `<p>\n${block.data.text}\n</p>\n`
    }
    if (block.type === 'list') {
      htmlString += `${
        block.data.style === 'ordered' ? '<ol>\n' : '<ul>\n'
      }${block.data.items
        .map((listItem) => `\t<li>${listItem}</li>\n`)
        .join('')}${block.data.style === 'ordered' ? '</ol>\n' : '</ul>\n'}`
    }
    if (block.type === 'html') {
      htmlString += block.data.html + '\n'
    }
    if (block.type === 'image') {
      htmlString += `<img src="${block.data.url}" />\n`
    }
    if (block.type === 'space') {
      htmlString += `<div style="height:${
        block.data.space + block.data.spaceFormat
      };"/>\n`
    }
  })

  return htmlString
}
