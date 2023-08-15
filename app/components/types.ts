// types for all components let's go
import {
  ColorActionColors,
  ColorBackgroundColors,
  ColorNonSemanticBackgroundColors,
} from '../../src/varsTypes'
import { Style } from 'inlines'

// TODO make props of icons
// notes : beforeIcon =                     icon
//         muted, emphasis = low etc. are   subtle
//         state , intent etc. =            color

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

export type CheckboxProps = {}

export type CheckboxItemProps = {}

export type ClickableIconProps = {}

export type CounterProps = {}

export type DatePickerProps = {}

export type DefaultItemProps = {}

export type DividerProps = {}

export type DropdownProps = {}

export type FilterPillProps = {}

// text field in figma
export type InputProps = {}

export type InputWarningProps = {}

export type ListItemProps = {}

export type MenuItemProps = {}

export type ModalProps = {}

export type ModalBottomBarProps = {}

export type ModalContentProps = {}

export type ModalWarningProps = {}

export type MultiSelectProps = {}

export type OtherItemsProps = {}

export type ScrollAreaProps = {}

export type SelectProps = {}

export type SelectableItemProps = {}

export type SegmentedControlProps = {}

export type SegmentedControlOptionsProps = {}

export type SidebarNavigationHolderProps = {}

export type SliderProps = {}

export type SpotlightSearchProps = {}

export type StatusProps = {}

export type TabProps = {}

export type TagProps = {}

export type ToggleProps = {}

export type TooltipProps = {}

export type TopNavigationProps = {}
