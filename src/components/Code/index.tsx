import React, { FC, Dispatch, SetStateAction, ReactNode } from 'react'
// TODO: use package when PR is merged. Peerdep for react 17 (not 18)
import Editor from './ReactSImpleEditor'
import { Style, styled, border, color, renderOrCreateElement } from '~'
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

export type CodeProps = {
  style?: Style
  value?: string
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  topRight?: FC | ReactNode
  header?: ReactNode
}

export const Code: FC<CodeProps> = ({
  topRight,
  value,
  style,
  onChange,
  header,
}) => {
  return (
    <styled.div
      style={{
        width: '100%',
        position: 'relative',
        maxWidth: '100%',
        borderRadius: 4,
        border: border(1, 'border'),
        background: color('background2dp'),
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <div
          style={{
            background: color('border'),
          }}
        >
          {header}
        </div>
      )}
      {topRight ? (
        <styled.div
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          {renderOrCreateElement(topRight)}
        </styled.div>
      ) : null}

      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => {
          try {
            const h = highlight(code, languages.js)
            return h
          } catch (err) {}
        }}
        style={{
          margin: 16,
          fontSize: 14,
          color: color('accent'),
          fontFamily: 'Fira Code, monospace, sans-serif',
        }}
      />
    </styled.div>
  )
}
