import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { BehaviourPlugin } from './BehaviourPlugin.js'
import { Toolbar } from './Toolbar.js'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { NODES } from './nodes.js'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'

export function RichTextEditor({
  onChange,
}: {
  onChange: (state: string) => void
}) {
  return (
    <div>
      <LexicalComposer
        initialConfig={{
          namespace: 'foo',
          onError: console.error,
          nodes: NODES,
        }}
      >
        <Toolbar />
        <div style={{ position: 'relative', display: 'flex', gap: 64 }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
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
              <div style={{ position: 'absolute', left: 17, top: 29 }}>
                placeholder
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <BehaviourPlugin onChange={onChange} />
        <ListPlugin />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  )
}
