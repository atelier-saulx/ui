import React, {
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react'
// TODO: use package when PR is merged. Peerdep for react 17 (not 18)
import Editor from './ReactSimpleEditor'
import { IconCheckCircle, IconCopy } from '../../icons'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import './syntax.css'

import { Style, styled } from 'inlines'
import { color as genColor } from '../../varsUtilities'
import { ColorBackgroundColors } from '../../varsTypes'
import { useCopyToClipboard, useControllableState } from '../../hooks'

export type CodeProps = {
  value?: string
  defaultValue?: string
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  style?: Style
  header?: ReactNode
  color?: ColorBackgroundColors
  copy?: boolean
  language?: 'js' | 'html' | 'css' | 'json' | 'markup' | 'clike' | string
  props?: any
}

export const Code: FC<CodeProps> = ({
  value: valueProp,
  defaultValue: defaultValueProp = '',
  onChange: onChangeProp,
  style,
  header,
  color,
  copy,
  language = 'js',
  ...props
}) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })
  //@ts-ignore
  const [copied, copyIt] = useCopyToClipboard(value ?? '')

  return (
    <styled.div
      onFocus={() => console.log('WOOHOO')}
      style={{
        width: '100%',
        position: 'relative',
        maxWidth: '100%',
        borderRadius: 4,
        background: color ? genColor('background', color, 'subtle') : null,
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <div
          style={{
            background: genColor('background', color || 'default', 'muted'),
          }}
        >
          {header}
        </div>
      )}

      {/* @ts-ignore */}
      <Editor
        //@ts-ignore
        value={value}
        onValueChange={(v) => setValue(v)}
        highlight={(code) => {
          try {
            // @ts-ignore
            const h = highlight(code, languages[language])
            return h
          } catch (err) {}
        }}
        style={{
          pointerEvents: !setValue ? 'none' : 'auto',
          margin: 16,
          fontSize: 14,
          color: genColor('content', 'brand', 'primary'),
          fontFamily: 'Fira Code, monospace, sans-serif',

          outline: 'none !important',
        }}
        {...props}
      />
      {copy ? (
        <IconCopy
          color="brand"
          onClick={() => copyIt()}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        />
      ) : null}
    </styled.div>
  )
}
