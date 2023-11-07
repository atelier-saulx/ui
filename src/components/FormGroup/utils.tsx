import React, { ReactNode } from 'react'
import { FormItemProps } from './types'

export const getValue = (field, values?: { [field: string]: any }): any => {
  const path = field.split('.')
  let v = values
  for (const f of path) {
    if (v === undefined || v === null) {
      return undefined // or emptty string...
    }
    v = v[f]
  }
  return v
}

export const setValue = (
  field,
  values: { [field: string]: any },
  value: any
) => {
  const path = field.split('.')
  let v = values

  for (let i = 0; i < path.length - 1; i++) {
    const f = path[i]
    v = v[f] ?? (v[f] = {})
  }

  v[path[path.length - 1]] = value
  if (Object.keys(values).length > 0 && !Array.isArray(values)) {
    //lets do smth here if
  }
}

export const equalChanges = (
  changes: { [key: string]: any },
  values: { [key: string]: any }
): boolean => {
  for (const key in changes) {
    const c = changes[key]
    const v = values[key]
    const cType = typeof c
    const vType = typeof v
    if (Array.isArray(c) && c.length === 0) {
      return false
    }
    if (cType !== vType) {
      return false
    }
    if (cType === 'object' && c !== null) {
      if (v === null) {
        return false
      }
      if (!equalChanges(c, v)) {
        return false
      }
    } else if (c !== v) {
      return false
    }
  }
  return true
}

export const parseData = (properties) => {
  let parsedData: FormItemProps[]
  if (!Array.isArray(properties)) {
    parsedData = []
    for (const field in properties) {
      const item = properties[field]
      if (item === null) {
        continue
      }
      if (typeof item === 'object' && !React.isValidElement(item)) {
        parsedData.push({ ...item, field })
      } else {
        parsedData.push({
          field,
          label: item,
        })
      }
    }
  } else {
    parsedData = properties
  }
  return parsedData
}
