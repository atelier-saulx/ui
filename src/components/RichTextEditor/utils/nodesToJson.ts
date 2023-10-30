// input html nodes

// TODO: gen Id -> or pass Ids --> pass ids to keep them the same
// TODO: styling and or classes , think about it.

export const nodeToJson = (nodes) => {
  let arrOfobjects = []
  // console.log(nodes)

  for (let item of nodes) {
    let type, obj

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
    } else if (item.localName === 'div') {
      type = 'html'
    }

    // 2. objects based on type
    if (type === 'heading') {
      obj = {
        id: item.id,
        type: type,
        data: {
          innerHTML: item.innerHTML,
          innerText: item.innerText,
          level: item.localName,
          alignment: item.style.textAlign,
          style: item.style.cssText,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'paragraph') {
      obj = {
        id: item.id,
        type: type,
        data: {
          innerHTML: item.innerHTML,
          innerText: item.innerText,
          alignment: item.style.textAlign,
          style: item.style.cssText,
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
        id: item.id,
        type: type,
        data: {
          type: item.localName === 'ul' ? 'unordered' : 'ordered',
          alignment: item.style.textAlign,
          items: itemsArr,
          style: item.style.cssText,
        },
      }
      arrOfobjects.push(obj)
    } else if (type === 'space') {
      let str = item.firstChild.style.height
      str = str.substring(str.length - 2, str.length)

      obj = {
        id: item.id,
        type: type,
        data: {
          space: item.firstChild.style.height.slice(0, -2),
          spaceFormat: str,
        },
      }

      arrOfobjects.push(obj)
    } else if (type === 'html') {
      obj = {
        id: item.id,
        type: type,
        data: {
          innerHTML: item.innerText.trim(),
        },
      }

      arrOfobjects.push(obj)
    }

    // create objects based on localName
    // give correct data
    // push to arr
  }

  // console.log('OUTPUT --> ', arrOfobjects)
  return arrOfobjects
}
