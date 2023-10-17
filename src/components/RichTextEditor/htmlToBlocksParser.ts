export const htmlToBlocksParser = (data, html) => {
  console.log('🍿 --> the data', data)
  console.log('🍟 --> the html', html)

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
          text: item.slice(4).slice(0, -5),
          level: item.substring(2, 3),
        },
      })
    }
    // paragraphs
    if (item.substring(0, 2) === '<p') {
      newBlocks.push({
        id: 'todoSnurp',
        type: 'paragraph',
        data: {
          text: item.slice(4).slice(0, -5),
        },
      })
    }
    // lists
    if (item.substring(0, 2) === '<u' || item.substring(0, 2) === '<o') {
      let parsedList = DomParser.parseFromString(item, 'text/html')
      let listItems = parsedList.querySelectorAll('li')
      let Arr = [...listItems].map((item) => item.innerHTML)

      newBlocks.push({
        id: 'todoSnurpList',
        type: 'list',
        data: {
          type: item.substring(0, 2) === '<u' ? 'unordered' : 'ordered',
          items: Arr,
        },
      })
    }
    // image
    if (item.substring(0, 3) === '<im') {
      // get src
      const rex = /<img[^>]+src="([^">]+)/g
      const imgSrc = rex.exec(item)[1]

      newBlocks.push({
        id: 'todoSnurpIMG',
        type: 'image',
        data: {
          url: imgSrc,
        },
      })
    }
    // space
    if (item.substring(0, 4) === '<div' && item.includes(`class="spacing"`)) {
      let spacingEl = DomParser.parseFromString(item, 'text/html')
      let spacingDiv: HTMLDivElement = spacingEl.querySelector('.spacing')
      let height = spacingDiv.style.height.toString()

      let newSpaceFormat
      if (height.substring(height.length - 3) === 'rem') {
        newSpaceFormat = 'rem'
      } else {
        newSpaceFormat = height.substring(height.length - 2)
      }

      let newSpace = height.replace(newSpaceFormat, '')

      newBlocks.push({
        id: 'todoSnurpSPACE',
        type: 'space',
        data: {
          space: +newSpace,
          spaceFormat: newSpaceFormat,
        },
      })
    }
  })

  console.log(HTMLArray, '🔑??')
  console.log('NEWBLOCKS??', newBlocks)

  data.blocks = [...newBlocks]

  return data
}
