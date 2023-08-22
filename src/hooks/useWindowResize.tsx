import { useState, useEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

export const useWindowResize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState({
    width: isBrowser ? window.innerWidth : 1e3,
    height: isBrowser ? window.innerHeight : 1e3,
  })

  useEffect(() => {
    if (isBrowser) {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return windowSize
}
