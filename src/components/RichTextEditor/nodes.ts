import { ImageNode } from './nodes/ImageNode.js'
import { EmbedNode } from './nodes/EmbedNode.js'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { LinkNode } from '@lexical/link'

export const NODES = [
  QuoteNode,
  HeadingNode,
  LinkNode,
  ImageNode,
  EmbedNode,
  ListNode,
  ListItemNode,
]
