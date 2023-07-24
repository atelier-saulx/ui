import React from 'react'
import { styled } from 'inlines'
import { useSchema } from '../hooks/useSchema'
import { useContextState } from '~/hooks/ContextState'

export const JsonTab = ({ options }) => {
  const [db] = useContextState('db', 'default')

  const { schema } = useSchema(db)

  console.log('--> yo?', options)

  return (
    <styled.div>
      <pre
        style={{
          boxSizing: 'inherit',
          display: 'inherit',
          userSelect: 'text',
          padding: 0,
          margin: 0,
          marginLeft: 8,
          marginTop: 8,
          //   maxWidth: '100%',
          //   width: '100%',
          border: undefined,
          lineHeight: '18px',
          fontSize: 14,
          fontFamily: 'Fira Code',
          wordBreak: 'break-all',
          whiteSpace: 'break-spaces',
          overflowWrap: 'break-word',
          position: 'relative',
        }}
        //   dangerouslySetInnerHTML={{ __html: options }}
      >
        {JSON.stringify(options, null, 2)}
      </pre>
    </styled.div>
  )
}
