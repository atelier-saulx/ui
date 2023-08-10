import './dark.css'
import { Border, ColorGroups } from './varsTypes'
import { vars } from './vars'

export const color = <T extends keyof ColorGroups>(
  group: T,
  color: ColorGroups[T],
  saturation?: number // -8 till 8
  // inverse: boolean as an option?
): string => {
  // @ts-ignore
  const c = vars[group][color]
  if (saturation) {
    if (saturation < 0) {
      if (c[2]) {
        for (const [index, name] of c[2]) {
          if (index >= -saturation) {
            console.log(index, saturation)
            return `var(--${name})`
          }
        }
        return `var(--${c[2][c[2].length - 1][1]})`
      }
    } else if (saturation > 0) {
      if (c[2]) {
        for (const [index, name] of c[2]) {
          if (index >= -saturation) {
            return `var(--${name})`
          }
        }
        return `var(--${c[2][c[2].length - 1][1]})`
      }
    }
  }
  return `var(--${c[0] ?? c[1]?.[0] ?? c[2]?.[0] ?? ''})`
}

export const border = (size: number = 1, borderColor: Border = 'default') => {
  return `${size}px solid ${color('border', borderColor)}`
}
