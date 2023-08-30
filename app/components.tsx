import React from 'react'
import '../src/fonts.css'
import {
  AlertBanner,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  Counter,
  DatePicker,
  DateRange,
  Dialog,
  Divider,
  Dropdown,
  IconBolt,
  IconClipboard,
  IconEmojiSmile,
  Input,
  LineGraph,
  Modal,
  MultiSelect,
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
  Toast,
  Toggle,
} from '../src'
import * as ui from '../src'
import props from './props.json'
import { ComponentDef } from './types'
import { wait } from '@saulx/utils'
import { Icon } from '../src/icons/Icon'

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
          action: { label: 'RESOLVE', onClick: () => console.log('oppa ') },
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
    name: 'Breadcrumbs',
    properties: props.props.BreadcrumbsProps.props,
    component: Breadcrumbs,
    description: 'set onchange value in route',
    examples: [
      {
        props: {
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
          color: 'inverted',
          size: 'small',
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
    name: 'Checkbox',
    properties: props.props.CheckboxProps.props,
    component: Checkbox,
    description: 'Simple checkbox component',
    examples: [
      {
        props: {
          children: 'Click me',
          description: 'Little description text',
          label: 'Label',
          value: true,
          onClick: (v) => console.log(v),
        },
      },

      {
        props: {
          onClick: async () => {
            await wait(1000)
          },
          warning: true,
          children: 'Do something async',
        },
        name: 'Warning',
        description: 'Visual indication of errors ',
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
        props: { color: 'brand', children: 32, light: true },
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
        props: {
          data: {
            en: {
              data: () =>
                genRandomPoints(
                  (i) => ({ x: i, y: ~~(Math.random() * 10) + i * 100 }),
                  0,
                  50
                ),
              minMax: true,
            },
          },
          label: 'single line 50000',
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
  {
    name: 'NumberInput',
    component: Input,
    description: 'Number input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          type: 'number',
          placeholder: 'type a number',
          // suffix: 'suf',
          // prefix: 'pre',
          // clearButton: true,
        },
      },
    ],
  },
  {
    name: 'SearchInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          clearButton: true,
          placeholder: 'Search & navigate',
          type: 'search',
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
        props: {
          placeholder: 'Select something',
          options: [
            { label: 'Item one', value: 'value1' },
            { label: 'Item two', value: 'value2' },
            { label: 'Item three', value: 'value3' },
          ],
          type: 'select',
        },
      },
    ],
  },
  {
    name: 'MultiSelect',
    component: MultiSelect,
    description: 'Select input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          placeholder: 'Select something',
          options: [
            { label: 'Item one', value: 'value1' },
            { label: 'Item two', value: 'value2' },
            { label: 'Item three', value: 'value3' },
          ],
          type: 'select',
        },
      },
    ],
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
    name: 'Slider',
    component: Slider,
    description: 'Range Slider',
    properties: props.props.SliderProps.props,
    examples: [
      {
        props: {
          data: [
            { id: 'flip', title: 'Flippie', index: 0 },
            { id: 'flap', title: 'Flap', index: 1 },
            { id: 'Flurp', title: 'Flupr', index: 2 },
          ],
        },
      },
      {
        props: {
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
    name: 'Table',
    component: Table,
    description: '',
    properties: props.props.TableProps.props,
    examples: [
      {
        props: {
          headers: [
            { key: 'title', label: 'Title' },
            { key: 'author', label: 'Author', type: 'author' },
            { key: 'cover', label: 'Cover', type: 'img' },
            { key: 'number', label: 'Number', type: 'id' },
            { key: 'boolie', label: 'Boolean', type: 'boolean' },
            { key: 'time', label: 'Time', type: 'timestamp' },
          ],
          data: [
            {
              title: 'AAA',
              author: 'CCCC',
              cover:
                'https://img.parool.nl/aab6c754847bb34777c45ab7592473abca9b12ea/jip-en-janneke-voor-hema-niet-meer-heilig',
              number: 243545,
              boolie: false,
              time: 32454645454,
            },
            {
              title: 'CCC',
              author: 'BBBB',
              cover:
                'https://www.manners.nl/wp-content/uploads/2023/03/harry-potter.png',
              number: 5345432,
              boolie: true,
              time: 1113241133333,
            },
            {
              title: 'DDD',
              author: 'AAAA',
              cover:
                'https://64.media.tumblr.com/ee50e3ad64c22072c845097b2fe728e2/ad8bfb7892283c6d-0a/s1280x1920/14c9a1d48c9b8499e5107476bfd68e97fd05e823.png',
              number: 53445432,
              boolie: false,
            },
            {
              title: 'BBB',
              author: 'DDDD',
              cover:
                'https://i1.sndcdn.com/artworks-H999wKziGSquPTzr-Xy5zjA-t500x500.jpg',
              number: 11222111,
            },
          ],
          width: 800,
          outline: true,
          selectable: true,
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
          children: () => [
            <Tab label="Apple" children="🍎" />,
            <Tab label="Bear" children="🐻" />,
            <Tab label="Crescendo" children="🎵" />,
          ],
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
    ],
  },

  {
    name: 'TextInput',
    component: Input,
    description: 'Text Input',
    properties: props.props.InputProps.props,
    examples: [
      {
        props: {
          defaultValue: 'hello world',
          placeholder: 'placeholder',
          beforeIcon: () => <IconBolt />,
          type: 'text',
          clearButton: 'true',
          suffix: 'flap',
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
          active: true,
          disabled: false,
        },
      },
      {
        props: {
          size: 'medium',
          active: true,
          onClick: (v) => console.log(v),
          color: 'neutral',
        },
      },
    ],
  },
]
