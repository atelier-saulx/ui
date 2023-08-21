import { useContext, useEffect, useRef } from 'react'
import { ToastContext, ToastContextType } from './ToastContext'

export const useToast = ({ attached = false } = {}) => {
  const toast = useContext<ToastContextType>(ToastContext)
  const attachedIds = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (attached) {
      return () => {
        attachedIds.current.forEach((id) => toast.close(id))
      }
    }
  }, [attached])

  if (toast) {
    if (attached) {
      const extendedToast = Object.assign((child) => {
        const id = toast(child)
        attachedIds.current.add(id)

        return id
      }, toast)

      extendedToast.close = (id) => {
        if (id) {
          attachedIds.current.delete(id)
        } else {
          attachedIds.current = new Set()
        }
        return toast.close(id)
      }

      extendedToast.add = extendedToast

      return extendedToast
    }

    return toast
  }

  const noContext = () => {
    console.warn('No ToastContext found')
  }

  noContext.add = noContext as any
  noContext.close = noContext as any
  noContext.useCount = noContext as any

  return noContext
}
