import {
  ColorBorderColors,
  ColorBorderOptions,
  ColorGroups,
  ColorGroupsOptions,
} from './varsTypes'
import { vars } from './vars'
import { hash } from '@saulx/hash'

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

export const colorHash = <T extends keyof ColorGroups>(
  group: T,
  value: any
): ColorGroups[T] => {
  const hashed = value === undefined ? 0 : hash(value)
  const g: any = vars[group]
  const colors = Object.keys(g)
  const index = Math.floor(Math.abs(Math.sin(hashed)) * (colors.length - 1)) + 1
  // @ts-ignore
  return colors[index]
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

// color...
export const boxShadow = (size: 'small' | 'medium' | 'large') => {
  let shadowSize: string
  let shadowColor: string
  // correct color...
  if (size === 'small') {
    shadowSize = '0px 2px 4px'
    shadowColor = 'rgba(156, 156, 156, 0.08)'
  }
  if (size === 'medium') {
    shadowSize = '0px 1px 4px'
    shadowColor = 'rgba(156, 156, 156, 0.08)'
  }
  if (size === 'large') {
    shadowSize = '0px 12px 24px'
    shadowColor = 'rgba(0, 0, 0, 0.08)'
  }
  return ` ${shadowSize} ${shadowColor}`
}
