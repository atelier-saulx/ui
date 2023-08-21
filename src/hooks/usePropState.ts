import { useState, useEffect } from 'react'

export const usePropState = (prop: any, disable = false) => {
  const s = useState(prop)

  useEffect(() => {
    if (!disable || !s[0]) {
      s[1](prop)
    }
  }, [prop, disable])

  return s
}
