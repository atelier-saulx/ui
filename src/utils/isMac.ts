let memoized: boolean

export const isMac = (): boolean => {
  if (memoized !== undefined) {
    return memoized
  }
  return (memoized =
    typeof window !== 'undefined' &&
    /(macintosh|macintel|macppc|mac68k|macos)/i.test(
      window.navigator.userAgent
    ))
}
