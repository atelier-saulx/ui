// input json
// output html as string

/// block types -> header, paragraph, list, html, image, space

export const htmlBlocksParser = (
  jsonBlocks: { type: string; id: string; data: any }[]
) => {
  //  block are array of objects
  // loop through the type and data
  console.log(jsonBlocks, '👮🏼')

  let htmlString = ''

  jsonBlocks.map((block, idx) => {
    if (block.type === 'header') {
      htmlString += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
    }
    if (block.type === 'paragraph') {
      htmlString += `<p>${block.data.text}</p>`
    }
    if (block.type === 'list') {
      htmlString += `${block.data.style === 'ordered' ? '<ol>' : '<ul>'}
      ${block.data.items.map((listItem) => `<li>${listItem}</li>`).join('')}
      ${block.data.style === 'ordered' ? '</ol>' : '</ul>'}`
    }
    if (block.type === 'html') {
      htmlString += block.data.html
    }
    if (block.type === 'image') {
      htmlString += `<img src="${block.data.url}" />`
    }
    if (block.type === 'space') {
      htmlString += `<div style="height:${
        block.data.space + block.data.spaceFormat
      };"/>`
    }
  })

  return htmlString
}
