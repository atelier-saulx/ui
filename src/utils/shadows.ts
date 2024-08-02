import { colors } from './colors.js'

const shadows = Object.freeze({
  popoverSmall: `0px 1px 3px 0px ${colors.black10}, 0px 5px 5px 0px ${colors.black10}, 0px 11px 7px 0px ${colors.black5}`,
})

type Shadow = keyof typeof shadows

export { shadows }
export type { Shadow }
