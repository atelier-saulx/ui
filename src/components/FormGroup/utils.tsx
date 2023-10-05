import React, { ReactNode } from 'react'

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
