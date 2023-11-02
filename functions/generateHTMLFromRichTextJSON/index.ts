import { BasedFunction } from '@based/functions'
import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import { JSDOM } from 'jsdom'

const generateHTMLFromRichTextJSON: BasedFunction<
  { serializedRichTextState: string },
  string
> = async (based, { serializedRichTextState }) => {
  //   const dom = new JSDOM()
  //   global.window = dom.window
  //   global.document = dom.window.document
  //   global.DocumentFragment = dom.window.DocumentFragment

  console.log('ran:', serializedRichTextState)
  //   console.log(global.window)

  //   const editor = createHeadlessEditor({
  //     nodes: [],
  //     onError: () => {},
  //   })

  //   editor.setEditorState(
  //     editor.parseEditorState(JSON.parse(serializedRichTextState))
  //   )

  //   return $generateHtmlFromNodes(editor, null)
  return new Date().toISOString()
}

export default generateHTMLFromRichTextJSON
