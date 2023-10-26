import React from 'react'
import { FormGroup, Button } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const fieldProps = {
  id: 1337,
  values: {
    array: [
      ['12', '123'],
      ['566', '90'],
      ['asd', 'asdasd0'],
    ],
    object: { flap: false, flirp: true, snap: 'asdasd' },
    // args: { name: 'asdasd' },
    port: 443,
    range: { min: 0, max: 1 },
    custom: { x: 100 },
    args: {
      name: 'hello',
      x: {
        y: 'snapje',
      },
    },
  },
  config: {
    array: {
      type: 'array',
      // value: [
      //   ['1', '2'],
      //   ['3', '4'],
      // ],
      values: {
        type: 'set',
        values: {
          type: 'string',
        },
      },
    },
    object: {
      type: 'object',
      description: 'wowoweewow',
      properties: {
        flap: {
          type: 'boolean',
        },
        flirp: {
          type: 'boolean',
        },
        snap: {
          type: 'text',
        },
        snop: {
          type: 'file',
        },
      },
    },
    // object2: {
    //   type: 'object',
    //   description: 'wowoweewow',
    //   properties: {
    //     flap: {
    //       type: 'boolean',
    //     },
    //     flirp: {
    //       type: 'boolean',
    //     },
    //     snap: {
    //       type: 'text',
    //     },
    //     snop: {
    //       type: 'file',
    //     },
    //     flop: {
    //       type: 'object',
    //       properties: {
    //         nested1flap: {
    //           type: 'boolean',
    //         },
    //         nested1snurp: {
    //           type: 'boolean',
    //         },
    //         nested1cod: {
    //           type: 'boolean',
    //         },
    //         nested1bla: {
    //           type: 'object',
    //           properties: {
    //             nested2flap: {
    //               type: 'boolean',
    //             },
    //             nested2snurp: {
    //               type: 'boolean',
    //             },
    //             nested2cod: {
    //               type: 'boolean',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // ObjWithArrays: {
    //   type: 'object',
    //   description: 'wowoweewow',
    //   properties: {
    //     floop: {
    //       type: 'boolean',
    //     },
    //     flap: {
    //       type: 'array',
    //       values: {
    //         type: 'string',
    //       },
    //     },
    //   },
    // },
    // arrarray: {
    //   type: 'array',
    //   // value: [
    //   //   ['1', '2'],
    //   //   ['3', '4'],
    //   // ],
    //   values: {
    //     type: 'array',
    //     values: {
    //       type: 'array',
    //       values: {
    //         type: 'string',
    //       },
    //     },
    //   },
    // },
    // port: {
    //   type: 'number',
    //   description: 'Network port',
    // },
    // json: {
    //   type: 'json',
    //   label: 'json',
    //   value: `{
    //           "glossary": {
    //               "title": "example glossary",
    //           "GlossDiv": {
    //                   "title": "S",
    //             "GlossList": {
    //                       "GlossEntry": {
    //                           "ID": "SGML",
    //                 "SortAs": "SGML",
    //                 "GlossTerm": "Standard Generalized Markup Language",
    //                 "Acronym": "SGML",
    //                 "Abbrev": "ISO 8879:1986",
    //                 "GlossDef": {
    //                               "para": "A meta-markup language, used to create markup languages such as DocBook.",
    //                   "GlossSeeAlso": ["GML", "XML"]
    //                           },
    //                 "GlossSee": "markup"
    //                       }
    //                   }
    //               }
    //           }
    //       }`,
    // },
    // toggle: {
    //   type: 'checkbox',
    //   label: 'Boolean',
    //   description: 'Network port',
    // },
    // 'args.name': {
    //   label: 'Name',
    //   type: 'text',
    //   description: 'Instance name',
    //   validation: () => (val) => {
    //     return val && val.length > 4
    //   },
    // },
    // 'args.x.y': {
    //   label: 'Status',
    //   description: 'status time',
    //   options: ['good', 'bad', 'medium'],
    //   props: {
    //     placeholder: 'FLAP',
    //   },
    // },
    // range: {
    //   label: 'Bla',
    //   description: 'hello',
    //   type: 'range',
    // },
    // file: {
    //   label: 'File',
    //   description: 'hello',
    //   type: 'file',
    // },
    // text: {
    //   description: 'Write smth',
    //   type: 'text',
    // },
    // custom: {
    //   label: 'Status',
    //   description: 'status time',
    //   type:
    //     () =>
    //     ({ onChange, value }) => {
    //       return (
    //         <Button
    //           color="system"
    //           onClick={() => {
    //             onChange('custom', { x: value.x + 1 })
    //           }}
    //         >
    //           bla {value.x}
    //         </Button>
    //       )
    //     },
    // },
    // isThisNce: {
    //   label: 'Nice',
    //   description: 'is it nice?',
    //   type: 'checkbox',
    // },
  },
  onChange: (values) => console.info(values),
}

const example: ComponentDef = {
  name: 'FormGroup',
  component: FormGroup,
  description: 'FormGroup Component, can be grid or column',
  properties: {}, //props.props.FormGroupProps.props,
  examples: [
    // {
    //   props: {
    //     ...fieldProps,
    //     variant: 'grid',
    //     autoFocus: true,
    //   },
    // },
    {
      name: 'Column',
      description: 'Same form displayed as a colum',
      props: {
        ...fieldProps,
        style: {
          width: 750,
        },
        variant: 'column',
      },
    },
    {
      name: 'Column',
      description: 'Same modified accept buttons',
      props: {
        ...fieldProps,
        style: {
          width: 750,
        },
        confirmationLabel: 'Add user',
        variant: 'column',
      },
    },
  ],
}

export default example
