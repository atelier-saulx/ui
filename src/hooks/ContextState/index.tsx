import { hash, hashObjectIgnoreKeyOrder } from '@saulx/hash'
import React, {
  createContext,
  useContext,
  useEffect,
  FC,
  ReactNode,
  useMemo,
  useState,
} from 'react'

type CtxVal = {
  notDefault?: boolean
  map: Map<
    string,
    { version: number; value?: any; listeners: Set<(val: any) => void> }
  >
  onChange?: (key: string, t: any) => void
}

export const StateContext = createContext<CtxVal>({ map: new Map() })

export const StateProvider: FC<{
  children: ReactNode
  onChange?: (key: string, t: any) => void
  values?: { [key: string]: any }
}> = ({ children, values, onChange }) => {
  const ctxValue = useMemo(() => {
    const ctxVal: CtxVal = {
      map: new Map(),
      notDefault: true,
      onChange,
    }
    return ctxVal
  }, [])

  useEffect(() => {
    for (const key in values) {
      let v = ctxValue.map.get(key)
      if (!v) {
        v = {
          version: 0,
          listeners: new Set(),
        }
        ctxValue.map.set(key, v)
      }
      v.value = values[key]
      const n = hash(v.value ?? 0)
      if (n !== v.version) {
        v.version = n
        v.listeners.forEach((u) => u(n))
      }
    }
  }, [ctxValue, values ? hashObjectIgnoreKeyOrder(values) : 0])

  ctxValue.onChange = onChange

  return (
    <StateContext.Provider value={ctxValue}>{children}</StateContext.Provider>
  )
}

export const useContextState = <T extends unknown>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] => {
  const values = useContext(StateContext)

  if (!values.map.has(key)) {
    values.map.set(key, {
      version: 0,
      listeners: new Set(),
    })
  }

  const v = values.map.get(key)

  const [, update] = useState<number>(v.version)

  useEffect(() => {
    v.listeners.add(update)
    return () => {
      v.listeners.delete(update)
    }
  }, [])

  return [
    v.value ?? initialValue,
    (value: T) => {
      v.value = value
      const n = hash(v.value ?? 0)
      if (n !== v.version) {
        v.listeners.forEach((u) => u(n))
        if (values.onChange) {
          values.onChange(key, value)
        }
      }
    },
  ]
}
