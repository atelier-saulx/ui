// TODO this file is ununed?

const toHtmlSafeChar = (char: string): string => {
  if (char === '>') {
    return '&gt;'
  }

  if (char === '<') {
    return '&lt;'
  }

  if (char === '"') {
    return '&quot;'
  }

  if (char === '&') {
    return '&amp;'
  }

  if (char === "'") {
    return '&#039;'
  }

  return char
}

// only js supported now
export default (code: string, type: 'js' | 'ts' | 'json' = 'js'): string => {
  //   const words = code.split(/\s/g)

  // &lt; &gt;

  //

  const string = []

  const tracker = [
    [-1], // 0 double quote
    [-1], // 1 single quote
    [-1], // 2 template string
    [-1], // 3 < >
    [-1], // 4 curly {}
    [-1], // 5 ()
    [-1], // 6 []
    // 7 indivudal operator
  ]

  for (let i = 0; i < code.length; i++) {
    // now check if we are not in other things

    if (code[i] === "'") {
      if (tracker[1][0] !== -1) {
        string[i] = 11
        tracker[1][0] = -1
      } else {
        string[i] = 1
        tracker[1][0] = i
      }
    } else if (code[i] === '<') {
      if (tracker[3][0] === -1) {
        string[i] = 3
        tracker[3][0] = i
      } else {
        string[tracker[3][0]] = 7
        tracker[3][0] = -1
      }
    } else if (code[i] === '>' && tracker[3][0] !== -1) {
      string[i] = 31
      tracker[3][0] = -1
    } else if (code[i] === '>' && tracker[3][0] === -1) {
      string[i] = 7
    }
  }

  let str = []

  // &lt; x &gt;

  for (let i = 0; i < string.length; i++) {
    if (string[i]) {
      if (string[i] === 3) {
        str[i] = '!START<span style="color:red">&lt;'
      } else if (string[i] === 31) {
        str[i] = '&gt;</span>END!'
      } else if (string[i] === 7) {
        // str[i] = `[[[[<span style="color:blue">${toHtmlSafeChar(
        //   code[i]
        // )}</span>]]]]`
      }
    } else {
      str[i] = code[i]
    }
  }

  return str.join('')
}
