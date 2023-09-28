import React from 'react'
import { Text } from '../Text'
import { color } from '../../varsUtilities'
import { styled } from 'inlines'
import { usePropState } from '../../hooks'
import Editor from '../Code/ReactSimpleEditor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-javascript'

const StyledMarkdownInput = styled('div', {
  border: `1px solid ${color('border', 'default', 'subtle')}`,
  borderRadius: 4,
})

export type MarkdownInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
}

export const MarkdownInput = ({
  value,
  onChange,
  disabled,
}: MarkdownInputProps) => {
  const [code, setCode] = usePropState(value)
  // useEffect(() => {
  //   e.stopPropagation()
  //   e.preventDefault()
  // })

  return (
    <StyledMarkdownInput>
      <styled.div
        className="markdown"
        style={{
          backgroundColor: color('background', 'default', 'surface'),
          borderRadius: 4,
          padding: 12,
        }}
      >
        <Text color="default">Markdown Editor</Text>
      </styled.div>

      <styled.div
        style={{ padding: 12, pointerEvents: disabled ? 'none' : null }}
      >
        <Editor
          value={code}
          onValueChange={(code) => {
            setCode(code)
            // onChange(code)
            onChange?.({ target: { value: code } })
          }}
          highlight={(tempCode) => {
            try {
              const h = highlight(tempCode, languages.markdown)
              return h
            } catch (err) {
              console.log(err)
            }
          }}
          style={{
            fontSize: 14,
            color: color('content', 'brand', 'primary'),
            fontFamily: 'Fira Code, monospace, sans-serif',
          }}
        />
      </styled.div>
    </StyledMarkdownInput>
  )
}
