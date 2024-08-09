import { createHeadlessEditor } from '@lexical/headless'
import { $getRoot, LineBreakNode, ParagraphNode, TextNode } from 'lexical'
import { NODES } from './nodes.js'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { EmbedNode } from './nodes/EmbedNode.js'
import { ImageNode } from './nodes/ImageNode.js'
import { ListItemNode, ListNode } from '@lexical/list'
import { LinkNode } from '@lexical/link'

type ImageMetadata = {
  key: string
  width: number
  height: number
  thumbhash: string
}

function $convertToHTMLString(images: ImageMetadata[]): string {
  const output: string[] = []
  const nodes = $getRoot().getChildren()

  for (const node of nodes) {
    if (node instanceof ParagraphNode) {
      let text = ''

      for (const child of node.getChildren()) {
        if (child instanceof TextNode) {
          text += child.getTextContent()
        }

        if (child instanceof LinkNode) {
          const url = child.__url

          text += url.length
            ? `<a href="${child.__url}" target="_blank" rel="noopener noreferrer">${child.getTextContent()}</a>`
            : child.getTextContent()
        }

        if (child instanceof LineBreakNode) {
          text += '<br/>'
        }
      }

      if (!text.length) {
        text = '<br/>'
      }

      output.push(`<p>${text}</p>`)
    }

    if (node instanceof HeadingNode) {
      let text = ''

      for (const child of node.getChildren()) {
        if (child instanceof TextNode) {
          text += child.getTextContent()
        }

        if (child instanceof LineBreakNode) {
          text += '<br/>'
        }
      }

      if (!text.length) {
        text = '<br/>'
      }

      output.push(`<h2>${text}</h2>`)
    }

    if (node instanceof QuoteNode) {
      let text = ''

      for (const child of node.getChildren()) {
        if (child instanceof TextNode) {
          text += child.getTextContent()
        }

        if (child instanceof LinkNode) {
          const url = child.__url

          text += url.length
            ? `<a href="${child.__url}" target="_blank" rel="noopener noreferrer">${child.getTextContent()}</a>`
            : child.getTextContent()
        }

        if (child instanceof LineBreakNode) {
          text += '<br/>'
        }
      }

      if (!text.length) {
        text = '<br/>'
      }

      output.push(`<blockquote>${text}</blockquote>`)
    }

    if (node instanceof EmbedNode) {
      output.push(`<figure>${decodeURIComponent(node.__content)}</figure>`)
    }

    if (node instanceof ImageNode) {
      const image = images.find((e) => e.key === node.__id)!
      const src =
        process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DISTRIBUTION_URL +
        '/' +
        image.key
      const caption = 'TODO caption'

      output.push(
        `<figure><img style="display:block;max-width:100%;height:auto" src="${src}" width="${image.width}" height="${image.height}" /><figcaption>${caption}</figcaption></figure>`,
      )
    }

    if (node instanceof ListNode) {
      const type = node.getListType()
      const tag = type === 'number' ? 'ol' : 'ul'
      let content = ''

      for (const listItem of node.getChildren()) {
        let liContent = ''

        if (listItem instanceof ListItemNode) {
          for (const child of listItem.getChildren()) {
            if (child instanceof TextNode) {
              liContent += child.getTextContent()
            }

            if (child instanceof LinkNode) {
              const url = child.__url

              liContent += url.length
                ? `<a href="${child.__url}" target="_blank" rel="noopener noreferrer">${child.getTextContent()}</a>`
                : child.getTextContent()
            }

            if (child instanceof LineBreakNode) {
              liContent += '<br/>'
            }
          }
        }

        content += `<li>${liContent}</li>`
      }

      output.push(`<${tag}>${content}</${tag}>`)
    }
  }

  return output.join('')
}

function $getImages(): string[] {
  const nodes = $getRoot().getChildren()
  const output: string[] = []

  for (const node of nodes) {
    if (node instanceof ImageNode) {
      output.push(node.__id)
    }
  }

  return output
}

export async function exportToHTML(jsonEditorStateString: string) {
  const editor = createHeadlessEditor({
    nodes: NODES,
  })
  const editorState = editor.parseEditorState(jsonEditorStateString)

  let images: string[] = []
  editorState.read(() => {
    images = $getImages()
  })
  // TODO
  // const fetchedImageMetadata: ImageMetadata[] = await batchGetItems(
  //   images.map((image) => ({ pk: `file::${image}`, sk: 'data' })),
  // )
  const fetchedImageMetadata = []

  let html = ''
  editorState.read(() => {
    html = $convertToHTMLString(fetchedImageMetadata)
  })

  if (!html.length) {
    throw new Error('no output from convert to html')
  }

  return html
}
