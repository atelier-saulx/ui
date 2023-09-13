import {
  ColorBorderColors,
  ColorBorderOptions,
  ColorGroups,
  ColorGroupsOptions,
} from './varsTypes'
import { vars } from './vars'

const selectVar = <T extends keyof ColorGroups>(
  group: T,
  color: ColorGroups[T],
  option?: ColorGroupsOptions[T]
): string | void => {
  const g: any = vars[group]

  if (!g) {
    return
  }

  if (!(color in g)) {
    return
  }

  const c: any = g[color]

  if (!option) {
    return g._ === undefined
      ? c[0]
      : c[g._.default ?? g._.normal ?? g._.primary ?? g._.strong]
  }

  if (typeof option === 'number') {
    if (option === 0) {
      return c[0]
    }

    if (option > 0) {
      return c[1][option] ?? c[1][c[1].length - 1]
    } else if (option < 0) {
      const select = Math.abs(option)
      return c[2][select] ?? c[c[2].length - 1]
    }
    return
  }

  return c[g._[option]]
}

export const color = <T extends keyof ColorGroups>(
  group: T,
  color: ColorGroups[T],
  option?: ColorGroupsOptions[T]
): string => {
  const colorVar = selectVar(group, color, option)
  if (colorVar) {
    return `var(--${colorVar})`
  }
  return ``
}

export const border = (
  size: number = 1,
  borderColor: ColorBorderColors = 'default',
  variant: ColorBorderOptions = 'strong'
) => {
  return `${size}px solid ${color('border', borderColor, variant)}`
}
