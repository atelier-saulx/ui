import React, { useState } from 'react'
import '../src/fonts.css'
import {
  AlertBanner,
  Avatar,
  Badge,
  BarGraph,
  Breadcrumbs,
  Button,
  Counter,
  DatePicker,
  DateRange,
  Divider,
  Dropdown,
  IconBolt,
  IconClipboard,
  IconEmojiSmile,
  IconHome,
  Input,
  LineGraph,
  Logs,
  Menu,
  MetricsWidget,
  Modal,
  PieGraph,
  RadioButtons,
  ScrollArea,
  SegmentedControl,
  Slider,
  Status,
  Table,
  Tab,
  Tabs,
  Tag,
  Text,
  styled,
  Pill,
  Toast,
  Toggle,
  TooltipTest,
  Popover,
  SidePanel,
  TopNavigation,
} from '../src'
import * as ui from '../src'
import props from './props.json'
import { ComponentDef } from './types'
import { wait } from '@saulx/utils'
import { Icon } from '../src/icons/Icon'
import { BpMobile, BpTablet } from '../src/utils/breakpoints'
import { faker } from '@faker-js/faker'
import { BasedLogo } from '../src/icons/BasedLogo'

export const components: ComponentDef[] = [
  {
    name: 'Alert Banner',
    properties: props.props.AlertBannerProps.props,
    component: AlertBanner,
    description: 'Banners to alert',
    examples: [
      {
        props: {
          color: 'negative',
          children: 'Alert text',
          action: { label: 'Action', onClick: () => console.log('Reaction') },
          style: { width: 374 },
        },
      },
      {
        props: {
          color: 'warning',
          children: 'Warning Resolve',
          action: { label: 'RESOLVE', onClick: () => console.log('oppa') },
        },
      },
    ],
  },
  {
    name: 'Avatar',
    properties: props.props.AvatarProps.props,
    component: Avatar,
    description: 'Simple Avatar component',
    examples: [
      {
        props: {
          color: 'raspberry',
          children: 'sd',
          size: 'large',
          squared: true,
        },
      },
      {
        name: 'Solid Color Avatar',
        description: 'Rock solid',
        props: {
          color: 'aquamarine',
          children: 'F1',
          size: 'large',
          light: true,
          imgsrc: 'https://robohash.org/G2J.png?set=set1',
        },
      },
    ],
  },
  {
    name: 'Badge',
    properties: props.props.BadgeProps.props,
    component: Badge,
    description: 'Badge component',
    examples: [
      {
        props: {
          children: 'Hello badge',
          color: 'informative',
          light: false,
        },
      },
      {
        props: {
          icon: () => React.createElement(ui.IconSmallBolt),
        },
      },
    ],
  },
  {
    name: 'BarGraph',
    // TODO yves change these props
    properties: props.props.BadgeProps.props,
    component: BarGraph,
    description: '100 bars for breakfast',
    examples: [
      {
        props: {
          style: { width: 540, [BpTablet]: { width: 'unset' } },
          display: 'values',
          data: [
            {
              label: 'Moose 🦆',
              value: 160000,
              color: 'violet',
            },
            {
              label: 'Caribou 🦌',
              value: 576000,
            },
            {
              label: 'Bears 🐻',
              value: 43000,
              color: 'green',
            },
            {
              label: 'Wolves 🐺',
              value: 62000,
              color: 'blue',
            },
          ],
        },
      },
      {
        props: {
          style: { width: 540, [BpTablet]: { width: 'unset' } },
          direction: 'vertical',
          data: [
            {
              label: 'Moose 🦆',
              value: 160000,
            },
            {
              label: 'Caribou 🦌',
              value: 576000,
            },
            {
              label: 'Bears 🐻',
              value: 43000,
            },
            {
              label: 'Wolves 🐺',
              value: 62000,
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Breadcrumbs',
    properties: props.props.BreadcrumbsProps.props,
    component: Breadcrumbs,
    description: 'set onchange value in route',
    examples: [
      {
        props: {
          style: {
            // [BpTablet]: {
            //   transform: 'scale(0.5)',
            // },
          },
          data: {
            flip: 'flip',
            flap: 'flap',
            flup: 'flup',
            snip: 'snip',
            snap: 'snap',
            snurp: 'snurp',
          },
          onChange: (v) => console.log(v),
        },
      },
    ],
  },
  {
    name: 'Button',
    properties: props.props.ButtonProps.props,
    component: Button,
    description: 'Simple button component',
    examples: [
      {
        props: {
          children: 'Click me',
        },
      },

      {
        name: 'Async action indicators',
        description: 'Visual indication of errors and loading state',
        props: {
          onClick: async () => {
            await wait(5000)
          },
          color: 'primary',
          children: 'Do something async',
          light: true,
        },
      },
      {
        props: {
          color: 'alert',
          onClick: async () => {
            throw new Error('Flap!')
          },
          children: 'Throw an error!',
          size: 'small',
          light: false,
        },
      },
      {
        name: 'Colors',
        props: {
          children: 'Neutral color',
          icon: () => <IconClipboard />,
          color: 'alert',
          size: 'small',
        },
      },
      {
        name: 'Icon Button',
        props: {
          // children: 'Neutral color',
          icon: () => <IconClipboard />,
          color: 'neutral',
          size: 'large',
        },
      },
      {
        props: {
          children: 'Bare Button',
          color: 'alert',
          size: 'xsmall',
          underline: true,
          onClick: async () => {
            await wait(1000)
          },
        },
      },
    ],
  },
  {
    name: 'CheckboxInput',
    component: Input,
    description: 'Checkbox input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {},
        customRenderer: () => {
          const [checked, setChecked] = useState(false)
          return (
            <Input
              type="checkbox"
              title="Subscribe to our newsletter"
              value={checked}
              onChange={(v) => {
                setChecked(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [checked, setChecked] = useState(false)
          return (
            <Input
              type="checkbox"
              intermediate
              title="Intermediate checkbox"
              description="Lorem ipusm asd 123"
              value={checked}
              onChange={(v) => {
                setChecked(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [checked, setChecked] = useState(true)
          return (
            <Input
              type="checkbox"
              disabled
              title="Disabled checkbox"
              description="Lorem ipusm asd 123"
              value={checked}
              onChange={(v) => {
                setChecked(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [checked, setChecked] = useState(false)
          return (
            <Input
              type="checkbox"
              title="Title"
              description="Description"
              value={checked}
              label="This is a label"
              error="This is an error"
              onChange={(v) => {
                setChecked(v)
              }}
            />
          )
        },
      },
    ],
  },
  {
    name: 'Counter',
    properties: props.props.CounterProps.props,
    description: '',
    component: Counter,
    examples: [
      {
        props: { color: 'informative', children: 24 },
      },
    ],
  },
  {
    name: 'Date Picker',
    properties: props.props.DatePickerProps.props,
    description: 'Single day picker',
    component: DatePicker,
    examples: [
      {
        props: { onChange: (e) => console.log(e) },
      },
    ],
  },
  {
    name: 'Date Range',
    properties: props.props.DateRangeProps.props,
    description: 'Range of date picker',
    component: DateRange,
    examples: [
      {
        props: { onChange: (e) => console.log(e) },
      },
    ],
  },
  {
    name: 'Divider',
    properties: props.props.DividerProps.props,
    description: '',
    component: Divider,
    examples: [{ props: { style: { width: '342px' } } }],
  },
  {
    name: 'Dropdown',
    properties: props.props.DropDownProps.props,
    description: '',
    component: Dropdown,
    examples: [
      {
        props: {
          data: [
            { label: 'Option uno', icon: () => <IconEmojiSmile /> },
            { label: 'Option dos', icon: () => <IconEmojiSmile /> },
            { label: 'Option trois', type: 'checkbox', value: true },
            // { label: 'Option trois', type: 'radio', value: false },
            {
              label: 'Option more',
              icon: () => <IconEmojiSmile />,
              caption: 'More',
              data: [
                { label: 'SubOption 1' },
                { label: 'SubOption 2', type: 'checkbox' },
                {
                  label: 'SubOption 3',
                  caption: 'Caption',
                  data: [
                    { label: 'SupperdeSup 1' },
                    { label: 'SupperdeSup 2' },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    name: 'FileInput',
    component: Input,
    description: 'Single file input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          type: 'file',
        },
      },
      {
        props: {
          type: 'file',
          multiple: true,
          label: 'Add multiple fiels',
        },
      },
    ],
  },
  {
    name: 'Icon',
    properties: props.props.IconProps.props,
    component: Icon,
    description: 'Icons are generated from figma directly',
    examples: [
      {
        name: 'Large Icons',
        customRenderer: (props) => {
          const icons = []
          for (const key in ui) {
            if (key.startsWith('Icon') && !key.startsWith('IconSmall')) {
              icons.push(
                // @ts-ignore
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    width: 300,
                    alignItems: 'center',
                  }}
                >
                  {React.createElement(ui[key], props)}
                  <Text light style={{ marginLeft: 20 }}>
                    {key}
                  </Text>
                </div>
              )
            }
          }
          return (
            <div
              style={{
                gap: 12,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {icons}
            </div>
          )
        },
        props: {
          color: 'brand',
        },
      },
      {
        name: 'Small icons',
        customRenderer: (props) => {
          const icons = []
          for (const key in ui) {
            if (key.startsWith('IconSmall')) {
              icons.push(
                // @ts-ignore
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    width: 300,
                    alignItems: 'center',
                  }}
                >
                  {React.createElement(ui[key], props)}
                  <Text light style={{ marginLeft: 20 }}>
                    {key}
                  </Text>
                </div>
              )
            }
          }
          return (
            <div
              style={{
                gap: 12,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {icons}
            </div>
          )
        },
        props: {
          color: 'brand',
        },
      },
      {
        name: 'Clickable Icon',
        description:
          'When onClick is provided will add a hover state and larger hitbox',
        customRenderer: IconBolt,
        props: {
          onClick: () => {
            alert('bla')
          },
        },
      },
    ],
  },
  {
    name: 'LineGraph',
    component: LineGraph,
    properties: props.props.LineGraphProps.props,
    description: '',
    examples: [
      {
        props: { label: 'single line' },
        customRenderer: (props) => {
          const genRandomPoints = (
            formula: (i: number) => { x: number; y: number },
            start: number = 0,
            end: number = 50,
            step: number = 1
          ) => {
            const points: { x: number; y: number }[] = []
            for (let i = start; i <= end; i = i + step) {
              points.push(formula(i))
            }
            return points
          }

          return (
            <styled.div
              style={{
                width: 600,
                height: 364,
                marginBottom: 24,
              }}
            >
              <LineGraph
                data={genRandomPoints(
                  (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
                  0,
                  50
                )}
                label="Single Line"
              />
            </styled.div>
          )
        },
      },
    ],
  },
  {
    name: 'Logs',
    description: '',
    // TODO  yves ,change to LogsProps once genprops works again
    properties: props.props.ScrollAreaProps.props,
    component: Logs,
    examples: [
      {
        props: {
          // data: [
          //   { msg: '🪵 Log 1', ts: 21241425 },
          //   { msg: '🪵 Log 2', ts: 2143241425 },
          // ],
        },
        customRenderer: () => {
          let logData = [{ msg: '🪵 Log 1', ts: 21241425 }]

          return <Logs data={logData} />
        },
      },
    ],
  },
  {
    name: 'MetricsWidget',
    // TODO  yves ,change to LogsProps once genprops works again
    properties: props.props.ModalProps.props,
    description: '',
    component: MetricsWidget,
    examples: [
      {
        props: {},
        customRenderer: () => {
          // generate some random data
          const genRandomPoints = (
            formula: (i: number) => { x: number; y: number },
            start: number = 0,
            end: number = 50,
            step: number = 1
          ) => {
            const points: { x: number; y: number }[] = []
            for (let i = start; i <= end; i = i + step) {
              points.push(formula(i))
            }
            return points
          }

          const testData = {
            technology: genRandomPoints(
              (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
              0,
              50
            ),
            science: genRandomPoints(
              (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
              0,
              100
            ),
            'Alaskan wildlife': [
              {
                label: 'Moose 🦆',
                value: 160000,
              },
              {
                label: 'Caribou 🦌',
                value: 576000,
              },
              {
                label: 'Bears 🐻',
                value: 43000,
              },
              {
                label: 'Wolves 🐺',
                value: 62000,
              },
            ],
            pietest: [
              {
                label: 'Yes sure if you like ugly shit',
                value: 1280,
              },
              {
                label: 'No sorry',
                value: 637,
              },
              {
                label: 'What logo?',
                value: 146,
              },
              {
                label: 'Mmm ?',
                value: 126,
              },
            ],
          }

          return <MetricsWidget label="Technology" data={testData} style={{}} />
        },
      },
    ],
  },
  {
    name: 'Modal',
    properties: props.props.ModalProps.props,
    component: Modal,
    description: 'Must be a dialog example here',
    examples: [{ props: {} }],
  },
  {
    name: 'PieGraph',
    // TODO yves change these props
    properties: props.props.ScrollAreaProps.props,
    component: PieGraph,
    description: '',
    examples: [
      {
        props: {},
        customRenderer: () => {
          const data = [
            {
              label: 'Apples',
              value: 25455,
              color: 'violet',
            },
            {
              label: 'Sugar',
              value: 5484,
              color: 'magenta',
            },
            {
              label: 'Flour',
              value: 2566,
              color: 'grey',
            },
            {
              label: 'Cinnamon',
              value: 2566,
              color: 'blue',
            },
          ]

          const advancedPieData = [
            {
              label: 'Some countries',
              value: { en: 675, de: 200, nl: 600 },
              color: '#BADA55',
            },
            {
              label: 'More data',
              value: { en: 275, de: 600, nl: 50 },
            },
            {
              label: 'What logo?',
              value: { ax: 75, bc: 201, qr: 30 },
              color: '#0000ff',
            },
            {
              label: 'more data',
              value: { en: 70, de: 201, nl: 130 },
              color: '#ff8a00',
            },
          ]

          return <PieGraph data={data} />
        },
      },
    ],
  },
  {
    name: 'Radiobuttons',
    component: RadioButtons,
    description: 'Radiobuttons',
    properties: props.props.RadioButtonsProps.props,
    examples: [
      {
        props: {
          data: [
            { label: 'Radio1', value: 1, description: 'hwlloe 1' },
            { label: 'Radio2', value: 2, description: 'hwlloe 2' },
          ],
          onChange: (v) => console.log(v),
        },
      },
    ],
  },
  // {
  //   name: 'NumberInput',
  //   component: Input,
  //   description: 'Number input',
  //   properties: props.props.InputProps.props,
  //   examples: [
  //     {
  //       props: {
  //         type: 'number',
  //         placeholder: 'type a number',
  //         prefix: 'pre',
  //         clearButton: true,
  //       },
  //     },
  //   ],
  // },
  {
    name: 'SearchInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')

          return (
            <Input
              type="search"
              placeholder="Search"
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')

          return (
            <Input
              type="search"
              label="You can add a clear button"
              clearButton
              placeholder="Search"
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')

          return (
            <Input
              type="search"
              label="You can add a label"
              error="and an error if you really want"
              placeholder="Search"
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
            />
          )
        },
      },
    ],
  },
  {
    name: 'SegmentedControl',
    component: SegmentedControl,
    description: '',
    properties: props.props.SegmentedControlProps.props,
    examples: [
      {
        props: {
          data: [2, '15d', 'Option', 'Option 2'],
          onChange: (v) => console.log(v),
        },
      },
    ],
  },
  {
    name: 'SelectInput',
    component: Input,
    description: 'Select input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')
          return (
            <Input
              type="select"
              multiple={false}
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
              placeholder="Select one"
              options={[
                { label: 'Item one', value: 'value1' },
                { label: 'Item two', value: 'value2' },
                { label: 'Item three', value: 'value3' },
              ]}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [multiValue, setMultiValue] = useState<string[]>([])
          return (
            <Input
              type="select"
              multiple
              value={multiValue}
              label="This is a label"
              onChange={(v) => {
                setMultiValue(v)
              }}
              placeholder="Select multiple"
              options={[
                { label: 'Item one', value: 'value1' },
                { label: 'Item two', value: 'value2' },
                { label: 'Item three', value: 'value3' },
              ]}
            />
          )
        },
      },
    ],
  },
  {
    name: 'Pill',
    component: Pill,
    description: 'Pill',
    properties: props.props.PillProps.props,
    examples: [
      {
        props: {
          prefix: 'Select',
          label: 'something',
          options: [
            { label: 'Item one', value: 'value1' },
            { label: 'Item two', value: 'value2' },
            { label: 'Item three', value: 'value3' },
          ],
          type: 'select',
        },
      },
      {
        props: {
          filled: true,
          prefix: 'Yes??',
          label: 'YEs?',
          value: true,
          type: 'select',
        },
      },
    ],
  },
  {
    name: 'Popover',
    component: Popover,
    description: 'PopoverTest',
    properties: props.props.PillProps.props,
    examples: [{}],
  },
  {
    name: 'ScrollArea',
    component: ScrollArea,
    description: '',
    props: props.props.ScrollAreaProps.props,
    examples: [
      {
        props: {
          style: { width: 300, height: 300 },
          children: `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                     Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                     Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                     The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by Eng`,
        },
      },
    ],
  },
  {
    name: 'Sidebar Navigation',
    component: Menu,
    description: '',
    props: props.props.MenuProps.props,
    examples: [
      {
        props: {
          collapse: true,
          data: {
            Label: {
              flyp: {
                value: 'yow1',
                label: 'Menu Text',
                icon: () => <IconHome />,
              },
            },
            title: {
              flyp: {
                value: 'yow1',
                label: 'Menu Text',
                icon: () => <IconEmojiSmile />,
              },
              flip: {
                label: 'Menu Text',
                icon: () => <IconHome />,
              },
              flop: {
                value: 'yow3',
                label: 'Menu Text',
                icon: () => <IconHome />,
              },
              test: {
                value: 'x',
                label: 'more0',
                items: [{ value: 'yow4', label: 'flipe' }],
              },
              flap: 'Menu Text',
            },
          },
        },
      },
    ],
  },
  {
    name: 'SidePanel',
    component: SidePanel,
    description: 'SidePaneltest',
    properties: props.props.PillProps.props,
    examples: [{}],
  },
  {
    name: 'Slider',
    component: Slider,
    description: 'Range Slider you can also use keyboard arrow keys',
    properties: props.props.SliderProps.props,
    examples: [
      {
        props: {
          style: { [BpMobile]: { transform: 'scale(0.75)' } },
          data: [
            { id: 'flip', title: 'Flippie', index: 0 },
            { id: 'flap', title: 'Flap', index: 1 },
            { id: 'Flurp', title: 'Flupr', index: 2 },
          ],
        },
      },
      {
        props: {
          style: { [BpMobile]: { transform: 'scale(0.75)' } },
          min: 0,
          max: 60,
          steps: 5,
          onChange: (v) => console.log(v),
          color: 'alert',
        },
      },
    ],
  },
  {
    name: 'Status',
    component: Status,
    description: '',
    properties: props.props.StatusProps.props,
    examples: [
      {
        props: {
          children: 'Status Text',
          color: 'informative',
        },
      },
    ],
  },
  {
    name: 'Tabs',
    component: Tabs,
    description: 'Tabs',
    properties: props.props.TabsProps.props,
    examples: [
      {
        props: {
          activeTab: 1,
        },
        customRenderer: (props) => {
          return (
            <styled.div
              style={{
                width: 600,
                [BpTablet]: {
                  width: 'unset',
                },
                marginBottom: 24,
              }}
            >
              <Tabs activeTab={1}>
                <Tab label="Apple" children="🍎" />
                <Tab label="Bear" children="🐻" />
                <Tab label="Crescendo" children="🎵" />
              </Tabs>
            </styled.div>
          )
        },
      },
      {
        props: {
          activeTab: 1,
        },
        customRenderer: (props) => {
          return (
            <styled.div
              style={{
                width: 600,
                [BpTablet]: {
                  width: 'unset',
                },
                marginBottom: 24,
              }}
            >
              <Tabs borderColor="neutral" activeTab={1}>
                <Tab label="Edgy Apple" children="🍎" />
                <Tab label="Edgy Bear" children="🐻" />
                <Tab label="Edgy Crescendo" children="🎵" />
              </Tabs>
            </styled.div>
          )
        },
      },
    ],
  },
  {
    name: 'Table',
    component: Table,
    description: 'Table',
    properties: props.props.TableProps.props,
    examples: [
      {
        props: {},
        customRenderer: () => {
          const newPerson = (index: number) => {
            return {
              id: index + 1,
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              age: faker.datatype.number(40),
              visits: faker.datatype.number(1000),
              progress: faker.datatype.number(100),
              createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
              status: faker.helpers.shuffle([
                'relationship',
                'complicated',
                'single',
              ])[0]!,
            }
          }

          function makeData(...lens: number[]) {
            const makeDataLevel = (depth = 0) => {
              const len = lens[depth]!
              return Array.from({ length: len }).map((_, index) => {
                return {
                  ...newPerson(index),
                }
              })
            }

            return makeDataLevel()
          }

          const [data] = useState(() => makeData(500))

          return (
            <div
              style={{
                height: 500,
              }}
            >
              <Table
                data={data}
                columns={[
                  { header: 'ID', accessor: 'id' },
                  { header: 'First name', accessor: 'firstName' },
                  { header: 'Last name', accessor: 'lastName' },
                  { header: 'Age', accessor: 'age' },
                  { header: 'Visits', accessor: 'visits' },
                  {
                    header: 'Status',
                    accessor: 'status',
                    cell: (value) => (
                      <button onClick={() => alert(value)}>{value}</button>
                    ),
                  },
                ]}
              />
            </div>
          )
        },
      },
    ],
  },
  {
    name: 'Tag',
    component: Tag,
    description: 'Tags',
    properties: props.props.TagProps.props,
    examples: [
      {
        props: {
          children: 'Tag',
          onClose: () => console.log('close??'),
        },
      },
    ],
  },
  {
    name: 'Text',
    component: Text,
    description: 'Text including typeography',
    properties: props.props.TextProps.props,
    examples: [
      {
        props: {
          children: 'Some Text',
          weight: 'medium',
        },
      },
      {
        props: {
          children: 'Light text, for descriptions.',
          light: true,
        },
      },
    ],
  },

  {
    name: 'TextInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')

          return (
            <Input
              type="text"
              value={value}
              placeholder="Simple"
              onChange={(v) => {
                setValue(v)
              }}
            />
          )
        },
      },
      {
        props: {},
        customRenderer: () => {
          const [value, setValue] = useState('')

          return (
            <Input
              type="text"
              label="This is a label"
              placeholder="Advanced"
              error="This is an error"
              value={value}
              onChange={(v) => {
                setValue(v)
              }}
            />
          )
        },
      },
    ],
  },
  {
    name: 'Toast',
    component: Toast,
    description: '',
    properties: props.props.ToastProps.props,
    examples: [
      {
        props: {
          label: 'Toast text',
          closeable: true,
          color: 'informative',
          description: 'Hellow',
          strong: true,
          action: { onClick: () => alert('snurp'), label: 'Action' },
        },
      },
      {
        props: {
          label: 'Toast text',
          color: 'warning',
          strong: true,
          description: 'Warning',
          action: { onClick: () => alert('snurp'), label: 'Action' },
          closeable: true,
        },
      },
      {
        props: {
          label: 'DESTROY',
          color: 'negative',
          strong: true,
          description: 'destructive',
          action: { onClick: () => alert('snurp'), label: 'Action' },
          closeable: true,
        },
      },
      // default'|'inverted'|'neutral'|'informative'|'positive'|'warning'|'negative'|'brand
      {
        props: {
          label: 'Toast text',
          color: 'positive',
          description: 'good job!',
          closeable: true,
        },
      },
      {
        props: {
          label: 'Based Af',
          color: 'brand',
          strong: true,
          description: 'good job!',
          closeable: true,
        },
      },
      {
        props: {
          label: 'Wow oppositez≈',
          color: 'inverted',
          strong: true,
          description: 'good job!',
          closeable: true,
        },
      },
    ],
  },
  {
    name: 'Toggle',
    component: Toggle,
    description: 'Toggle button',
    properties: props.props.ToggleProps.props,
    examples: [
      {
        props: {
          size: 'large',
          value: true,
          disabled: false,
        },
      },
      {
        props: {
          size: 'medium',
          value: true,
          onClick: (v) => console.log(v),
          color: 'neutral',
        },
      },
    ],
  },
  {
    name: 'TooltipTest',
    component: TooltipTest,
    description: 'just a teset',
    properties: props.props.ScrollAreaProps.props,
    examples: [{ props: {} }],
  },

  {
    name: 'Top Navigation',
    component: TopNavigation,
    description: 'just a teset',
    properties: props.props.ScrollAreaProps.props,
    examples: [
      {
        props: {},
        customRenderer: (props) => {
          return (
            <styled.div
              style={{
                top: 0,
                position: 'relative',
                width: 700,
                height: 200,
                // [BpTablet]: {
                //   width: 'unset',
                // },
              }}
            >
              <TopNavigation>
                <BasedLogo />
                <Tabs
                  activeTab={1}
                  style={{ marginLeft: '24px', marginTop: '6px' }}
                >
                  <Tab label="Apple" children="🍎" />
                  <Tab label="Bear" children="🐻" />
                  <Tab label="Crescendo" children="🎵" />
                </Tabs>
                <Avatar style={{ marginLeft: 'auto' }}>Kyle</Avatar>
              </TopNavigation>
            </styled.div>
          )
        },
      },
    ],
  },
]
