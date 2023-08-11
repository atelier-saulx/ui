import fs from 'fs-extra'
import based from '@based/client'
import { join } from 'path'
import camelCase from './camelCase'
const config = require('../based.json')

// AVE advanced variable exporter

function removeRepeatingNamesPerString(inputString: string): string {
  const namesArray = inputString.split('-')
  const uniqueNamesArray: string[] = []
  const seenNames: Set<string> = new Set()

  for (const name of namesArray) {
    if (!seenNames.has(name)) {
      uniqueNamesArray.push(name)
      seenNames.add(name)
    }
  }

  const uniqueString = uniqueNamesArray.join('-')
  return uniqueString
}

function convertNumberToLetters(number: number): string {
  if (isNaN(number) || number < 0 || number >= 676) {
    throw new Error('Invalid input. Number should be between 0 and 675.')
  }

  const firstLetterCharCode = 97 // ASCII code for 'a'
  const secondLetterCharCode = 97 // ASCII code for 'a'

  const firstLetterIndex = Math.floor(number / 26)
  const secondLetterIndex = number % 26

  const firstLetter = String.fromCharCode(
    firstLetterCharCode + firstLetterIndex
  )
  const secondLetter = String.fromCharCode(
    secondLetterCharCode + secondLetterIndex
  )

  return firstLetter + secondLetter
}

const start = async () => {
  const client = based(config)

  await fs.ensureDir(join(__dirname, '../src/icons'))

  const icons = await client.call('import-figma')

  let myFile = `import React from 'react'
import { color as genColor } from '../index.ts'
import { Icon } from './type'
`

  for (const icon of icons.size20) {
    myFile += '\n' + icon.component
  }

  //   for (const icon of icons.size16) {
  //     myFile += '\n' + icon.component
  //   }

  await fs.writeFile(join(__dirname, '../src/icons/index.tsx'), myFile)

  client.destroy()
}

start()

const parseVars = async () => {
  const vars = await fs.readFile(join(__dirname, './vars.css'), 'utf-8')

  const v = vars
    .replace(/ ?- ?- ?(\d)/g, '-min-$1')
    .replace(/ ?- ?\+ ?(\d)/g, '-plus-$1')

  const set: Set<string> = new Set()
  const defs = v.match(/(--.+):[^;]+;/g)

  let cnt = 0
  if (defs) {
    for (const d of defs) {
      if (set.has(d)) {
        cnt++
      }
      set.add(d)
    }
  }

  // light and dark...
  console.log('removed', cnt, 'duplicates')

  let light = ':root {'
  let dark = ':root {'

  const groups: {
    [k: string]: {
      [k: string]: { original: string[]; shortName: string; name: string }
    }
  } = {}

  let nameCnt = 0
  const reverseNameMap: { [key: string]: string } = {}

  set.forEach((v) => {
    v = v.replace(/-0/g, '')
    // css += v
    const x = v.match(/--(.+):/)
    if (x) {
      const name = x[1]
      let group = name.split('-')[0]
      if (group === 'non') {
        group = 'non-semantic'
      }
      if (!groups[group]) {
        groups[group] = {}
      }
      if (!groups[group][name]) {
        const shortName = '--' + convertNumberToLetters(++cnt)
        groups[group][name] = {
          original: [],
          shortName,
          name,
        }
        reverseNameMap['--' + name] = shortName
      }
      groups[group][name].original.push(v)
    }
  })

  console.dir(groups, { depth: 10 })
  console.log(reverseNameMap)

  const replaceNames = (str: string): string => {
    let [name, vars] = str.split(':')
    vars = vars.replace(/\n/g, '')
    const varDef = vars.match(/var\(\s{0,10}(.*?)\s{0,10}\)/)
    let varName = varDef?.[1] ?? ''
    let cnt = varName.startsWith('--') ? 0 : 1
    for (const key in reverseNameMap) {
      if (name === key) {
        name = reverseNameMap[key]
        cnt++
      }
      if (varName === key) {
        varName = reverseNameMap[key]
        cnt++
      }
      if (cnt === 2) {
        break
      }
    }
    return `${name}:${varName ? `var(${varName});` : vars}`
  }

  for (const group in groups) {
    const g = groups[group]
    for (const k in g) {
      const parsed = g[k].original.map(replaceNames)
      dark += parsed[0]
      light += parsed[1] ?? parsed[0]
    }
  }

  // groups will be parsed more and then fn generated for it

  // sementic
  // global

  const varsData: {
    [group: string]: {
      [color: string]: any[]
      /*{
        negative: { name: string; index: number }[]
        positive: { name: string; index: number }[]
        color: string
      }*/
    }
  } = {}

  const types: {
    [group: string]: string[]
  } = {}

  for (const g in groups) {
    const group = camelCase(g, {})
    if (!varsData[group]) {
      varsData[group] = {}
    }
    if (!types[group]) {
      types[group] = []
    }
    for (const color in groups[g]) {
      const baseColor = color.replace(/-min-\d/, '').replace(/-plus-\d/, '')
      const extension = color.replace(baseColor, '')

      const key = camelCase(
        removeRepeatingNamesPerString(
          baseColor.replace(group + '-', '').replace('non-semantic', '')
        ).replace('-normal', ''),
        {}
      )

      if (!varsData[group][key]) {
        types[group].push(key)
        varsData[group][key] = [
          (reverseNameMap[baseColor] || '').replace('--', ''),
        ]
      }
      const t = varsData[group][key]
      if (extension.includes('plus-')) {
        if (!t[1]) {
          t[1] = []
        }
        t[1].push([
          Number(extension[extension.length - 1]),
          groups[g][color].shortName.replace('--', ''),
        ])
      } else if (extension.includes('min-')) {
        if (!t[2]) {
          t[2] = []
        }
        t[2].push([
          Number(extension[extension.length - 1]),
          groups[g][color].shortName.replace('--', ''),
        ])
      } else {
        t[0] = groups[g][color].shortName.replace('--', '')
      }
    }
  }

  for (const g in varsData) {
    for (const k in varsData[g]) {
      const t = varsData[g][k]
      if (t[1]) {
        t[1].sort((a, b) => {
          return a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1
        })
      }
      if (t[2]) {
        t[2].sort((a, b) => {
          return a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1
        })
      }
    }
  }

  light += '}'
  dark += '}'

  const color = `export const vars = ${JSON.stringify(varsData)}`

  let ts = ``

  let tsgroups = `\nexport type ColorGroups = {`
  for (const group in types) {
    const g = camelCase(group, { pascalCase: true })
    ts += `\nexport type ${g} = ${types[group]
      .map((v) => {
        return `"${v}"`
      })
      .join(' | ')}`

    tsgroups += `\n  ${group}: ${g},`
  }
  tsgroups += '}'
  ts += tsgroups

  await fs.writeFile(join(__dirname, '../src/light.css'), light)
  await fs.writeFile(join(__dirname, '../src/dark.css'), dark)
  await fs.writeFile(join(__dirname, '../src/vars.ts'), color)
  await fs.writeFile(join(__dirname, '../src/varsTypes.ts'), ts)
}

parseVars()
