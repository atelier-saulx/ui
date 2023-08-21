import { deepCopy } from '@saulx/utils'

export const parseProps = (props: {
  [key: string]: any
}): { [key: string]: any } => {
  const result = deepCopy(props)
  for (const a in result) {
    if (typeof result[a] === 'function' && !/^on[A-Z]/.test(a)) {
      result[a] = result[a]()
    } else if (typeof result[a] === 'object' && result[a]) {
      result[a] = parseProps(result[a])
    }
  }
  return result
}
