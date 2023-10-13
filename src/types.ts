import { Style } from 'inlines'

export type ClickHandler =
  | ((e: MouseEvent) => void)
  | ((e: MouseEvent) => Promise<void>)

// export type TooltipProps = {
//   label?: string
//   style?: Style
//   position?:
//     | 'bottom-left'
//     | 'bottom'
//     | 'bottom-right'
//     | 'left'
//     | 'right'
//     | 'top-left'
//     | 'top'
//     | 'top-right'
// }
