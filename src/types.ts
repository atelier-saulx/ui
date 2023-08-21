import { ReactNode, FC } from 'react'
import {
  ColorActionColors,
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
} from './varsTypes'
import { Style } from 'inlines'

export type ClickHandler =
  | ((e: MouseEvent) => void)
  | ((e: MouseEvent) => Promise<void>)

export type ActionItemProps = {}

export type AlertBannerProps = {
  color?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  icon?: ReactNode
  label?: string
  onClick?: () => void
  style?: Style
}

export type AvatarProps = {
  color?: ColorNonSemanticBackgroundColors
  imgsrc?: string
  onClick?: () => void
  label?: string
  size?: 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  style?: Style
  subtle?: boolean
}

export type BadgeProps = {
  afterIcon?: ReactNode
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  icon?: ReactNode
  label?: string
  onClick?: (e: MouseEvent) => void | (() => void)
  style?: Style
  subtle?: boolean
}

export type BreadcrumbsProps = {}

export type ButtonProps = {
  afterIcon?: ReactNode
  children?: ReactNode
  color?: ColorActionColors
  disabled?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  icon?: ReactNode
  label?: string
  loading?: boolean
  onClick?: (e: MouseEvent) => void
  size?: 'large' | 'medium' | 'small'
  style?: Style
  subtle?: boolean
}

export type CheckboxProps = {
  active?: boolean
  indeterminate?: boolean
  onClick?: (e) => void | (() => void)
  style?: Style
  warning?: boolean
  disabled?: boolean
}

// this is combination of text and checkbox
export type CheckboxItemProps = {
  label?: string
  style?: Style
} & CheckboxProps

export type ClickableIconProps = {
  icon?: ReactNode
  onClick?: () => void | ((e) => void)
  size?: 'large' | 'small'
  style?: Style
}

export type CounterProps = {
  color?: Exclude<
    ColorBackgroundColors | ColorNonSemanticBackgroundColors,
    'default'
  >
  label?: number
  onClick?: () => void
  style?: Style
  subtle?: boolean
}

export type DatePickerProps = {
  // what to do for ranged
  onChange?: (value: number) => void
  style?: Style
  value?: number
}
export type DateRangeProps = {
  // what to do for ranged
  onChange?: (value: number[]) => void
  style?: Style
  value?: number[]
}

export type DefaultItemProps = {
  description?: string // caption
  disabled?: boolean
  expand: boolean
  icon?: ReactNode
  label?: string
}

export type DividerProps = {
  style?: Style
}

export type DropdownProps = {}

export type FilterPillProps = {}

// text field in figma
export type InputProps = {
  description?: string
  disabled?: boolean
  onChange?: (value: any) => void
  errorMessage?: string
  label?: string
  pattern?: string
  placeholder?: string
  style?: Style
  type: 'text' | 'number' | 'date' | 'json' | 'multiline' | 'markdown'
  value?: any
}

export type InputWarningProps = {
  active?: boolean
  icon?: ReactNode
  label?: string
}

export type ListItemProps = {
  icon?: ReactNode
  label?: string
  onClick?: () => void
  // value ??
}

export type ListProps = {
  items?: ListItemProps[]
  style?: Style
}

export type MenuItemProps = {
  active?: boolean
  icon?: ReactNode
  label?: string
  onClick?: (e) => void
  // or path maybe??
  value?: string
  style?: Style
  children?: ReactNode | FC
}

export type MenuProps = {
  items?: MenuItemProps[]
  style?: Style
}

export type ModalProps = {
  children: ReactNode
  description?: string
  label?: string
}

export type ModalBottomBarProps = {
  // primary action
  // secondary action
  // steps
}

export type ModalContentProps = {}

export type ModalWarningProps = {
  color?: Exclude<
    ColorBackgroundColors,
    'default' | 'inverted' | 'neutral' | 'informative' | 'positive' | 'brand'
  >
  label?: string
}

export type MultiSelectProps = {}

export type OtherItemsProps = {}

export type ProgressCircleProps = {
  color?: ColorActionColors
  style?: Style
  // value is progress in decimal 1 === complete
  value?: number
}

export type RadioButtonProps = {
  active?: boolean
  onClick?: () => void
  style?: Style
  warning?: boolean
  disabled?: boolean
  value: {
    label?: string
    value: string | boolean | number
    description?: string
  }
}

export type RadioButtonItemProps = {
  disabled?: boolean
  label?: string
} & RadioButtonProps

export type ScrollAreaProps = {}

type SelectOption = {
  value: string | number | undefined
  label?: string
  icon?: ReactNode
}

export type SelectProps = {
  disabled?: boolean
  onChange?: (value: SelectOption) => void
  items?: SelectOption[]
  placeholder?: string | SelectOption
  value?: SelectOption
}

export type SelectableItemProps = {}

type SegmentedControlOption = {
  label?: string
  active?: boolean
}

export type SegmentedControlOptionsProps = {
  onChange?: (value: SegmentedControlOption) => void
  items?: SegmentedControlOption[]
  value?: SegmentedControlOption
}

export type SidebarNavigationHolderProps = {}

export type SliderProps = {
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  value?: number
}

export type SpotlightSearchProps = {
  onChange?: (value: string) => void
}

export type StatusProps = {
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  ghost?: boolean
  label?: string
  onClick?: () => void
  style?: Style
  subtle?: boolean
}

export type TabProps = {
  active?: boolean
  label?: string
  onClick?: () => void
}

export type TagProps = {
  disabled?: boolean
  label?: string
  onClick?: () => void
  style?: Style
}

export type TextProps = {
  // check children as string??
  children: ReactNode
  color?: ColorContentColors
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48
  style?: Style
  weight?: 'strong' | 'medium' | 'normal'
}

export type ToggleProps = {
  active?: boolean
  disabled?: boolean
  onClick?: (e) => void | (() => void)
  style?: Style
  size?: 'large' | 'medium'
}

export type TooltipProps = {
  label?: string
  style?: Style
  position?:
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top'
    | 'top-right'
}

export type TopNavigationProps = {}
