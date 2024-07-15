import { createContext, useContext, useEffect, useState } from 'react'

const KeyboardEventContext = createContext(true)

type KeyboardEventProviderProps = {
  children: React.ReactNode
}

function KeyboardEventProvider({ children }: KeyboardEventProviderProps) {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(false)

  useEffect(() => {
    function onPointerDown() {
      setHadKeyboardEvent(false)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return
      }

      setHadKeyboardEvent(true)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [])

  return (
    <KeyboardEventContext.Provider value={hadKeyboardEvent}>
      {children}
    </KeyboardEventContext.Provider>
  )
}

function useHadKeyboardEvent() {
  return useContext(KeyboardEventContext)
}

export { KeyboardEventProvider, useHadKeyboardEvent }
