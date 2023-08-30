export const isTouchDevice = (): boolean => {
  return (
    typeof 'window' !== undefined ||
    //  (typeof 'window' !== undefined && 'ontouchstart' in window) ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  )
}
