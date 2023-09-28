import { useState, useRef, useMemo, useCallback } from 'react'
import { hash } from '@saulx/hash'
import { deepMerge } from '@saulx/utils'

type KeyValue = { [key: string]: any }

export const useObjectState = (
  initialObject?: KeyValue
): [KeyValue, (prev?: KeyValue) => void] => {
  const ref = useRef(initialObject ?? {})
  const [, setHash] = useState(
    initialObject ? useMemo(() => hash(initialObject), []) : null
  )
  const update = useCallback((value: KeyValue) => {
    deepMerge(ref.current, value)
    setHash(hash(ref.current))
  }, [])
  return [ref.current, update]
}
