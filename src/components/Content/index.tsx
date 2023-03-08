import React, { CSSProperties, FC } from 'react'
import { ContentMain } from './ContentMain'
import { ContentLeft } from './ContentLeft'
import { useRoute } from 'kabouter'
import { ContentModal } from './ContentModal'

export const Content: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const r = useRoute()
  // this can be done a lot better...
  const [, type, id, field] = r.location.substring(prefix.length).split('/')

  console.info('This ID', id, db)

  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
    >
      <ContentLeft prefix={prefix} />
      <ContentMain prefix={`${prefix}/${type}`} view={type} />
      <ContentModal prefix={`${prefix}/${type}`} id={id} field={field} />
    </div>
  )
}
