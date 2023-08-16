// types for all components let's go
import { ReactNode } from 'react'
import {
  ColorActionColors,
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
} from '../varsTypes'
import { Style } from 'inlines'
import * as icons from '../icons'

// icons.
// TODO make props of icons
let newListIconsArr: keyof typeof icons
type ListOfAllIcons = typeof icons //typeof newListIconsArr

// notes : beforeIcon =                     icon
//         muted, emphasis = low etc. are   subtle
//         state , intent etc. =            color
//        checked, marked ,  -->            active

export type ActionItemProps = {}

export type AlertBannerProps = {
  color?: Exclude<ColorBackgroundColors, 'default' | 'inverted' | 'neutral'>
  icon?: ListOfAllIcons
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
  afterIcon?: ListOfAllIcons
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
  icon?: ListOfAllIcons
  label?: string
  onClick?: (e: any) => void | (() => void)
  style?: Style
  subtle?: boolean
}

export type BreadcrumbsProps = {}

export type ButtonProps = {
  afterIcon?: ListOfAllIcons
  color?: ColorActionColors
  disabled?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  icon?: ListOfAllIcons
  label?: string
  loading?: boolean
  onClick?: () => void
  size?: 'large' | 'medium' | 'small'
  style?: Style
  subtle?: boolean
}

export type CheckboxProps = {
  active?: boolean
  indeterminate?: boolean
  onClick?: () => void
}

// this is combination of text and checkbox
export type CheckboxItemProps = {
  disabled?: boolean
  label?: string
  style?: Style
} & CheckboxProps

export type ClickableIconProps = {
  icon?: ListOfAllIcons
  onClick?: () => void
  size?: 'large' | 'small'
  style?: Style
}

export type CounterProps = {
  color?: ColorBackgroundColors | ColorNonSemanticBackgroundColors
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

export type DefaultItemProps = {
  description?: string // caption
  disabled?: boolean
  expand: boolean
  icon?: ListOfAllIcons
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
  onChange?: (value: any) => void
  label?: string
  placeholder?: string
  style?: Style
  type?: 'text' | 'number' | 'date' | 'json' | 'multiline' | 'markdown'
  value?: any
}

export type InputWarningProps = {
  active?: boolean
  icon?: ListOfAllIcons
  label?: string
}

export type ListItemProps = {
  icon?: ListOfAllIcons
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
  icon?: ListOfAllIcons
  label?: string
  onClick?: () => void
  // or path maybe??
  value?: string
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

export type ProgressCircle = {
  color?: ColorActionColors
  style?: Style
  value?: number
}

export type RadioButtonProps = {
  active?: boolean
  onClick?: () => void
  style?: Style
}

export type RadioButtonItemProps = {
  disabled?: boolean
  label?: string
} & RadioButtonProps

export type ScrollAreaProps = {}

type SelectOption = {
  value: string | number | undefined
  label?: string
  icon?: ListOfAllIcons
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
  onClick?: () => void
  style?: Style
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
