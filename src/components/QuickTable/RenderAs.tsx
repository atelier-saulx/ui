import React from 'react'
import { Text } from '../Text'
import { Badge } from '../Badge'

export const RenderAs = ({ colName, input }) => {
  let cName = colName.toLowerCase()

  if (cName === 'id') {
    return <Badge light>{input}</Badge>
  }

  return <Text>{input}</Text>
}
