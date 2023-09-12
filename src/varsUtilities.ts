import {
  ColorBorderColors,
  ColorBorderOptions,
  ColorGroups,
  ColorGroupsOptions,
} from './varsTypes'
import { vars } from './vars'

export const color = <T extends keyof ColorGroups>(
  group: T,
  color: ColorGroups[T],
  option?: ColorGroupsOptions[T]
): string => {
  const g = vars[group]
  if (typeof option === 'number') {
    if (option === 0) {
      //  @ts-ignore
      return `var(--${g[color][0]})`
    }
    if (option > 0) {
      return `var(--${
        //  @ts-ignore
        g[color][1][option] ?? g[color][1][g[color][1].length - 1]
      })`
    } else if (option < 0) {
      const x = Math.abs(option)
      //  @ts-ignore
      return `var(--${g[color][2][x] ?? g[color][2][g[color][2].length - 1]})`
    }
    return ``
  }
  const c = !option
    ? //   @ts-ignore
      g._ === undefined
      ? //   @ts-ignore
        g[color][0]
      : //   @ts-ignore
        g[color][g._.default ?? g._.normal ?? g._.primary ?? g._.strong]
    : //   @ts-ignore
      g[color][g._[option]]
  // console.info(c)
  return `var(--${c})`
}

export const border = (
  size: number = 1,
  borderColor: ColorBorderColors = 'default',
  variant: ColorBorderOptions = 'strong'
) => {
  return `${size}px solid ${color('border', borderColor, variant)}`
}
