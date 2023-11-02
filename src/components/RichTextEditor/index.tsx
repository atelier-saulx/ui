import React from 'react'
import { styled } from 'inlines'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import './nodeStyles.css'

import { HeadingNode } from '@lexical/rich-text'
import { LinkNode } from '@lexical/link'
import { ListNode, ListItemNode } from '@lexical/list'
import { ValuePlugin, ValuePluginProps } from './ValuePlugin'
import { ToolbarPlugin } from './ToolbarPlugin'
import { color } from '../../varsUtilities'
import { Text } from '../Text'
import { ImagePlugin } from './ImagePlugin'
import { ImageNode } from './ImageNode'
import { Placeholder } from './Placeholder'
import { BehaviourPlugin } from './BehaviourPlugin'

// TODO finish image caption
// TODO add embed node
// TODO add export to HTML

export type RichTextEditorProps = {
  label?: string
  placeholder?: string
} & ValuePluginProps

export function RichTextEditor({
  label,
  placeholder,
  defaultValue,
  onChange,
}: RichTextEditorProps) {
  return (
    <LexicalComposer initialConfig={CONFIG}>
      <styled.div
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        {label && (
          <styled.div>
            <Text
              weight="medium"
              style={{
                marginBottom: 8,
              }}
            >
              {label}
            </Text>
          </styled.div>
        )}
        <styled.div
          style={{
            position: 'relative',
            '& .rte': {
              display: 'flex',
              flexDirection: 'column',
              color: color('content', 'default', 'primary'),
              border: `1px solid ${color(
                'inputBorder',
                'neutralNormal',
                'default'
              )}`,
              '&:hover': {
                border: `1px solid ${color(
                  'inputBorder',
                  'neutralHover',
                  'default'
                )}`,
              },
              '&:focus': {
                border: `1px solid ${color(
                  'inputBorder',
                  'active',
                  'default'
                )}`,
                boxShadow: `0 0 0 2px ${color('border', 'brand', 'subtle')}`,
              },
              borderRadius: '8px',
              padding: '54px 16px',
              minHeight: '300px',
              outline: 'none',
            },
            ...NODE_STYLES,
          }}
        >
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className="rte" />}
            placeholder={<Placeholder>{placeholder}</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ImagePlugin />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
          <BehaviourPlugin />
          <ValuePlugin defaultValue={defaultValue} onChange={onChange} />
        </styled.div>
      </styled.div>
    </LexicalComposer>
  )
}

const CONFIG = {
  editable: true,
  namespace: 'RichTextEditor',
  theme: {
    heading: {
      h1: 'rte-h1',
      h2: 'rte-h2',
      h3: 'rte-h3',
    },
    paragraph: 'rte-p',
    text: {
      bold: 'rte-bold',
      italic: 'rte-italic',
      strikethrough: 'rte-strikethrough',
    },
    link: 'rte-link',
    list: {
      ul: 'rte-ul',
    },
    embedBlock: {
      base: 'rte-embedbase',
      focus: 'rte-embedfocus',
    },
  },
  nodes: [HeadingNode, LinkNode, ListNode, ListItemNode, ImageNode],
  onError: (error) => {
    console.error(error)
  },
}

const NODE_STYLES = {
  '& .rte-h1': {
    margin: '0',
    color: color('content', 'default', 'primary'),
  },
  '& .rte-h2': {
    margin: '0',
    color: color('content', 'default', 'primary'),
  },
  '& .rte-h3': {
    margin: '0',
    color: color('content', 'default', 'primary'),
  },
  '& .rte-p': {
    margin: '0',
    color: color('content', 'default', 'primary'),
  },
  '& .rte-bold': {
    fontWeight: 'bold',
  },
  '& .rte-italic': {
    fontStyle: 'italic',
  },
  '& .rte-strikethrough': {
    textDecoration: 'line-through',
  },
  '& .rte-link': {
    color: color('content', 'brand', 'primary'),
  },
  '& .rte-ul': {
    margin: '0',
  },
}
