import { deepCopy } from '@saulx/utils'
import * as ui from '../src'
import React from 'react'

export const parseProps = (props: {
  [key: string]: any
}): { [key: string]: any } => {
  const result = deepCopy(props)
  for (const a in result) {
    if (typeof result[a] === 'string' && result[a].startsWith('__ISFN:')) {
      const x = new Function('ui', 'React', result[a].replace('__ISFN:', ''))
      result[a] = x(ui, React)
    } else if (typeof result[a] === 'function' && !/^on[A-Z]/.test(a)) {
      result[a] = result[a]()
    } else if (typeof result[a] === 'object' && result[a]) {
      result[a] = parseProps(result[a])
    }
  }
  return result
}
