// here we go again
// output should be [{ jsons objects }]

export const htmlNodesToJson = (childNodes) => {
  let arrOfobjects = []

  for (let item of childNodes) {
    let obj, type, str

    // 1. determine type first
    str = item.innerText

    let testDiv: HTMLElement = document.createElement('div')
    testDiv.innerHTML = str

    let htmlNodeDiv = testDiv.firstChild as HTMLDivElement

    if (
      htmlNodeDiv.localName === 'h1' ||
      htmlNodeDiv.localName === 'h2' ||
      htmlNodeDiv.localName === 'h3' ||
      htmlNodeDiv.localName === 'h4' ||
      htmlNodeDiv.localName === 'h5' ||
      htmlNodeDiv.localName === 'h6'
    ) {
      type = 'heading'
    } else if (htmlNodeDiv.localName === 'p') {
      type = 'paragraph'
    } else if (
      htmlNodeDiv.localName === 'ol' ||
      htmlNodeDiv.localName === 'ul'
    ) {
      type = 'list'
    } else if (htmlNodeDiv.className === 'spacing') {
      type = 'space'
    } else if (htmlNodeDiv.localName === 'div') {
      type = 'html'
    }

    // 2. make blocks based on type

    if (type === 'heading') {
      obj = {
        id: item.id,
        type: type,
        data: {
          innerText: htmlNodeDiv.innerText,
          innerHTML: htmlNodeDiv.innerHTML,
          alignment: htmlNodeDiv.style.textAlign,
          level: htmlNodeDiv.localName,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'paragraph') {
      obj = {
        id: item.id,
        type: type,
        data: {
          innerText: htmlNodeDiv.innerText,
          innerHTML: htmlNodeDiv.innerHTML,
          alignment: htmlNodeDiv.style.textAlign,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'list') {
      let listItems = []

      console.log(htmlNodeDiv.childNodes)

      Array.from(htmlNodeDiv.childNodes)
        .filter((item: HTMLLIElement) => item.innerHTML)
        .map((item: HTMLLIElement) => {
          listItems.push({
            innerHTML: item.innerHTML,
            innerText: item.innerText,
          })
        })

      obj = {
        id: item.id,
        type: type,
        data: {
          type: htmlNodeDiv.localName === 'ul' ? 'unordered' : 'ordered',
          alignment: htmlNodeDiv.style.textAlign,
          items: listItems,
        },
      }
      arrOfobjects.push(obj)
    } else if (type === 'space') {
      let x = htmlNodeDiv.style.height
      x = x.substring(x.length - 2, x.length)

      obj = {
        id: item.id,
        type: type,
        data: {
          space: htmlNodeDiv.style.height.slice(0, -2),
          spaceFormat: x,
        },
      }

      arrOfobjects.push(obj)
    }

    // else return as html block
    else {
      obj = {
        id: item.id,
        type: 'html',
        data: {
          innerHTML: testDiv.innerHTML.trim(),
        },
      }
      arrOfobjects.push(obj)
    }
  }

  console.log('HTML --> OUTPUT-->', arrOfobjects)
  return arrOfobjects
}
