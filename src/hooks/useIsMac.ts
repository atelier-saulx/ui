import { useMemo } from 'react'

function useIsMac() {
  return useMemo(
    () =>
      /(macintosh|macintel|macppc|mac68k|macos)/i.test(
        window.navigator.userAgent,
      ),
    [],
  )
}

export { useIsMac }
