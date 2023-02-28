import React from 'react'
import { Input, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const InputFields = () => {
  return (
    <Input onChange={(e) => console.log(e)} type="markdown" value="ddd" />
    // <ComponentViewer
    //   component={Input}
    //   propsName="InputProps"
    //   examples={[
    //     {
    //       props: {
    //         pattern: '^([a-z0-9]{4,7})$',
    //         label: 'Custom regex label',
    //         description: 'Custom regex description',
    //         indent: true,
    //         icon: <CheckIcon />,
    //         iconRight: <CheckIcon />,
    //       },
    //     },
    //     {
    //       props: {
    //         label: 'Input label',
    //         description: 'this is description',
    //         // icon: <CheckIcon />,
    //       },
    //     },
    //     {
    //       props: {
    //         label: 'Input label',
    //         description: 'this is description',
    //         icon: <CheckIcon />,
    //       },
    //     },
    //     {
    //       props: {
    //         digest: true,
    //         label: 'Digest input',
    //         description: 'Press icon to copy the SHA',
    //         indent: true,
    //       },
    //     },
    //     {
    //       props: {
    //         passwordInput: true,
    //         label: 'Password',
    //         description: 'Press eye to see the value',
    //         indent: true,
    //       },
    //     },

    //     // {
    //     //   props: {
    //     //     jsonInput: true,
    //     //     label: 'Label for JSON',
    //     //     description: 'Description for JSON',
    //     //     descriptionBottom: 'this is bottom description',
    //     //     indent: true,
    //     //   },
    //     // },
    //     {
    //       props: {
    //         markdownInput: true,
    //         label: 'Label for Markdown',
    //         description: 'Description for Markdown',
    //         descriptionBottom: 'this is bottom description',
    //         indent: true,
    //       },
    //     },
    //     {
    //       props: {
    //         label: 'Number or Float',
    //         descriptionBottom: 'this is description',
    //         indent: true,
    //         type: 'number',
    //       },
    //     },
    //     {
    //       props: {
    //         // make this work!
    //         label: 'Input label',
    //         maxChars: 200,
    //         descriptionBottom: 'Dit komt eronder',
    //         indent: true,
    //         error: (value) => {
    //           if (value === 'yo') {
    //             return 'What up yo??'
    //           }
    //         },
    //       },
    //     },
    //     {
    //       props: {
    //         label: 'Multiline',
    //         description: 'console logs value',
    //         multiline: true,
    //         onChange: (e) => console.log(e),
    //       },
    //     },
    //     {
    //       props: {
    //         label: 'Color',
    //         colorInput: true,
    //       },
    //     },
    //   ]}
    // />
  )
}
