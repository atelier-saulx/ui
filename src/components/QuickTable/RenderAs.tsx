import React from 'react'
import { Text } from '../Text'
import { Badge } from '../Badge'
import { prettyDate } from '@based/pretty-date'
import { prettyNumber } from '@based/pretty-number'
import { styled } from 'inlines'
import { Thumbnail } from '../Thumbnail'
import { IconAttachment } from 'src/icons'

export const RenderAs = ({ colName, input }) => {
  let cName = colName.toLowerCase()

  if (cName === 'id') {
    return <Badge light>{input}</Badge>
  } else if (cName === 'createdat' || cName === 'updatedat') {
    return <Text>{prettyDate(input, 'date-time-human')}</Text>
  } else if (cName === 'size') {
    return <Text>{prettyNumber(input, 'number-bytes')}</Text>
  } else if (cName === 'src' || cName === 'thumb') {
    return (
      <Thumbnail src={input} size="small" icon={<IconAttachment />} light />
    )
  }

  return <Text truncate>{input}</Text>
}
