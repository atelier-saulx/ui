import React, { CSSProperties, FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { useRoute } from 'kabouter'
import { useSchemaTypes } from '~/hooks'

export const Schema: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const { location } = useRoute()
  const [, type, ...p] = location.substring(prefix.length).split('/')
  const { types, loading } = useSchemaTypes()
  const path = []

  if (p.length) {
    if (loading) {
      return null
    }
    const { fields } = types[type]
    p.reduce((fields, key) => {
      path.push(key)
      const { items, values, properties } = fields[key]
      if (properties) {
        path.push('properties')
        return properties
      }
      if (items?.properties) {
        path.push('items', 'properties')
        return items.properties
      }
      if (values?.properties) {
        path.push('values', 'properties')

        return values.properties
      }
      console.error('something is wrong here...', p)
      return fields[key]
    }, fields)
  }

  return (
    <div style={{ display: 'flex', ...style }}>
      <SchemaLeft prefix={prefix} />
      <SchemaMain db={db} type={type} path={path} prefix={prefix} />
    </div>
  )
}
