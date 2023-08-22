import React from 'react'

const symbols = new Map()

const init = () => {
  const frag = React.createElement(React.Fragment, {}, [])
  symbols.set(frag.type, 'fragment')
}

init()

export const checkType = (str: string, type: any): boolean => {
  return type === str || (Array.isArray(type) && type.includes(str))
}

export const fieldToCode = (val: any): string => {
  if (typeof val === 'string') {
    return `'${val}'`
  }

  if (
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    typeof val === 'undefined'
  ) {
    return String(val)
  }

  if (typeof val === 'function') {
    return val.toString()
  }

  if (typeof val === 'object') {
    return '\n' + objectToCode(val)
  }
  return 'undefined'
}

const isCustomComponent = (v: string): boolean => {
  return v[0] === v[0].toUpperCase()
}

export const objectToCode = (obj: Object | any[]): string => {
  if (!obj) {
    return 'null'
  }

  if (Array.isArray(obj)) {
    let str = '['
    for (const val of obj) {
      str += `${fieldToCode(val)},`
    }
    str = str.slice(0, -1)
    str += ']'
    return str
  }
  let str = '{\n'
  for (const key in obj) {
    const keyStr = key.includes(' ') || key.includes('.') ? `'${key}'` : key
    str += `  ${keyStr}: ${fieldToCode(obj[key])},\n`
  }
  str = str.slice(0, -2)
  str += '\n}'
  return str
}

export const toComponent = (
  name: string,
  exampleProps: any,
  propsHeader?: string[],
  indent: string = '  '
) => {
  const multiline =
    (propsHeader && propsHeader.length > 3) ||
    (propsHeader && propsHeader.find((c) => /on[A-z]/.test(c)))
  const s = indent.slice(2) || ''
  const header = !propsHeader
    ? `${s}<${name}`
    : `${s}<${name} ${
        multiline
          ? '\n' + indent + propsHeader.join('\n' + indent)
          : propsHeader.join(' ')
      }`

  if (propsHeader && exampleProps.children) {
    return `${header}${multiline ? `\n` : ''}>
  ${s}${exampleProps.children}
${s}</${name}>      
  `
  } else if (propsHeader) {
    return header + `${multiline ? `\n${s}` : ''}/>`
  }
  return header
}

export const propsToCode = (
  name: string,
  exampleProps: any,
  indent: string = ''
): { propsHeader: string[]; components: string[] } => {
  const components = [name]

  let propsHeader: string[] = []

  for (const k in exampleProps) {
    const v = exampleProps[k]
    if (typeof v === 'function') {
      if (isCustomComponent(v.name)) {
        propsHeader.push(`${k}={${v.name}}`)
        if (!components.includes(v.name)) {
          components.push(v.name)
        }
      } else {
        propsHeader.push(`${k}={${v.toString()}}`)
      }
    } else if (k === 'children') {
      if (React.isValidElement(v)) {
        exampleProps.children = ''
        // @ts-ignore
        let name = v.type.name
        if (!name) {
          if (symbols.get(v.type) === 'fragment') {
            // @ts-ignore
            if (v.props.children) {
              // @ts-ignore
              if (Array.isArray(v.props.children)) {
                // @ts-ignore
                for (let i = 0; i < v.props.children.length; i++) {
                  // @ts-ignore
                  const c = v.props.children[i]
                  // @ts-ignore
                  if (React.isValidElement(c) && c.type.name) {
                    // @ts-ignore
                    name = c.type.name
                    const nestedPropCode = propsToCode(
                      name,
                      c.props,
                      '  ' + indent
                    )
                    for (const c of nestedPropCode.components) {
                      if (!components.includes(c)) {
                        components.push(c)
                      }
                    }
                    const code = toComponent(
                      name,
                      c.props,
                      nestedPropCode.propsHeader,
                      '  ' + indent
                    )
                    exampleProps.children += '\n' + (i > 0 ? '  ' : '') + code
                  } else {
                    exampleProps.children += ''
                  }
                }
                exampleProps.children = exampleProps.children.slice(1)
              }
            }
          }
        } else if (name) {
          const nestedPropCode = propsToCode(name, v.props, indent + '  ')
          for (const c of nestedPropCode.components) {
            if (!components.includes(c)) {
              components.push(c)
            }
          }
          const code = toComponent(
            name,
            v.props,
            nestedPropCode.propsHeader,
            indent + '  '
          )
          if (code) {
            exampleProps.children = code
          } else {
            exampleProps.children = 'some children...'
          }
        } else {
          exampleProps.children = 'some children...'
        }
      } else if (typeof exampleProps.children !== 'string') {
        exampleProps.children = 'some children...'
      } // same here!
    } else if (typeof v === 'string') {
      propsHeader.push(`${k}="${v}"`)
    } else if (typeof v === 'boolean' && v === true) {
      propsHeader.push(`${k}`)
    } else if (typeof v === 'number') {
      propsHeader.push(`${k}={${v}}`)
    } else if (typeof v === 'object') {
      if (React.isValidElement(v)) {
        // @ts-ignore
        const name = v.type.name
        if (name) {
          const nestedPropCode = propsToCode(name, v.props, indent)
          for (const c of nestedPropCode.components) {
            if (!components.includes(c)) {
              components.push(c)
            }
          }
          const oneLine =
            // @ts-ignore
            nestedPropCode.propsHeader.length < 3 && !v.props.children
          const code = toComponent(
            name,
            v.props,
            nestedPropCode.propsHeader,
            (oneLine ? '' : '      ') + indent
          )
          if (code) {
            propsHeader.push(`${k}={${!oneLine ? '\n' : ''}${code}}`)
          }
        }
      } else {
        propsHeader.push(`${k}={${objectToCode(v)}}`)
      }
    }
  }
  return { components, propsHeader }
}
