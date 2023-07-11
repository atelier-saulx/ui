import { useClient } from '@based/react'
import React, { FC, useState, ReactNode } from 'react'
import { useSchema } from '../hooks/useSchema'
import { Checkbox, Text, ScrollArea, useContextState, Page, Column } from '~'
import { Fields } from './Fields'
import { Header } from './Header'
import { Footer } from './Footer'
import { getMeta } from './getMeta'
import { TypeSchema } from '../types'
import { styled } from 'inlines'

export const SchemaMain: FC = () => {
  const [type] = useContextState('type', '')
  const [db] = useContextState('db', 'default')
  const [field] = useContextState<string[]>('field', [])
  const { loading, schema } = useSchema(db)
  const { types } = schema
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const client = useClient()

  console.log(type, field)
  console.log('schema -->', schema)
  console.log('types from schema', types)
  console.log('what the db', db)

  // add root to types

  if (loading) {
    return null
  }

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  const typeDef: TypeSchema =
    type === 'root' ? schema.rootType : types[type] || { meta: {}, fields: {} }
  const { meta = {}, fields } = typeDef
  const { name } = meta

  console.log('type def-->', typeDef)

  if (!fields) {
    console.error('[InvalidSchema] No fields on type', type)
    return null
  }

  const typeName = name || type

  let header: ReactNode
  let footer: ReactNode

  if (field.length) {
    header = (
      <Header back>
        {getMeta(field, typeDef)?.name || field[field.length - 1]}
      </Header>
    )
    footer = <Footer name={typeName} />
  } else {
    header = <Header>{typeName}</Header>
  }

  return (
    <Column style={{ width: '100%', height: '100%' }}>
      <ScrollArea
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          paddingBottom: 64,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {header}
        <styled.div style={{ display: 'flex' }}>
          <styled.div style={{ maxWidth: 660, flexGrow: 1, margin: '0 48px' }}>
            {field.length ? (
              <styled.div
                style={{ marginTop: 36, marginBottom: 24, width: '100%' }}
              />
            ) : (
              <Checkbox
                style={{ marginTop: 36, marginBottom: 24, width: '100%' }}
                label="Show system fields"
                value={includeSystemFields}
                onChange={toggleSystemFields}
              />
            )}
            <div>
              <Fields
                includeSystemFields={includeSystemFields}
                onChange={(val) => {
                  const update = {}
                  let from = fields
                  let dest = update
                  let i = 0
                  const l = field.length
                  while (i < l) {
                    const key = field[i++]
                    dest[key] = { ...from[key] }
                    dest = dest[key]
                    // @ts-ignore
                    from = from[key]
                  }
                  Object.assign(dest, val)

                  if (type === 'root') {
                    console.log('duss......')
                    return client
                      .call('db:set-schema', {
                        db,
                        mutate: true,
                        schema: {
                          rootType: {
                            fields: update,
                          },
                        },
                      })
                      .catch((e) => console.error('error updating schema', e))
                  } else {
                    console.log('duss.afeafewaf.....')
                    return client
                      .call('db:set-schema', {
                        db,
                        mutate: true,
                        schema: {
                          types: {
                            [type]: {
                              fields: update,
                            },
                          },
                        },
                      })
                      .catch((e) => console.error('error updating schema', e))
                  }
                }}
              />
            </div>
          </styled.div>
        </styled.div>
      </ScrollArea>
      {footer}
    </Column>
  )
}
