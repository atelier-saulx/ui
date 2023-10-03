import React from 'react'
import '../src/fonts.css'
import { ComponentDef } from './types'
import accordion from './components/Accordion'
import alertBanner from './components/AlertBanner'
import avatar from './components/Avatar'
import badge from './components/Badge'
import barGraph from './components/BarGraph'
import breadCrumbs from './components/BreadCrumbs'
import button from './components/Button'
import checkboxInput from './components/CheckboxInput'
import code from './components/Code'
import colorInput from './components/ColorInput'
import colorPicker from './components/ColorPicker'
import confirmation from './components/Confirmation'
import counter from './components/Counter'
import datePicker from './components/DatePicker'
import dateRange from './components/DateRange'
import divider from './components/Divider'
import dropdown from './components/Dropdown'
import fileInput from './components/FileInput'
import icon from './components/Icon'
import linegraph from './components/Linegraph'
import logsText from './components/LogsText'
import metricsWidget from './components/MetricsWidget'
import multlineInput from './components/TextAreaInput'
import numberInput from './components/NumberInput'
import pieGraph from './components/PieGraph'
import pill from './components/Pill'
import popover from './components/Popover'
import radioButtons from './components/RadioButtons'
import scrollArea from './components/ScrollArea'
import searchInput from './components/SearchInput'
import segmentedControl from './components/SegmentedControl'
import selectInput from './components/SelectInput'
import sidePanel from './components/SidePanel'
import Menu from './components/Menu'
import slider from './components/Slider'
import status from './components/Status'
import settings from './components/Settings'

import table from './components/Table'
import tabs from './components/Tabs'
import tag from './components/Tag'
import text from './components/Text'
import textInput from './components/TextInput'
import toast from './components/Toast'
import toggle from './components/Toggle'
import tooltipTest from './components/Tooltip'
import topNavigation from './components/TopNavigation'
import useContextState from './hooks/useContextState'
import newTable from './components/NewTable'

import modal from './components/Modal'

export const hooks: ComponentDef[] = [useContextState]

export const components: ComponentDef[] = [
  newTable,
  accordion,
  alertBanner,
  avatar,
  badge,
  barGraph,
  breadCrumbs,
  button,
  checkboxInput,
  code,
  colorInput,
  colorPicker,
  confirmation,
  counter,
  datePicker,
  dateRange,
  divider,
  dropdown,
  fileInput,
  icon,
  linegraph,
  logsText,
  Menu,
  metricsWidget,
  modal,
  multlineInput,
  numberInput,
  pieGraph,
  pill,
  popover,
  radioButtons,
  scrollArea,
  searchInput,
  segmentedControl,
  settings,
  selectInput,
  sidePanel,
  slider,
  status,
  table,
  tabs,
  tag,
  text,
  textInput,
  toast,
  toggle,
  tooltipTest,
  topNavigation,
]
