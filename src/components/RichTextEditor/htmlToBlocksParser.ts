export const htmlToBlocksParser = (data, html) => {
  console.log('🍿 --> the data', data)
  console.log('🍟 --> the html', html)

  let ogBlocks = data.blocks

  let DomParser = new DOMParser()
  let parsedHtml = DomParser.parseFromString(html, 'text/html')
  const HTMLArray = [...parsedHtml.body.children].map((el) => el.outerHTML)

  // now from this html array make blocks again -->
  let newBlocks = []

  HTMLArray.map((item) => {
    // headers
    if (item.substring(0, 2) === '<h') {
      newBlocks.push({
        id: 'todoSnurpHead',
        type: 'header',
        data: {
          // remove tags and newlines
          text: item.slice(4).slice(0, -5),
          level: item.substring(3, 4),
        },
      })
    }

    // paragraphs
    if (item.substring(0, 2) === '<p') {
      newBlocks.push({
        id: 'todoSnurp',
        type: 'paragraph',
        data: {
          // remove tags and newlines
          text: item.slice(4).slice(0, -5),
        },
      })
    }
  })

  console.log(HTMLArray, '🔑??')
  console.log('NEWBLOCKS??', newBlocks)

  console.log('🚒parsed html ??', html)

  data.blocks = [...newBlocks]

  return data

  // walkthrough the html and see if you encounter html tags, break that up
  // so if you encounter <p></p> --> turn it into paragraph block etc
  // -> cut off pieces of the html
}
