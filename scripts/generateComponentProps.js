const fs = require('fs/promises')
const { join, relative } = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const parseTypeName = (typeAnnotation) => {
  const type = typeAnnotation?.type
  if (type === 'TSUnionType') {
    const types = typeAnnotation?.types.map((t) => {
      return parseTypeName(t)
    })
    return types
  } else if (type === 'TSTypeReference') {
    return typeAnnotation.typeName.name
  } else if (type === 'TSNumberKeyword') {
    return 'number'
  } else if (type === 'TSStringKeyword') {
    return 'string'
  } else if (type === 'TSBooleanKeyword') {
    return 'boolean'
  } else;
  if (type === 'TSLiteralType') {
    return { value: typeAnnotation.literal.value }
  } else if (type === 'TSFunctionType') {
    return 'function'
  } else if (type === 'TSNullKeyword') {
    return 'null'
  } else if (type === 'TSUndefinedKeyword') {
    return 'undefined'
  } else if (type === 'TSArrayType') {
    return {
      array: typeAnnotation.elementType
        ? parseTypeName(typeAnnotation.elementType)
        : 'any',
    }
  } else {
    return type
  }
}

const getTypes = async (filePath) => {
  const code = (await fs.readFile(filePath)).toString()
  const ast = babelParser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  })
  const p = []
  try {
    traverse(ast, {
      TSTypeAliasDeclaration: function (path) {
        if (path.node.typeAnnotation) {
          const type = path.node.typeAnnotation
          if (type.types) {
            const props = {
              name: path.node.id.name,
              types: [],
              code: code.slice(path.node.start, path.node.end),
              file: '/' + relative(join(__dirname, '../src'), filePath),
            }
            p.push(props)
            for (const m of type.types) {
              const memberTypeDef = {
                optional: m.optional,
              }
              props.types.push(memberTypeDef)
              if (m) {
                memberTypeDef.type = parseTypeName(m)
              }
            }
          }
        }
      },
    })
  } catch (err) {
    console.error(filePath, err)
  }
  return p
}

const genComponentTypes = async (filePath) => {
  const code = (await fs.readFile(filePath)).toString()

  const ast = babelParser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  })
  const p = []
  const identifiers = {}
  try {
    traverse(ast, {
      Identifier(p) {
        identifiers[p.node.name] = p
      },
      TSTypeAliasDeclaration: function (path) {
        if (path.node.id?.name?.includes('Props') && path.node.typeAnnotation) {
          const type = path.node.typeAnnotation
          if (type.members) {
            const props = {
              name: path.node.id.name,
              props: {},
              code: code.slice(path.node.start, path.node.end),
              file: '/' + relative(join(__dirname, '../src'), filePath),
            }
            p.push(props)
            for (const m of type.members) {
              if (
                m.type === 'TSPropertySignature' &&
                m.key?.type === 'Identifier'
              ) {
                const memberTypeDef = (props.props[m.key.name] = {
                  optional: m.optional,
                })
                if (m.typeAnnotation?.typeAnnotation) {
                  memberTypeDef.type = parseTypeName(
                    m.typeAnnotation.typeAnnotation
                  )
                  // if (
                  //   m.typeAnnotation.typeAnnotation.type === 'TSTypeReference'
                  // ) {
                  //   console.log(
                  //     'HERE',
                  //     m.typeAnnotation.typeAnnotation.typeName.name,
                  //     identifiers[m.typeAnnotation.typeAnnotation.typeName.name]
                  //       ?.scope?.bindings,
                  //     identifiers[m.typeAnnotation.typeAnnotation.typeName.name]
                  //       ?.scope?.references
                  //   )
                  // }
                }
              }
            }
          } else if (type.type === 'TSUnionType') {
            // console.info('?', path.node, type.types)
            const props = {
              name: path.node.id.name,
              props: {},
              code: code.slice(path.node.start, path.node.end),
              file: '/' + relative(join(__dirname, '../src'), filePath),
            }
            p.push(props)
          }
        }
      },
    })
  } catch (err) {
    console.error(filePath, err)
  }
  return p
}

const walk = async (path) => {
  let list
  try {
    list = await fs.readdir(path)
  } catch (err) {}
  if (list) {
    return (
      await Promise.all(
        list.map((f) => {
          if (/\.tsx$/.test(f)) {
            return genComponentTypes(join(path, f))
          } else {
            return walk(join(path, f))
          }
        })
      )
    ).flat()
  }
  return []
}

const init = async () => {
  const components = await walk(join(__dirname, '../src/components'))
  const propObject = {}
  for (const component of components) {
    if (propObject[component.name]) {
      console.error(
        `Duplicate prop objects for ${component.name}`,
        propObject[component.name].file,
        ' ',
        component.file
      )
    } else {
      propObject[component.name] = component
    }
  }

  const types = await getTypes(join(__dirname, '../src/components/types.ts'))

  const typesObject = {}
  for (const type of types) {
    if (typesObject[type.name]) {
      console.error(
        `Duplicate type objects for ${type.name}`,
        typesObject[type.name].file,
        ' ',
        type.file
      )
    } else {
      typesObject[type.name] = type
    }
  }

  await fs.writeFile(
    join(__dirname, '../app/props.json'),
    JSON.stringify({ props: propObject, types: typesObject }, null, 2)
  )
}

init()
