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
  option: ColorGroupsOptions[T]
): string => {
  const g = vars[group]
  //   @ts-ignore
  const c = g[color][g._[option]]
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
