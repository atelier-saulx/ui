import React from 'react'
import { styled } from 'inlines'
import { Input } from '~'

export const JsonTab = ({ options }) => {
  console.log('--> yo --> options?', options)

  return (
    <styled.div>
      <Input
        type="json"
        value={JSON.stringify(options, null, 2)}
        onChange={(e) => {
          const eParsed = JSON.parse(e)
          Object.assign(options, eParsed)
        }}
      />
    </styled.div>
  )
}
