import { useCallback, useEffect, useRef } from 'react'
import { Key } from '../components/KeyHint/index.js'
import { useIsMac } from './useIsMac.js'

function useKeyboardShortcut(shortcut: Key, onTrigger: () => void) {
  const triggerFnRef = useRef(onTrigger)
  const isMac = useIsMac()

  useEffect(() => {
    triggerFnRef.current = onTrigger
  })

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const eventKey = event.key.toLocaleLowerCase()
      const p = shortcut
        .toLocaleLowerCase()
        .split('+')
        .map((e) => (e === 'esc' ? 'escape' : e))
      const modKeys: { [key: string]: boolean } = {
        cmd: isMac ? event.metaKey : event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
      }

      if (
        (p.length === 1 && eventKey === p[0]) ||
        (p.length === 2 && modKeys[p[0]] && eventKey === p[1]) ||
        (p.length === 3 && modKeys[p[0]] && modKeys[p[1]] && eventKey === p[2])
      ) {
        event.preventDefault()
        triggerFnRef.current()
      }
    },
    [shortcut],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export { useKeyboardShortcut }
