import { useState } from 'react'

export const useUpdate = (callback?: () => void) => {
  const [, setCount] = useState(0)
  return () => {
    setCount((count) => count + 1)
    callback?.()
  }
}
