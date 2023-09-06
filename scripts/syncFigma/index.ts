import fs from 'fs-extra'
import based from '@based/client'
import { join } from 'path'
import camelCase from './camelCase'
const config = require('../../based.json')
const colors = require('./Colors.json')

function toRgb(v: any): string {
  if (v.a === 1) {
    return `rgb(${Math.round(v.r * 255)},${Math.round(v.g * 255)},${Math.round(
      v.b * 255
    )})`
  }
  return `rgba(${Math.round(v.r * 255)},${Math.round(v.g * 255)},${Math.round(
    v.b * 255
  )},${Math.round(v.a * 1000) / 1000})`
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

  await fs.ensureDir(join(__dirname, '../../src/icons'))

  const icons = await client.call('import-figma')

  const m: { [icon: string]: number } = {}

  let myFile = `import React from 'react'
import { color as genColor } from '../'
import { Icon } from './Icon'
`

  for (const icon of icons.size20) {
    if (!m[icon.name]) {
      m[icon.name] = 0
    }
    m[icon.name]++
    if (m[icon.name] > 1) {
      myFile += '\n' + icon.component.replace('Icon', 'Icon' + m[icon.name])
    } else {
      myFile += '\n' + icon.component
    }
  }

  for (const icon of icons.size16) {
    if (m[icon.name] > 1) {
      myFile += '\n' + icon.component.replace('Icon', 'Icon' + m[icon.name])
    } else {
      myFile += '\n' + icon.component
    }
  }

  await fs.writeFile(join(__dirname, '../../src/icons/index.tsx'), myFile)

  client.destroy()
}

const parseVars = async () => {
  const modes = colors.modes

  const variables = colors.variables

  type Values = {
    [key: string]: string
  }

  const groups: {
    [k: string]: {
      [k: string]: {
        colorOptions: Set<string>
        hasSaturation: boolean
        optionsName: string
        keyName: string
        colors: {
          [k: string]: {
            name: string
            variants: {
              // maybe change this a bit as well
              [k: string]: {
                shortName: string
                fromName: string
                description: string
                values: Values
              }
            }
          }
        }
      }
    }
  } = {}

  let nameCnt = 0

  const reverseNameMap: { [key: string]: string } = {}

  for (const id of colors.variableIds) {
    reverseNameMap[id] = convertNumberToLetters(++nameCnt)
  }

  for (const vars of variables) {
    const path: string[] = vars.name.split('/')
    const hasSubGroup = path.length === 4

    const group = camelCase(path[0], {})
    const subGroup = hasSubGroup ? camelCase(path[1], {}) : '*'
    const name = hasSubGroup ? path[2] : path[1]
    const color = camelCase(name, {})

    if (!groups[group]) {
      groups[group] = {}
    }
    const g = groups[group]

    if (!g[subGroup]) {
      g[subGroup] = {
        keyName:
          subGroup === '*'
            ? camelCase(group, {})
            : camelCase(
                group + subGroup[0].toUpperCase() + subGroup.slice(1),
                {}
              ),
        optionsName:
          'Color' +
          (subGroup === '*'
            ? camelCase(group, {
                pascalCase: true,
              })
            : camelCase(group + subGroup[0].toUpperCase() + subGroup.slice(1), {
                pascalCase: true,
              })),
        hasSaturation: false,
        colorOptions: new Set(),
        colors: {},
      }
    }

    const s = g[subGroup]

    if (!s.colors[color]) {
      s.colors[color] = {
        name,
        variants: {},
      }
    }

    const c = s.colors[color]

    const shortName = reverseNameMap[vars.id]

    const values: Values = {}

    for (const mode in vars.valuesByMode) {
      const modeName = modes[mode]
      const v = vars.valuesByMode[mode]
      values[modeName] = v.id ? `var(--${reverseNameMap[v.id]})` : toRgb(v)
    }

    if (!vars.valuesByMode) {
      throw new Error('no values by mode...')
    }

    var variant = path[hasSubGroup ? 3 : 2]

    if (variant === undefined) {
      variant = 'Default'
    }

    if (/-[+\-]\d\d?$/.test(variant)) {
      const digit = variant.split(/-[+\-]/)[1]
      variant = variant.slice(-(digit.length + 1))
      if (variant[0] === '+') {
        variant = variant.split('+')[1]
      }
    } else if (/-0$/.test(variant)) {
      variant = '0'
    } else {
      variant = camelCase(variant, {})
    }

    if (c.variants[variant]) {
      throw new Error('Double var definition ' + name + ' ' + variant)
    }

    s.colorOptions.add(variant)

    if (variant === '0') {
      s.hasSaturation = true
    }

    c.variants[variant] = {
      fromName: vars.name,
      description: vars.description,
      shortName,
      values,
    }
  }

  const modeFiles: { [mode: string]: string } = {}

  for (const mode in modes) {
    modeFiles[modes[mode]] = ``
  }

  const vars: any = {}

  let types = ``

  const colorGroups: any = {}
  const colorGroupsOptions: any = {}

  for (const group in groups) {
    const g = groups[group]

    for (const subGroup in g) {
      const sg = g[subGroup]

      const s: any = (vars[sg.keyName] = {})

      const arr = Array.from(sg.colorOptions)

      types += `\nexport type ${sg.optionsName + 'Options'} = ${
        sg.hasSaturation ? 'number' : arr.map((a) => `'${a}'`).join('|')
      }`

      colorGroups[sg.keyName] = sg.optionsName + 'Colors'
      colorGroupsOptions[sg.keyName] = sg.optionsName + 'Options'

      types += `\nexport type ${sg.optionsName + 'Colors'} = ${Object.keys(
        sg.colors
      )
        .map((a) => `'${a}'`)
        .join('|')}`

      for (const color in sg.colors) {
        for (const variant in sg.colors[color].variants) {
          for (const mode in sg.colors[color].variants[variant].values) {
            modeFiles[
              mode
            ] += `--${sg.colors[color].variants[variant].shortName}:${sg.colors[color].variants[variant].values[mode]};\n`
          }
        }
      }

      if (sg.hasSaturation) {
        s._i = 1
        for (const color in sg.colors) {
          s[color] = [, [], []]
          for (const variant in sg.colors[color].variants) {
            if (variant === '0') {
              s[color][0] = sg.colors[color].variants[variant].shortName
            } else {
              if (Number(variant) < 0) {
                s[color][1].push(Number(variant))
              } else {
                s[color][2].push(Number(variant))
              }
            }
          }
          s[color][1].sort((a, b) => (a > b ? -1 : a === b ? 0 : 1))
          s[color][2].sort((a, b) => (a < b ? -1 : a === b ? 0 : 1))
          for (let i = 0; i < s[color][1].length; i++) {
            s[color][1][i] =
              sg.colors[color].variants[s[color][1][i]]?.shortName
          }
          for (let i = 0; i < s[color][2].length; i++) {
            s[color][2][i] =
              sg.colors[color].variants[s[color][2][i]]?.shortName
          }
        }
      } else {
        s._ = {}
        for (let i = 0; i < arr.length; i++) {
          s._[arr[i]] = i
        }
        for (const color in sg.colors) {
          s[color] = Array.from({ length: arr.length })
          for (const variant in sg.colors[color].variants) {
            s[color][s._[variant]] =
              sg.colors[color].variants[variant].shortName
          }
          s[color] = s[color].map((v) => (!v ? 0 : v))
        }
      }
    }
  }

  types +=
    '\nexport type ColorGroups = ' +
    JSON.stringify(colorGroups, null, 2).replace(/"/g, '')

  types +=
    '\nexport type ColorGroupsOptions = ' +
    JSON.stringify(colorGroupsOptions, null, 2).replace(/"/g, '')

  const [defaultMode, ...otherModes] = Object.keys(modeFiles)

  let colorsCSSFile = `:root {\n`
  colorsCSSFile += modeFiles[defaultMode]
  colorsCSSFile += `}\n`

  for (const otherMode of otherModes) {
    colorsCSSFile += `\n[data-theme="${camelCase(otherMode, {})}"] {\n`
    colorsCSSFile += modeFiles[otherMode]
    colorsCSSFile += `}`
  }

  await fs.writeFile(join(__dirname, `../../src/colors.css`), colorsCSSFile)

  await fs.writeFile(
    join(__dirname, '../../src/vars.ts'),
    `export const vars = ${JSON.stringify(vars)}`
  )
  await fs.writeFile(join(__dirname, '../../src/varsTypes.ts'), types)
}

parseVars()
start()
