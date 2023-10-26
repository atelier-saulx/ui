// input html nodes

// TODO: gen Id -> or pass Ids --> pass ids to keep them the same
// TODO: styling and or classes , think about it.

export const nodeToJson = (nodes) => {
  let arrOfobjects = []
  console.log(nodes)

  for (let item of nodes) {
    let type, data, innerHTML, innerText, alignment, level, obj

    // 1. first determine type and let's make objects based of that
    if (
      item.localName === 'h1' ||
      item.localName === 'h2' ||
      item.localName === 'h3' ||
      item.localName === 'h4' ||
      item.localName === 'h5' ||
      item.localName === 'h6'
    ) {
      type = 'heading'
    } else if (item.localName === 'p') {
      type = 'paragraph'
    } else if (item.localName === 'ol' || item.localName === 'ul') {
      type = 'list'
    } else if (item.className === 'spacing') {
      type = 'space'
    }

    // 2. objects based on type
    if (type === 'heading') {
      obj = {
        id: 'snurp',
        type: type,
        data: {
          innerHTML: item.innerHTML,
          innerText: item.innerText,
          level: item.localName,
          alignment: item.style.textAlign,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'paragraph') {
      obj = {
        id: 'slork',
        type: type,
        data: {
          innerHTML: item.innerHTML,
          innerText: item.innerText,
          alignment: item.style.textAlign,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'list') {
      let itemsArr = []
      Array.from(item.children).map((listitem: HTMLLIElement) => {
        itemsArr.push({
          innerHTML: listitem.innerHTML,
          innerText: listitem.innerText,
        })
      })

      obj = {
        id: 'slist',
        type: type,
        data: {
          type: item.localName === 'ul' ? 'unordered' : 'ordered',
          alignment: item.style.textAlign,
          items: itemsArr,
        },
      }
      arrOfobjects.push(obj)
    } else if (type === 'space') {
      console.log('space -->: ', item.firstChild)

      let str = item.firstChild.style.height
      str = str.substring(str.length - 2, str.length)

      obj = {
        id: 'spiaafe',
        type: type,
        data: {
          space: item.firstChild.style.height.slice(0, -2),
          spaceFormat: str,
        },
      }

      arrOfobjects.push(obj)
    }

    // create objects based on localName
    // give correct data
    // push to arr
  }

  console.log('OUTPUT --> ', arrOfobjects)
  return null
}
