import React from 'react'
import '../src/fonts.css'
import { ComponentDef } from './types'
import accordion from './components/Accordion'
import action from './components/Action'
import alert from './components/Alert'
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
import container from './components/Container'
import counter from './components/Counter'
import datePicker from './components/DatePicker'
import dateRange from './components/DateRange'
import divider from './components/Divider'
import dropdown from './components/Dropdown'
import fileInput from './components/FileInput'
import formGroup from './components/FormGroup'
import icon from './components/Icon'
import linegraph from './components/Linegraph'
import list from './components/List'
import logsText from './components/LogsText'
import Menu from './components/Menu'
import metricsWidget from './components/MetricsWidget'
import modal from './components/Modal'
import modalConfirmation from './components/ModalConfirmation'
import multiSelect from './components/MultiSelectInput'
import multlineInput from './components/TextAreaInput'
import numberInput from './components/NumberInput'
import pieGraph from './components/PieGraph'
import pill from './components/Pill'
import popover from './components/Popover'
import prompt from './components/Prompt'
import radioButtons from './components/RadioButtons'
import richtTextEditor from './components/RichTextEditor'
import scrollArea from './components/ScrollArea'
import searchInput from './components/SearchInput'
import sectionHeader from './components/SectionHeader'
import segmentedControl from './components/SegmentedControl'
import selectInput from './components/SelectInput'
import sidePanel from './components/SidePanel'
import slider from './components/Slider'
import status from './components/Status'
import styledDivs from './components/StyledDivs'
import table from './components/Table'
import tabs from './components/Tabs'
import tag from './components/Tag'
import text from './components/Text'
import textInput from './components/TextInput'
import thumbnail from './components/Thumbnail'
import toast from './components/Toast'
import toggle from './components/Toggle'
import tooltipTest from './components/Tooltip'
import topNavigation from './components/TopNavigation'
import useContextState from './hooks/useContextState'
import map from './components/Map'
import singleMetric from './components/SingleMetric'

export const hooks: ComponentDef[] = [useContextState]

export const input = [
  action,
  button,
  checkboxInput,
  colorInput,
  confirmation,
  datePicker,
  dateRange,
  fileInput,
  formGroup,
  list,
  multiSelect,
  multlineInput,
  numberInput,
  radioButtons,
  richtTextEditor,
  searchInput,
  segmentedControl,
  selectInput,
  slider,
  textInput,
  toggle,
]

export const misc = [code, colorPicker, logsText, styledDivs, tag]

export const overlay = [
  alert,
  dropdown,
  modal,
  modalConfirmation,
  pill,
  popover,
  prompt,
  sidePanel,
]

export const feedback = [alertBanner, badge, toast, tooltipTest]

export const icons = [icon]

export const layout = [accordion, container, divider, scrollArea, tabs]

export const navigation = [breadCrumbs, Menu, topNavigation]

export const graphs = [
  barGraph,
  linegraph,
  map,
  metricsWidget,
  pieGraph,
  singleMetric,
]

export const display = [
  avatar,
  counter,
  sectionHeader,
  status,
  table,
  text,
  thumbnail,
]
