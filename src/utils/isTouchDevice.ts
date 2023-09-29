export const isTouchDevice = (): boolean => {
  return (
    typeof 'window' !== undefined &&
    (navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0)
  )
}
