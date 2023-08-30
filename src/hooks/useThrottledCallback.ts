import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'

const isEventCheck = (e) => {
  return !!e
  // return (
  //   (e &&
  //     (e.constructor.name === 'SyntheticBaseEvent' ||
  //       e.constructor.name === 'SyntheticEvent')) ||
  //   e instanceof Event
  // )
}

export default (
  fn: Function,
  refs: any[] = [],
  frames: number = 1
): Function => {
  const ref = useRef(null)
  useEffect(
    frames > 1
      ? () => () => {
          if (ref.current) {
            global.cancelAnimationFrame(ref.current.timer)
            ref.current = false
          }
        }
      : () => () => {
          if (ref.current) {
            global.cancelAnimationFrame(ref.current)
            ref.current = false
          }
        }
  )

  const throttledFn = useCallback(
    frames > 1
      ? (e, data, t) => {
          let isEvent = false
          if (isEventCheck(e)) {
            if (!t) t = e.currentTarget
            if (e.persists) {
              e.persist()
            }
            isEvent = true
          }
          if (!ref.current) {
            const throttle = () => {
              ref.current.frames--
              if (ref.current.frames === 0) {
                if (isEvent) {
                  e.currentTarget = t
                }
                ref.current = false
                fn(e, data)
              } else {
                ref.current.timer = global.requestAnimationFrame(throttle)
              }
            }
            ref.current = {
              timer: global.requestAnimationFrame(throttle),
              frames,
            }
          }
        }
      : (e, data) => {
          let isEvent = false
          let t

          if (isEventCheck(e)) {
            isEvent = true
            t = e.currentTarget
            if (e.persists) {
              e.persist()
            }
          }
          if (!ref.current) {
            ref.current = global.requestAnimationFrame(() => {
              ref.current = false
              if (isEvent) {
                e.currentTarget = t
              }
              fn(e, data)
            })
          }
        },
    refs
  )

  return throttledFn
}
