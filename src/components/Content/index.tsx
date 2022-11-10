import React, { CSSProperties, FC } from 'react'
import { ContentMain } from './ContentMain'
import { ContentLeft } from './ContentLeft'
import { useLocation } from '~'
import { ContentModal } from './ContentModal'

export const Content: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const [location] = useLocation()
  const [, type, id, field] = location.substring(prefix.length).split('/')

  console.log('location', location, type, id, field)

  return (
    <div
      style={{
        display: 'flex',
        // height: 'calc(100vh - 120px)',
        ...style,
      }}
    >
      <ContentLeft prefix={prefix} />
      <ContentMain prefix={`${prefix}/${type}`} view={type} />
      <ContentModal prefix={`${prefix}/${type}`} id={id} field={field} />
    </div>
  )
}
