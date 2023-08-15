// types for all components let's go
import { ReactNode } from 'react'
import {
  ColorActionColors,
  ColorBackgroundColors,
  ColorContentColors,
  ColorNonSemanticBackgroundColors,
} from '../../src/varsTypes'
import { Style } from 'inlines'

// TODO make props of icons
// notes : beforeIcon =                     icon
//         muted, emphasis = low etc. are   subtle
//         state , intent etc. =            color
//        checked, marked ,  -->            active

export type ActionItemProps = {}

export type AlertBannerProps = {
  color?: ColorBackgroundColors
  icon?: any
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
  afterIcon?: any
  color?: ColorBackgroundColors
  icon?: any
  label?: string
  onClick?: () => void
  style?: Style
  subtle?: boolean
}

export type BreadcrumbsProps = {}

export type ButtonProps = {
  afterIcon?: any
  color?: ColorActionColors
  disabled?: boolean
  dropdownIndicator?: boolean
  ghost?: boolean
  icon?: any
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
  style?: Style
}

// this is combination of text and checkbox
export type CheckboxItemProps = {
  disabled?: boolean
  label?: string
} & CheckboxProps

export type ClickableIconProps = {
  icon?: any
  onClick?: () => void
  size?: 'large' | 'small'
  style?: Style
}

export type CounterProps = {
  color?: ColorBackgroundColors
  label?: number
  onClick?: () => void
  style?: Style
  subtle?: boolean
}

export type DatePickerProps = {}

export type DefaultItemProps = {}

export type DividerProps = {
  style?: Style
}

export type DropdownProps = {}

export type FilterPillProps = {}

// text field in figma
export type InputProps = {}

export type InputWarningProps = {
  active?: boolean
  icon?: any
  label?: string
}

export type ListItemProps = {}

export type MenuItemProps = {}

export type ModalProps = {
  label?: string
  description?: string
}

export type ModalBottomBarProps = {}

export type ModalContentProps = {}

export type ModalWarningProps = {
  color?: ColorBackgroundColors
  label?: string
}

export type MultiSelectProps = {}

export type OtherItemsProps = {}

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

export type SelectProps = {}

export type SelectableItemProps = {}

export type SegmentedControlProps = {}

export type SegmentedControlOptionsProps = {}

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
  color?: ColorBackgroundColors
  ghost?: boolean
  label?: string
  onClick?: () => void
  style?: Style
  subtle?: boolean
}

export type TabProps = {}

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
