import React, { FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { Style } from 'inlines'
import { StateProvider, Row } from '~'

export * from './hooks/useSchema'
export * from './templates'

export const Schema: FC<{
  style?: Style
  values?: { field: string[]; type: string; db: string }
  onChange?: (key: string, val: any) => void
}> = ({ style, values, onChange }) => {
  return (
    <Row
      style={{
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'hidden',
        ...style,
      }}
    >
      <StateProvider values={values} onChange={onChange}>
        <SchemaLeft />
        <SchemaMain />
      </StateProvider>
    </Row>
  )
}
