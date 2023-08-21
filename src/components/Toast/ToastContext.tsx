import { createContext, ReactNode } from 'react'

type add = (children: ReactNode) => number

export type ToastContextType = add & {
  add: add
  close: (id?: number) => void
  useCount: () => number
}

export const ToastContext = createContext(undefined)
