import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { BehaviourPlugin } from './BehaviourPlugin.js'
import { ValuePlugin } from './ValuePlugin.js'
import { Toolbar } from './Toolbar.js'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { NODES } from './nodes.js'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { styled } from 'inlines'

type RichTextEditorProps = {
  value?: string
  onChange: (value: string) => void
}

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div>
      <LexicalComposer
        initialConfig={{
          namespace: 'foo',
          onError: console.error,
          nodes: NODES,
          theme: {
            heading: {
              h1: 'editor-heading-h1',
              h2: 'editor-heading-h2',
            },
            link: 'editor-link',
            list: {
              listitem: 'editor-listitem',
              nested: {
                listitem: 'editor-nested-listitem',
              },
              ol: 'editor-list-ol',
              ul: 'editor-list-ul',
            },
            quote: 'editor-quote',
            paragraph: 'editor-paragraph',
            text: {
              bold: 'text-bold',
              italic: 'text-italic',
              strikethrough: 'text-strikethrough',
              underline: 'text-underline',
              underlineStrikethrough: 'text-underline-strikethrough',
            },
          },
        }}
      >
        <Toolbar />
        <styled.div
          style={{
            position: 'relative',
            display: 'flex',
            marginTop: 48,
            '& > .editor .text-bold': {
              fontWeight: 'bold',
            },
            '& > .editor .text-italic': {
              fontStyle: 'italic',
            },
            '& > .editor .text-underline': {
              textDecoration: 'underline',
            },
            '& > .editor .text-strikethrough': {
              textDecoration: 'line-through',
            },
            '& > .editor .text-underline-strikethrough': {
              textDecoration: 'underline line-through',
            },
          }}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor"
                style={{
                  outline: 'none',
                  padding: '12px 16px',
                  border: '1px solid black',
                  maxWidth: 700,
                  minHeight: 200,
                  width: '100%',
                }}
              />
            }
            placeholder={
              <div style={{ position: 'absolute', left: 17, top: 13 }}>
                placeholder
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </styled.div>
        <BehaviourPlugin />
        <ValuePlugin value={value} onChange={onChange} />
        <ListPlugin />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  )
}

export { RichTextEditor }
export type { RichTextEditorProps }
