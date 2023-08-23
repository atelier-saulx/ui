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

export type BreadcrumbsProps = {}

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

export type DropdownProps = {}

export type FilterPillProps = {}

// text field in figma

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
