// input html nodes

// TODO: gen Id -> or pass Ids

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

      console.log('to be pushed HEAD->', obj)
    }

    // create objects based on localName
    // give correct data
    // push to arr
  }

  return null
}
