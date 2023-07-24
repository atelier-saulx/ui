import { text } from './text'
import { numbers } from './number'
import { complexDataStructures } from './complexDataStructures'
import { Field } from '../types'
import { plainFormattedData } from './plainFormattedData'
import { richFormattedData } from './richFormattedData'
import { referencesFiles } from './referencesFiles'
import { system } from './system'
export * from '../types'

export const groups = {
  'Text and String': text,
  'Plain Formatted Data': plainFormattedData,
  Numbers: numbers,
  'Complex Data Structures': complexDataStructures,
  'Rich Formatted Data': richFormattedData,
  'References and Files': referencesFiles,
  System: system,
}

export const templates: {
  [key: string]: Field
} = {}

for (const group in groups) {
  for (const template in groups[group]) {
    templates[template] = groups[group][template]
  }
}

export const systemFields = new Set([
  'id',
  'type',
  'children',
  'parents',
  'createdAt',
  'updatedAt',
])

export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])
