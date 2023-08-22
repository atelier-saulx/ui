import React, { FC, Dispatch, SetStateAction, ReactNode } from 'react'
// TODO: use package when PR is merged. Peerdep for react 17 (not 18)
import Editor from './ReactSimpleEditor'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-json'
import './syntax.css'

import { Style, styled, color as genColor, ColorBackgroundColors } from '../..'

export type CodeProps = {
  style?: Style
  value?: string
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  header?: ReactNode
  color?: ColorBackgroundColors
}

export const Code: FC<CodeProps> = ({
  value,
  style,
  onChange,
  header,
  color,
}) => {
  return (
    <styled.div
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
        value={value}
        onValueChange={onChange}
        highlight={(code) => {
          try {
            // @ts-ignore
            const h = highlight(code, languages.js)
            return h
          } catch (err) {}
        }}
        style={{
          margin: 16,
          fontSize: 14,
          color: genColor('content', 'brand', 'primary'),
          fontFamily: 'Fira Code, monospace, sans-serif',
        }}
      />
    </styled.div>
  )
}
