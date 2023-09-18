import { RefObject, useEffect, useMemo } from 'react'
import { InputKey, Key } from '../../components/KeyboardShortcut'
import { isMac } from '../../utils/isMac'

class TempEvent {
  constructor(target: EventTarget | Element, ev: KeyboardEvent) {
    this.current = target
    this.currentTarget = target
    this.keyboardEvent = ev
  }

  public pageX: number

  public pageY: number

  public which: string

  public current: EventTarget | Element

  public currentTarget: EventTarget | Element

  public keyboardEvent: KeyboardEvent

  preventDefault() {}

  stopPropagation() {}
}

export const useKeyUp = (
  handler: (event: TempEvent) => void,
  keys?: InputKey[],
  ref?: RefObject<Element>
) => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (keys && keys.find((k) => keyMatch(k, e))) {
        e.preventDefault()
        e.stopPropagation()
        const event = new TempEvent(ref ? ref.current : e.target, e)
        handler(event)
      } else if (!keys) {
        const event = new TempEvent(ref ? ref.current : e.target, e)
        handler(event)
      }
    }
    document.addEventListener('keyup', keyHandler)
    return () => {
      document.removeEventListener('keyup', keyHandler)
    }
  }, [handler, ref])
}

const keyMatch = (k: string, e: KeyboardEvent): boolean =>
  k === e.key || k.toLowerCase() === e.key.toLocaleLowerCase()

export const useKeyDown = (
  handler: (event: TempEvent) => void,
  keys?: InputKey[],
  ref?: RefObject<Element>
) => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (keys && keys.find((k) => keyMatch(k, e))) {
        e.preventDefault()
        e.stopPropagation()
        const event = new TempEvent(ref ? ref.current : e.target, e)
        handler(event)
      } else if (!keys) {
        const event = new TempEvent(ref ? ref.current : e.target, e)
        handler(event)
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [handler])
}

type HotKey = {
  key?: InputKey
  meta: {
    ctrlKey: boolean
    shiftKey: boolean
    altKey: boolean
    metaKey: boolean
  }
}

const metaKeysMatch = (event: KeyboardEvent, hotkey: HotKey) => {
  for (const key in hotkey.meta) {
    if (hotkey.meta[key] !== event[key]) {
      return false
    }
  }
  return true
}

export const useKeyboardShortcut = (
  key: Key,
  handler: (event: TempEvent) => void,
  ref?: RefObject<Element>,
  event: 'keyUp' | 'keyDown' = 'keyDown'
) => {
  const hotKey: HotKey = useMemo(() => {
    const keys = key.toLowerCase().split('+')
    const hotKey: HotKey = {
      meta: {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
    }
    // ⌘
    for (const k of keys) {
      if (k === 'cmd') {
        if (isMac()) {
          hotKey.meta.metaKey = true
        } else {
          hotKey.meta.ctrlKey = true
        }
      } else if (k === 'alt') {
        hotKey.meta.altKey = true
      } else if (k === 'shift') {
        hotKey.meta.shiftKey = true
      } else {
        hotKey.key = k as InputKey
      }
    }
    return hotKey
  }, [key])

  if (event === 'keyUp') {
    return useKeyUp(
      (e) => {
        if (
          keyMatch(hotKey.key, e.keyboardEvent) &&
          metaKeysMatch(e.keyboardEvent, hotKey)
        ) {
          e.keyboardEvent.stopPropagation()
          e.keyboardEvent.preventDefault()
          handler(e)
        }
      },
      undefined,
      ref
    )
  } else if (event === 'keyDown') {
    return useKeyDown(
      (e) => {
        if (
          keyMatch(hotKey.key, e.keyboardEvent) &&
          metaKeysMatch(e.keyboardEvent, hotKey)
        ) {
          e.keyboardEvent.stopPropagation()
          e.keyboardEvent.preventDefault()
          handler(e)
        }
      },
      undefined,
      ref
    )
  }
}
